import axios, { AxiosRequestConfig } from 'axios';
import * as Checkout from '../types/checkout';
import { fromXML } from '../utils/xml';

interface TransactionResponse {
  // transaction: {
  //   date: string[];
  //   code: string[];
  //   reference: string[];
  //   type: string[];
  //   status: string[];
  //   lastEventDate: Date[];
  //   paymentMethod: Array<Object>[];
  //   grossAmount: string[];
  //   discountAmount: string[];
  //   creditorFees: Array<Object>[];
  //   netAmount: string[];
  //   extraAmount: string[];
  //   escrowEndDate: Date[];
  //   installmentCount: string[];
  //   itemCount: string[];
  //   items: Array<Object>[];
  //   sender: Array<Object>[];
  //   gatewaySystem: Array<Object>[];
  //   primaryReceiver: Array<Object>[];
  // };
  transaction: Map<String, Array<any>>;
}

const config = (url: string): AxiosRequestConfig => ({
  method: 'get',
  url: url,
  headers: {},
});

export const getTransaction = async (
  url: string,
): Promise<Checkout.GetTransactionResponse> => {
  const { data } = await axios(config(url));

  const json = await fromXML(data);

  const { transaction } = json as TransactionResponse;

  Object.keys(transaction).forEach(console.log);

  return json as Checkout.GetTransactionResponse;
};
