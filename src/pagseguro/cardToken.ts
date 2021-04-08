import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { CreditCardTokenRequest, CreditCardTokenResponse } from '../types';

const config = (data: string): AxiosRequestConfig => ({
  method: 'post',
  url: 'https://df.uol.com.br/v2/cards',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data: data,
});

export const getCardToken = async (
  creditCard: CreditCardTokenRequest,
): Promise<CreditCardTokenResponse> => {
  const request = qs.stringify(creditCard);

  const { data } = await axios(config(request));

  return data as CreditCardTokenResponse;
};
