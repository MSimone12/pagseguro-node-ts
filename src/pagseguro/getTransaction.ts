import axios, { AxiosRequestConfig } from 'axios';
import * as Checkout from '../types/checkout';
import { fromXML } from '../utils/xml';

interface TransactionResponse {
  transaction: Object;
}

interface NormalObject {
  [id: string]: any;
}

const config = (url: string): AxiosRequestConfig => ({
  method: 'get',
  url: url,
  headers: {},
});

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

export const getTransaction = async (
  url: string,
): Promise<Checkout.GetTransactionResponse> => {
  const { data } = await axios(config(url));

  const json = await fromXML(data);

  const { transaction } = json as TransactionResponse;

  const response: NormalObject = normalizeResponse(transaction);

  return { transaction: response } as Checkout.GetTransactionResponse;
};
