import {Configuration} from '../'
import { Buffer } from 'buffer';


const encode = (str: string): string => Buffer.from(str, 'binary').toString('base64');

export function GetConfig(profile: string):Configuration {
  return new Configuration({
        basePath: "http://"+"192.168.64.3"+"/kpture/api/v1",
        username: profile,
        headers: {
            'Authorization': 'Basic ' + encode(profile + ":" + "")
        }
    })
} 