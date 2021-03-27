import xml from 'xml2js';
import {promisify} from 'util'

export const fromXML = promisify(xml.parseString);