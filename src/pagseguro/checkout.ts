import axios, { AxiosRequestConfig } from 'axios';
import * as Checkout from '../types/checkout';
import { fromXML } from '../utils/xml';

const xml = require('jstoxml');

const config = (url: string, payment: Object): AxiosRequestConfig => ({
  method: 'post',
  url,
  headers: {
    'Content-Type': 'application/xml',
  },
  data: xml.toXML({ payment }),
});

interface TransactionResponse {
  transaction: Object;
}

interface NormalObject {
  [id: string]: any;
}

const normalizeResponse = (obj: NormalObject): NormalObject => {
  const specialKeys = ['items', 'documents'];
  let res: NormalObject = {};
  Object.entries(obj).forEach(entry => {
    const [key, value] = entry;
    res[key] = Array.isArray(value) && value.length === 1 ? value[0] : value;
    if (typeof res[key] === 'object') {
      res[key] = Array.isArray(res[key])
        ? res[key].map((val: any) => normalizeResponse(val))
        : normalizeResponse(res[key]);
    }

    if (specialKeys.includes(key)) {
      res[key] = Object.values(res[key]).reduce(
        (prev: Array<any>, curr: any) =>
          Array.isArray(curr) ? [...prev, ...curr] : [...prev, curr],
        [],
      );
    }
  });

  return res;
};

const normalizePayment = (payment: Checkout.Payment) => {
  const sender = {
    ...payment.sender,
    documents: payment.sender?.documents.map(document => ({ document })),
  };

  const normalizedPayment = {
    ...payment,
    sender,
    creditCard: {
      ...payment.creditCard,
      holder: sender,
    },
  };
  return normalizedPayment;
};

export const checkout = async (
  url: string,
  payment: Checkout.Payment,
): Promise<Checkout.GetTransactionResponse> => {
  try {
    const normalizedPayment = normalizePayment(payment);

    console.log('[pagseguro] => ', normalizedPayment);

    const { data } = await axios(config(url, normalizedPayment));

    const json = await fromXML(data);

    console.log('[pagseguro] => ', json);
    const { transaction } = json as TransactionResponse;

    const response = normalizeResponse(transaction);
    console.log('[pagseguro] => ', response);

    return { transaction: response } as Checkout.GetTransactionResponse;
  } catch (error) {
    throw error;
  }
};
