[![npm](https://img.shields.io/npm/v/@andrewcaires/utils.js?color=blue&logo=npm)](https://www.npmjs.com/package/@andrewcaires/utils.js)
[![downloads](https://img.shields.io/npm/dt/@andrewcaires/utils.js?color=blue)](https://www.npmjs.com/package/@andrewcaires/utils.js)
[![size](https://img.shields.io/bundlephobia/min/@andrewcaires/utils.js?color=blue)](https://www.npmjs.com/package/@andrewcaires/utils.js)
[![license](https://img.shields.io/github/license/andrewcaires/npm?color=blue)](https://github.com/andrewcaires/npm/blob/main/LICENSE)

# utils.js

JavaScript utility library for web and nodejs development

## Installation

`npm i @andrewcaires/utils.js`

## Api

### EventEmitter

Class for custom events

```js
import { EventEmitter } from '@andrewcaires/utils.js';

const emitter = new EventEmitter();

// OR

class CustomEvent extends EventEmitter {}

const custom = new CustomEvent();

```

- `EventEmitter.on` Adds the listener function to the end of the listeners array for the event named

```js
const cb = (data) => {

  console.log(data);
}

emitter.on('event', cb);
```

- `EventEmitter.once` Adds the listener function to the end of the listeners array for the event named. The next time event is triggered, this listener is removed

```js
const cb = (data) => {

  console.log(data);
}

emitter.once('event', cb);
```

- `EventEmitter.off` Removes the specified listener from the listener array for the event named

```js
emitter.off('event', cb);
```

- `EventEmitter.emit` Synchronously calls each of the listeners registered for the event named

```js
emitter.emit('event', 'on emit event');
```

### type

Determine the internal JavaScript [[Class]] of an object

```js
import { isArray, isBoolean, isFunction, isNumber, isObject, isString, isFloat, isInteger, isNull, isUndefined, isValid, type } from '@andrewcaires/utils.js';
```

- `isArray` Finds whether a variable is an array

```js
isArray([]) // > true
```

- `isBoolean` Finds out whether a variable is a boolean

```js
isBoolean(true) // > true
isBoolean(false) // > true
```

- `isDef` Find out if a variable has been defined

```js
isDef(any) // > true
```

- `isFunction` Find whether the type of a variable is function

```js
isFunction(function() {}) // > true
```

- `isNumber` Finds whether a variable is an number

```js
isNumber(1) // > true
isNumber(1.7) // > true
```

- `isObject` Finds whether a variable is an object

```js
isObject({}) // > true
```

- `isString` Find whether the type of a variable is string

```js
isString('') // > true
```

- `isFloat` Finds whether the type of a variable is float

```js
isFloat(1.7) // > true
```

- `isInteger` Find whether the type of a variable is integer

```js
isInteger(1) // > true
```

- `isNull` Finds whether a variable is null

```js
isNull(null) // > true
```

- `isUndefined` Finds whether a variable is undefined

```js
isUndefined(undefined) // > true
```

- `type` Get the type of a variable

```js
type([]); // => 'array'

type(true); // => 'boolean'
type(false); // => 'boolean'

type(frunction() {}); // => 'function'

type(1); // => 'number'
type(1.7); // => 'number'

type({}); // => 'object'

type(''); // => 'string'
type('test'); // => 'string'

type(); // => 'null'
type(null); // => 'null'
```

## Links

* [Docs](https://github.com/andrewcaires/utils.js#readme)
* [GitHub](https://github.com/andrewcaires/utils.js)
* [npm](https://www.npmjs.com/package/@andrewcaires/utils.js)

## License

* [MIT License](https://github.com/andrewcaires/utils.js/blob/main/LICENSE)
