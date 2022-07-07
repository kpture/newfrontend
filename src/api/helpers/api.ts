import {Configuration} from '../'
import { Buffer } from 'buffer';
import { WindowsFilled } from '@ant-design/icons';
import AppConfig from 'react-global-configuration';


const encode = (str: string): string => Buffer.from(str, 'binary').toString('base64');


export function GetConfig(profile: string,ip: string):Configuration {
    console.log(ip)
  return new Configuration({
        basePath: "http://"+ip+"/kpture/api/v1",
        username: profile,
        headers: {
            'Authorization': 'Basic ' + encode(profile + ":" + "")
        }
    })
}