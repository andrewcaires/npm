export interface CookieOptions {
  domain?: string;
  expires?: number;
  path?: string;
  secure?: boolean;
}

export type CookieElements = { [key: string]: string };

const DefaultOptions: CookieOptions = {
  expires: 86400,
};

export class Cookie {

  private static _options: CookieOptions = { ...DefaultOptions };

  static all(): CookieElements {

    const split = document.cookie.split(";");

    const cookies = split.map((cookie) => {

      return cookie.split("=").map(decodeURIComponent);
    });

    return cookies.reduce((cookies, [key, val]) => {

      return (cookies[key.trim()] = val), cookies;

    }, {} as CookieElements);
  }

  static check(name: string): boolean {

    return !!Cookie.all()[name.trim()];
  }

  static get(name: string): string | undefined {

    return Cookie.all()[name.trim()] || undefined;
  }

  static options(options: CookieOptions = {}): void {

    Cookie._options = { ...Cookie._options, ...options };
  }

  static remove(name: string, options: CookieOptions = {}): void {

    Cookie.set(name, "", { ...options, expires: -86400 });
  }

  static set(name: string, value: string, options: CookieOptions = {}): void {

    document.cookie = Cookie._encode(name, value) + ";" + Cookie._attributes(options);
  }

  private static _attributes = (options: CookieOptions = {}): string => {

    const attributes: string[] = [];

    const { domain, expires, path, secure } = { ...Cookie._options, ...options };

    domain && attributes.push(Cookie._domain(domain));

    attributes.push(Cookie._expires(expires));
    attributes.push(Cookie._path(path));

    secure && attributes.push("secure");

    return attributes.join(";");
  }

  private static _domain = (domain: string): string => {

    return "domain=" + domain;
  }

  private static _encode = (name: string, value: string | number | boolean): string => {

    return encodeURIComponent(name.trim()) + "=" + encodeURIComponent(value);
  }

  private static _expires = (expires?: number): string => {

    const date = new Date();

    date.setTime(date.getTime() + (expires || 0) * 1000);

    return "expires=" + date.toUTCString();
  }

  private static _path = (path?: string): string => {

    return "path=" + (path ? path : "/");
  }
}

export default Cookie;
