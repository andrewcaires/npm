[![npm](https://img.shields.io/npm/v/@andrewcaires/translate?color=blue&logo=npm)](https://www.npmjs.com/package/@andrewcaires/translate)
[![downloads](https://img.shields.io/npm/dt/@andrewcaires/translate?color=blue)](https://www.npmjs.com/package/@andrewcaires/translate)
[![size](https://img.shields.io/bundlephobia/min/@andrewcaires/translate?color=blue)](https://github.com/andrewcaires/npm/tree/main/translate)
[![license](https://img.shields.io/github/license/andrewcaires/npm?color=blue)](https://github.com/andrewcaires/npm/blob/main/LICENSE)

# Translate

Plugin for translation

## Installation

`npm i @andrewcaires/translate`

## Usage

```js
import { Translate } from "@andrewcaires/translate";

Translate.options({
  locale: "en",
  locales: {
      "en": {
        "Hello world": "Hello world",
      },
      "pt": {
        "Hello world": "Olá Mundo",
      },
  },
});

console.log(Translate.translate("Hello world"));
```

## Api

- `translate` Translate a message

```js
const text = Translate.translate("Hello world");

const text = Translate.translate("Hello {name}", { name: "John" });
```

- `getLocale` Get language for translation

```js
const locale = Translate.getLocale();
```

- `setLocale` Set language for translation

```js
Translate.setLocale("en");
```

### Links

*  [Docs](https://github.com/andrewcaires/npm/blob/main/translate/README.md)
*  [GitHub](https://github.com/andrewcaires/npm/tree/main/translate)
*  [npm](https://www.npmjs.com/package/@andrewcaires/translate)

## License

*  [MIT](https://github.com/andrewcaires/npm/blob/main/LICENSE)
