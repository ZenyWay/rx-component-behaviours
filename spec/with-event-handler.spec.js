'use strict' /* eslint-env jasmine */
/**
 * @license
 * Copyright 2018 Stephane M. Catala
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * Limitations under the License.
 *
 * adapted from https://github.com/ReactiveX/rxjs/spec/Subject-spec.ts
 * LICENSE (full text): https://github.com/ReactiveX/rxjs/LICENSE.txt
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * Limitations under the License.
 */
const withEventHandler = require('../').withEventHandler
const Subject = require('rxjs/Subject').Subject

describe('withEventHandler', function () {
  describe('when given a string', function () {
    let op, src$, subscribe, subscription

    beforeEach(function () {
      op = withEventHandler('event')
      src$ = new Subject()
      const next = jasmine.createSpy('next')
      const error = jasmine.createSpy('error')
      const complete = jasmine.createSpy('complete')
      subscribe = function () {
        subscription = op(src$).subscribe(next, error, complete)
      }
    })

    it('returns an RxJS Operator', function () {
      expect(op).toEqual(jasmine.any(Function))
      expect(subscribe).not.toThrow()
      expect(subscription).toBeDefined()
      expect(subscription.unsubscribe).toEqual(jasmine.any(Function))
    })
  })

  describe('when called without arguments', function () {
    it('throws an Error', function () {
      expect(withEventHandler).toThrow()
    })
  })

  describe('the returned RxJS Operator', function () {
    describe('when its input Observable emits an object', function () {
      let next, error, complete

      beforeEach(function () {
        next = jasmine.createSpy('next')
        error = jasmine.createSpy('error')
        complete = jasmine.createSpy('complete')
        const op = withEventHandler('event')
        const src$ = new Subject()
        const sub = op(src$).subscribe(next, error, complete)
        src$.next({ foo: 'foo' })
        src$.next({ bar: 'bar' })
        sub.unsubscribe()
      })
      it('its output Observable emits an object that extends the input object ' +
      'with an EventHandlerProp', function () {
        expect(next.calls.argsFor(0)).toEqual([{
          foo: 'foo',
          onEvent: jasmine.any(Function)
        }])
        expect(next.calls.argsFor(1)).toEqual([{
          bar: 'bar',
          onEvent: jasmine.any(Function)
        }])
        expect(error).not.toHaveBeenCalled()
        expect(complete).not.toHaveBeenCalled()
      })
    })

    describe('when the handler from the EventHandlerProp is called', function () {
      let next, error, complete

      beforeEach(function () {
        next = jasmine.createSpy('next')
        error = jasmine.createSpy('error')
        complete = jasmine.createSpy('complete')
        const op = withEventHandler('event')
        const src$ = new Subject()
        let onEvent
        next.and.callFake(function (x) {
          onEvent = x.onEvent
        })
        const sub = op(src$).subscribe(next, error, complete)
        src$.next({ foo: 'foo' })
        onEvent('bar')
        sub.unsubscribe()
      })

      it('its output Observable emits an object that extends ' +
      'the previously emitted input object with the EventHandlerProp ' +
      'and an EventProp', function () {
        expect(next.calls.argsFor(0)).toEqual([{
          foo: 'foo',
          onEvent: jasmine.any(Function)
        }])
        expect(next.calls.argsFor(1)).toEqual([{
          foo: 'foo',
          onEvent: jasmine.any(Function),
          event: 'bar'
        }])
      })
    })

    describe('when the input observable completes with an error', function () {
      let next, error, complete

      beforeEach(function () {
        next = jasmine.createSpy('next')
        error = jasmine.createSpy('error')
        complete = jasmine.createSpy('complete')
        const op = withEventHandler('event')
        const src$ = new Subject()
        const sub = op(src$).subscribe(next, error, complete)
        src$.error('boom')
        sub.unsubscribe()
      })

      it('the output observable completes with that error', function () {
        expect(next).not.toHaveBeenCalled()
        expect(complete).not.toHaveBeenCalled()
        expect(error).toHaveBeenCalledWith('boom')
      })
    })

    describe('when the input observable completes', function () {
      let next, error, complete

      beforeEach(function () {
        next = jasmine.createSpy('next')
        error = jasmine.createSpy('error')
        complete = jasmine.createSpy('complete')
        const op = withEventHandler('event')
        const src$ = new Subject()
        const sub = op(src$).subscribe(next, error, complete)
        src$.complete()
        sub.unsubscribe()
      })

      it('the output observable completes', function () {
        expect(next).not.toHaveBeenCalled()
        expect(error).not.toHaveBeenCalled()
        expect(complete).toHaveBeenCalled()
      })
    })
  })
})
