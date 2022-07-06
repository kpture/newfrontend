import {Configuration} from '../'
import { Buffer } from 'buffer';
import { WindowsFilled } from '@ant-design/icons';


const encode = (str: string): string => Buffer.from(str, 'binary').toString('base64');

export function GetConfig(profile: string):Configuration {
  return new Configuration({
        basePath: "http://"+window.location.host+"/kpture/api/v1",
        username: profile,
        headers: {
            'Authorization': 'Basic ' + encode(profile + ":" + "")
        }
    })
}