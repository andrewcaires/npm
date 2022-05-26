[![npm](https://img.shields.io/npm/v/@andrewcaires/cookie?color=blue&logo=npm)](https://www.npmjs.com/package/@andrewcaires/cookie)
[![downloads](https://img.shields.io/npm/dt/@andrewcaires/cookie?color=blue)](https://www.npmjs.com/package/@andrewcaires/cookie)
[![size](https://img.shields.io/bundlephobia/min/@andrewcaires/cookie?color=blue)](https://www.npmjs.com/package/@andrewcaires/cookie)
[![license](https://img.shields.io/github/license/andrewcaires/npm?color=blue)](https://github.com/andrewcaires/npm/blob/main/LICENSE)

# Cookie

Plugin for HTTP cookie

## Installation

`npm i @andrewcaires/cookie`

## Usage

```js
import Cookie from '@andrewcaires/cookie';

Cookie.options({
  domain: '',
  expires: 86400, // value in milliseconds
  path: '/',
  secure: false,
});
```

## Api

- `all` Get all cookies

```js
const cookies = Cookie.all();
```

- `check` Check if a cookie exists

```js
const exists = Cookie.check('token');
```

- `get` Get a cookie

```js
const token = Cookie.get('token');
```

- `remove` Remove a cookie

```js
Cookie.remove('token');
```

- `set` Set a cookie

```js
Cookie.set('token', '...');

Cookie.set('token', '...', {
  domain: '',
  expires: 86400,
  path: '/',
  secure: false,
});
```

### Links

*  [Docs](https://github.com/andrewcaires/npm/blob/main/cookie/README.md)
*  [GitHub](https://github.com/andrewcaires/npm/tree/main/cookie)
*  [npm](https://www.npmjs.com/package/@andrewcaires/cookie)

## License

*  [MIT](https://github.com/andrewcaires/npm/blob/main/LICENSE)
