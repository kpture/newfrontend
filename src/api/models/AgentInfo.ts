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
import {
    AgentMetadata,
    AgentMetadataFromJSON,
    AgentMetadataFromJSONTyped,
    AgentMetadataToJSON,
} from './AgentMetadata';

/**
 * 
 * @export
 * @interface AgentInfo
 */
export interface AgentInfo {
    /**
     * 
     * @type {Array<string>}
     * @memberof AgentInfo
     */
    errors?: Array<string>;
    /**
     * 
     * @type {AgentMetadata}
     * @memberof AgentInfo
     */
    metadata?: AgentMetadata;
    /**
     * 
     * @type {number}
     * @memberof AgentInfo
     */
    packetNb?: number;
}

export function AgentInfoFromJSON(json: any): AgentInfo {
    return AgentInfoFromJSONTyped(json, false);
}

export function AgentInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AgentInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'errors': !exists(json, 'errors') ? undefined : json['errors'],
        'metadata': !exists(json, 'metadata') ? undefined : AgentMetadataFromJSON(json['metadata']),
        'packetNb': !exists(json, 'packetNb') ? undefined : json['packetNb'],
    };
}

export function AgentInfoToJSON(value?: AgentInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'errors': value.errors,
        'metadata': AgentMetadataToJSON(value.metadata),
        'packetNb': value.packetNb,
    };
}
