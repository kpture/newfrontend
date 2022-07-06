/* tslint:disable */
/* eslint-disable */
/**
 * Kpture-backend
 * Kpture Backend server
 *
 * The version of the OpenAPI document: 0.1
 * Contact: kpture.git@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CaptureInfo
 */
export interface CaptureInfo {
    /**
     * 
     * @type {number}
     * @memberof CaptureInfo
     */
    packetNb?: number;
    /**
     * 
     * @type {number}
     * @memberof CaptureInfo
     */
    size?: number;
}

export function CaptureInfoFromJSON(json: any): CaptureInfo {
    return CaptureInfoFromJSONTyped(json, false);
}

export function CaptureInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CaptureInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'packetNb': !exists(json, 'packetNb') ? undefined : json['packetNb'],
        'size': !exists(json, 'size') ? undefined : json['size'],
    };
}

export function CaptureInfoToJSON(value?: CaptureInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'packetNb': value.packetNb,
        'size': value.size,
    };
}
