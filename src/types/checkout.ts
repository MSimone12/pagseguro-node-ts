interface Phone {
  areaCode: string;
  number: string;
}

export interface Document {
  type: string;
  value: string;
}

export interface Documents {
  document: Document;
}

export interface Sender extends Holder {
  email: string;
}

export interface Item {
  id: string;
  description: string;
  quantity: number;
  amount: string;
}

export interface Items {
  item: Item;
}

export interface Shipping {
  addressRequired: boolean;
}

export interface InstallmentResponse {
  quantity: number;
  interestFree: boolean;
  installmentAmount: number;
  totalAmount: number;
}

export interface Installment {
  noInterestInstallmentQuantity: number;
  quantity?: number;
  value: string;
}

export interface Holder {
  name: string;
  documents: Documents[];
  birthDate: string;
  phone: Phone;
}

export interface BillingAddress {
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface CreditCard {
  token: string;
  installment?: Installment;
  holder: Holder;
  billingAddress: BillingAddress;
}

export interface Payment {
  mode: string;
  method: string;
  sender?: Sender;
  currency: string;
  notificationURL?: string;
  items: Items[];
  extraAmount: string;
  reference: string;
  shipping?: Shipping;
  creditCard: CreditCard;
}

export interface PaymentMethod {
  type: string;
  code: string;
}

export interface CreditorFees {
  intermediationRateAmount: string;
  intermediationFeeAmount: string;
}

export interface Transaction {
  date: Date;
  code: string;
  reference: string;
  type: string;
  status: string;
  paymentMethod: PaymentMethod;
  grossAmount: string;
  discountAmount: string;
  creditorFees: CreditorFees;
  netAmount: string;
  extraAmount: string;
  installmentCount: string;
  itemCount: string;
  items: Items;
  sender: Sender;
  shipping: Shipping;
}

export interface GetTransactionResponse {
  transaction: Transaction;
}

export interface PaymentResponse {
  code: string[];
  date: Date[];
}
