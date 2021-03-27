import axios, { AxiosRequestConfig } from 'axios';
import { fromXML } from '../utils/xml';

interface SessionResponse {
  id: string;
}

interface XMLSessionResponse {
  id: Array<string>;
}

interface XMLResponse {
  session: XMLSessionResponse;
}

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

  const { session } = (await fromXML(data)) as XMLResponse;
  return {
    id: session.id[0],
  } as SessionResponse;
};
