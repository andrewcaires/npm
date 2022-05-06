export interface TranslateOptions {
  locale?: string;
  locales?: TranslateLocales;
}

export type TranslateLocale = { [key: string]: string }
export type TranslateLocales = { [key: string]: TranslateLocale }
export type TranslateParameters = { [key: string]: string | number | boolean }

let _options: TranslateOptions = {};

const _current = (): TranslateLocale => {
  return _options.locale && _options.locales && _options.locales[_options.locale] || {};
};

const _message = (message: string): string => {
  return _current()[message] || message;
};

export const Translate = {

  getLocale(): string | undefined {
    return _options.locale;
  },

  options(options: TranslateOptions = {}): void {
    _options = { ..._options, ...options };
  },

  setLocale(value: string): boolean {
    if (_options.locale != value) {
      _options.locale = value;
      return true;
    }
    return false;
  },

  translate(message: string, options: TranslateParameters = {}): string {
    return _message(message).replace(/{[0-9a-zA-Z]+}/g, (value: string) => {
      value = value.substring(1, value.length - 1);
      return options && options[value]?.toString() || `%${value}%`;
    });
  },
};

export default Translate;
