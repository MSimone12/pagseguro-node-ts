import { getCardToken } from './pagseguro/cardToken';
import { createSession } from './pagseguro/session';
import { CreditCardToken, PagSeguroProps } from './interface';

import { checkout } from './pagseguro/checkout';
import { getTransaction } from './pagseguro/getTransaction';

const productionURL = 'https://ws.pagseguro.uol.com.br/';
const sandboxURL = 'https://ws.sandbox.pagseguro.uol.com.br/';

class PagSeguroCheckout {
  private _isSandbox!: boolean;
  private _reference!: string;
  private _items!: Checkout.Items[];
  private _sender!: Checkout.Sender;
  private _auth!: string;
  private _sessionId!: string;
  private _cardToken!: string;
  private _billingAddress!: Checkout.BillingAddress;
  private _url!: string;

  constructor(props: PagSeguroProps) {
    const { mode, ...authData } = props;
    this._isSandbox = mode === 'sandbox';
    this._url = props.mode === 'production' ? productionURL : sandboxURL;
    this._auth = `email=${authData.email}&token=${authData.token}`;
    this._items = [];
  }

  private _getSessionUrl = (): string =>
    `${this._url}/v2/sessions?${this._auth}`;

  createSession = async () => {
    const { id } = await createSession(this._getSessionUrl());
    this._sessionId = id;
  };

  getCardToken = async (request: CreditCardToken): Promise<void> => {
    const { token } = await getCardToken({
      ...request.creditCard,
      amount: this.totalAmount.toString(),
      sessionId: this._sessionId,
    });

    this._cardToken = token;
    this._billingAddress = request.billingAddress;
  };

  private getNotificationUrl = (notificationToken: string): string =>
    `${this._url}/v3/transactions/notifications/${notificationToken}?${this._auth}`;

  private getTransactionDetailsUrl = (code: string): string =>
    `${this._url}/v3/transactions/${code}?${this._auth}`;

  private _getTransactionUrl = (): string =>
    `${this._url}/v2/transactions?${this._auth}`;

  reference = (ref: string) => (this._reference = ref);

  addItem = (item: Checkout.Item) => {
    if (this._items == null) this._items = [];
    this._items.push({ item });
  };

  sender = (sender: Checkout.Sender) => (this._sender = sender);

  private _buildPayment = (
    creditCard: Checkout.CreditCard,
  ): Checkout.Payment => {
    const payment: Checkout.Payment = {
      mode: 'default',
      method: 'creditCard',
      sender: this._sender,
      items: this._items,
      reference: this._reference,
      shipping: {
        addressRequired: false,
      },
      creditCard,
      currency: 'BRL',
      extraAmount: '0.00',
    };
    return payment;
  };

  private get totalAmount(): string {
    return this._items
      .reduce(
        (prev, { item }) => prev + parseFloat(item.amount) * item.quantity,
        0.0,
      )
      .toFixed(2);
  }

  private _buildInstallment = (quantity: number): Checkout.Installment => {
    const installmentValue = (parseFloat(this.totalAmount) / quantity).toFixed(
      2,
    );
    return {
      quantity,
      noInterestInstallmentQuantity: 2,
      value: installmentValue,
    };
  };

  private _buildCreditCardData = () => {
    const { email, ...holder } = this._sender;

    const creditCard: Checkout.CreditCard = {
      holder,
      billingAddress: this._billingAddress,
      installment: this._buildInstallment(1),
      token: this._cardToken,
    };

    return creditCard;
  };

  send = (): Promise<Checkout.PaymentResponse> =>
    checkout(
      this._getTransactionUrl(),
      this._buildPayment(this._buildCreditCardData()),
    );

  getTransactionByNotificationCode = (
    notificationCode: string,
  ): Promise<Checkout.GetTransactionResponse> =>
    getTransaction(this.getNotificationUrl(notificationCode));

  getTransactionByCode = (
    code: string,
  ): Promise<Checkout.GetTransactionResponse> =>
    getTransaction(this.getTransactionDetailsUrl(code));
}

export default PagSeguroCheckout;
