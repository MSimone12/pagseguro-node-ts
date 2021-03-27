import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  method: 'get',
  url: 'https://ws.sandbox.pagseguro.uol.com.br/payment-methods',
  headers: {
    Accept: 'application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1',
  },
};

export interface PaymentMethod {
  code: number;
  options: Object;
  name: string;
}

export interface PaymentMethodsResponse {
  paymentMethods: Map<string, PaymentMethod>;
  error: boolean;
}

export const getPaymentMethods = async (
  amount: string,
  sessionId: string,
): Promise<PaymentMethodsResponse> => {
  const requestConfig: AxiosRequestConfig = {
    ...config,
    params: {
      amount,
      sessionId,
    },
  };
  const { data } = await axios(requestConfig);

  return data as PaymentMethodsResponse;
};
