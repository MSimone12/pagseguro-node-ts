import axios, { AxiosRequestConfig } from "axios";
import xml from 'xmltojson';

interface SessionResponse {
  id: string
}

const config : AxiosRequestConfig = {
  headers: {},
  data: '',
  method: 'POST'
}

export const createSession = async (url: string) : Promise<SessionResponse> => axios({
  ...config, 
  url: url,
}).then(res => {
  return xml.parseString(res.data, {childrenAsArray: false}) as SessionResponse;
});
