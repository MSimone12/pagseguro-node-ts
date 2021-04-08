import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

const config = (url: string): AxiosRequestConfig => ({
  method: 'get',
  url: url,
  headers: {},
});

export const getTransaction = async (
  url: string,
): Promise<Checkout.GetTransactionResponse> => {
  const { data } = await axios(config(url));

  return data as Checkout.GetTransactionResponse;
};
