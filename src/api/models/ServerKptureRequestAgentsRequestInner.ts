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
 * @interface ServerKptureRequestAgentsRequestInner
 */
export interface ServerKptureRequestAgentsRequestInner {
    /**
     * 
     * @type {string}
     * @memberof ServerKptureRequestAgentsRequestInner
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof ServerKptureRequestAgentsRequestInner
     */
    namespace?: string;
}

export function ServerKptureRequestAgentsRequestInnerFromJSON(json: any): ServerKptureRequestAgentsRequestInner {
    return ServerKptureRequestAgentsRequestInnerFromJSONTyped(json, false);
}

export function ServerKptureRequestAgentsRequestInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): ServerKptureRequestAgentsRequestInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'namespace': !exists(json, 'namespace') ? undefined : json['namespace'],
    };
}

export function ServerKptureRequestAgentsRequestInnerToJSON(value?: ServerKptureRequestAgentsRequestInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'namespace': value.namespace,
    };
}
