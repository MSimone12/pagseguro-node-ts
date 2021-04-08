import axios, { AxiosRequestConfig } from 'axios';
import * as Checkout from '../types/checkout';
import { fromXML } from '../utils/xml';

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

  return json as Checkout.GetTransactionResponse;
};
