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
 * @interface AgentMetadata
 */
export interface AgentMetadata {
    /**
     * 
     * @type {string}
     * @memberof AgentMetadata
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof AgentMetadata
     */
    namespace?: string;
    /**
     * 
     * @type {string}
     * @memberof AgentMetadata
     */
    status?: string;
    /**
     * 
     * @type {string}
     * @memberof AgentMetadata
     */
    system?: string;
    /**
     * 
     * @type {string}
     * @memberof AgentMetadata
     */
    targetUrl?: string;
}

export function AgentMetadataFromJSON(json: any): AgentMetadata {
    return AgentMetadataFromJSONTyped(json, false);
}

export function AgentMetadataFromJSONTyped(json: any, ignoreDiscriminator: boolean): AgentMetadata {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'namespace': !exists(json, 'namespace') ? undefined : json['namespace'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'system': !exists(json, 'system') ? undefined : json['system'],
        'targetUrl': !exists(json, 'targetUrl') ? undefined : json['targetUrl'],
    };
}

export function AgentMetadataToJSON(value?: AgentMetadata | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'namespace': value.namespace,
        'status': value.status,
        'system': value.system,
        'targetUrl': value.targetUrl,
    };
}

