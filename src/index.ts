import {
  getPaymentMethods,
  PaymentMethodsResponse,
} from './pagseguro/paymentMethods';
import { createSession } from './pagseguro/session';

interface PagSeguroProps {
  email: string;
  token: string;
  mode?: 'production' | 'sandbox';
}

const productionURL = 'https://ws.pagseguro.uol.com.br/v2/';
const sandboxURL = 'https://ws.sandbox.pagseguro.uol.com.br/v2/';
class PagSeguro {
  constructor(props: PagSeguroProps) {
    this._email = props.email;
    this._token = props.token;
    this._url = props.mode === 'production' ? productionURL : sandboxURL;

    this._onInit();
  }

  _onInit = async () => {
    const { id } = await createSession(this._url);
    this._sessionId = id;
  };

  getPaymentMethods = async (amount: string): Promise<PaymentMethodsResponse> =>
    getPaymentMethods(amount, this._sessionId);

  _email!: string;
  _token!: string;
  _sessionId!: string;
  _url!: string;
}

export default PagSeguro;
