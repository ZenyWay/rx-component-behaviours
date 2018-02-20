# rx-component-behaviours
[![NPM](https://nodei.co/npm/rx-component-behaviours.png?compact=true)](https://nodei.co/npm/rx-component-behaviours/)

rxjs-based component behaviours for lifting a [component-from-stream](https://npmjs.com/package/component-from-stream/).

# API
for a detailed specification of this API,
run the [unit tests](https://cdn.rawgit.com/ZenyWay/rx-component-behaviours/v1.0.0/spec/web/index.html)
in your browser.

## `withEventHandler`
return a new RxJS Operator that adds `EventHandlerProps`
to the `props` objects from its input stream.

example usage:
```tsx
const behaviour = compose(
  // ... behaviours that may use the { 'click': MouseEvent } EventProp
  // injected from the component lifted with this composed behaviour
  // through the { 'onClick' (event: MouseEvent) => void } EventHandlerProp
  withEventHandler('click'), // add the EventHandlerProps
  // ... other behaviours that do not require access to the EventHandlerProps
)
// ...
// Stateless Functional Component
const SFC = ({ onClick /*, other props */ }) => (
  <div onClick={onClick}>
  <!-- ... -->
  </div>
)
// ...
export componentFromStream(SFC, behaviour)
```

type definitions:
```ts
declare function withEventHandler <E>(
  eventType: string
): <P>(props$: Observable<P>) => Observable<P&EventHandlerProps<E>>

type EventHandlerProps<E> = EventHandlerProp<E> & Partial<EventProp<E>>

interface EventHandlerProp<E> {
  [onEventType: string]: (event: E) => void
}

interface EventProp<E> {
  [eventType: string]: E
}
```

# TypeScript
although this library is written in [TypeScript](https://www.typescriptlang.org),
it may also be imported into plain JavaScript code:
modern code editors will still benefit from the available type definition,
e.g. for helpful code completion.

# License
Copyright 2018 Stéphane M. Catala

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the [License](./LICENSE) for the specific language governing permissions and
Limitations under the License.
