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
import { shallowMerge, capitalize } from './lib/utils'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/defaultIfEmpty'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/ignoreElements'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/share'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/withLatestFrom'

export type EventHandlerProps<E> = EventHandlerProp<E> & Partial<EventProp<E>>

export interface EventHandlerProp<E> {
  [onEventType: string]: (event: E) => void
}

export interface EventProp<E> {
  [eventType: string]: E
}

export default function withEventHandler <E>(
  eventType: string
): <P>(props$: Observable<P>) => Observable<P&EventHandlerProps<E>> {
	const eventKey = eventType.toLowerCase()
	const handlerKey = `on${capitalize(eventType)}`

	return function <P>(props$: Observable<P>) {
		const _props$ = props$.share()
		const handler$ = new Subject<EventProp<E>>()
    const event$ = handler$.takeUntil(_props$.ignoreElements().defaultIfEmpty())

		return Observable.merge(
			_props$,
			event$.withLatestFrom<EventProp<E>,P,P&EventProp<E>>(_props$, shallowMerge)
		).map(withHandler)

		function withHandler <Q>(props: Q): Q&EventHandlerProp<E> {
			return { ...(props as any), [handlerKey]: handler }
		}

		function handler (val: E) {
			handler$.next({ [eventKey]: val })
		}
	}
}
