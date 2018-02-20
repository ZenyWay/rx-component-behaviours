/**
 * @license
 * Copyright 2018 Stephane M. Catala
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * Limitations under the License.
 */
;
export function capitalize (str: string): string {
	return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export function shallowMerge <A>(a: A): A
export function shallowMerge <A,B>(a: A, b: B): A&B
export function shallowMerge <A,B,C>(a: A, b: B, c: C): A&B&C
export function shallowMerge <A,B,C,D>(a: A, b: B, c: C, d: D): A&B&C&D
export function shallowMerge <A,B,C,D,E>(a: A, b: B, c: C, d: D, e: E): A&B&C&D&E
export function shallowMerge (...args: any[]) {
	return Object.assign({}, ...args)
}
