import { fromXML } from '../utils/xml';
import axios, { AxiosRequestConfig } from 'axios';
import { SessionResponse, SessionXMLResponse } from '../types';

const config: AxiosRequestConfig = {
  headers: {},
  data: '',
  method: 'POST',
};

export const createSession = async (url: string): Promise<SessionResponse> => {
  const { data } = await axios({
    ...config,
    url: url,
  });

  const { session } = (await fromXML(data)) as SessionXMLResponse;
  return {
    id: session.id[0],
  };
};
