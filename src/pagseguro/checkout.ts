import axios, { AxiosRequestConfig } from 'axios';
import { fromXML } from '../utils/xml';

const xml = require('jstoxml');

var config = (url: string, payment: Checkout.Payment): AxiosRequestConfig => ({
  method: 'post',
  url,
  headers: {
    'Content-Type': 'application/xml',
  },
  data: xml.toXML({ payment }),
});

export const checkout = async (
  url: string,
  payment: Checkout.Payment,
): Promise<Checkout.PaymentResponse> => {
  try {
    const { data } = await axios(config(url, payment));

    const response = await fromXML(data);

    return response as Checkout.PaymentResponse;
  } catch (error) {
    throw error;
  }
};
