/* tslint:disable */
/* eslint-disable */
/**
 * ExerciseApi
 * A web API for getting info about exercises and workouts
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: chlaferney@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ExerciseInstruction
 */
export interface ExerciseInstruction {
    /**
     * 
     * @type {Array<string>}
     * @memberof ExerciseInstruction
     */
    steps?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof ExerciseInstruction
     */
    tips?: Array<string>;
}

export function ExerciseInstructionFromJSON(json: any): ExerciseInstruction {
    return ExerciseInstructionFromJSONTyped(json, false);
}

export function ExerciseInstructionFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExerciseInstruction {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'steps': !exists(json, 'steps') ? undefined : json['steps'],
        'tips': !exists(json, 'tips') ? undefined : json['tips'],
    };
}

export function ExerciseInstructionToJSON(value?: ExerciseInstruction | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'steps': value.steps,
        'tips': value.tips,
    };
}


