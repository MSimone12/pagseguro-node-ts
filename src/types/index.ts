import * as Checkout from './checkout';

export interface SessionResponse {
  id: string;
}

export interface XMLSessionResponse {
  id: string[];
}

export interface SessionXMLResponse {
  session: XMLSessionResponse;
}

export interface PaymentMethod {
  code: number;
  options: Object;
  name: string;
}

export interface PaymentMethodsResponse {
  paymentMethods: Map<string, PaymentMethod>;
  error: boolean;
}

export interface CreditCard {
  amount?: string;
  cardNumber: string;
  cardBrand: string;
  cardCvv: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
}

export interface CreditCardToken {
  creditCard: CreditCard;
  billingAddress: Checkout.BillingAddress;
}

export interface CreditCardTokenRequest extends CreditCard {
  sessionId: string;
}

export interface CreditCardTokenResponse {
  token: string;
}

export interface PagSeguroProps {
  email: string;
  token: string;
  mode?: 'production' | 'sandbox';
}
