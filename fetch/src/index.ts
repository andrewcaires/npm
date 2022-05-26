import { EventEmitter, isDef, isString } from "@andrewcaires/utils.js";

export interface FetchOptions {
  url?: string;
  headers?: FetchHeaders;
  timeout?: number;
}

export interface FetchBody {
  json: boolean;
  parse: any;
}

export type FetchHeaders = { [key: string]: string };

export interface FetchInit {
  url?: string;
  path: string;
  query?: FetchQuery;
  method: string;
  body?: any;
  headers?: FetchHeaders;
  timeout?: number;
}

export type FetchQuery = { [key: string]: string };

export interface FetchRequest {
  url: string;
  method: string
  body: any
  signal: AbortSignal;
  headers: FetchHeaders;
}

export interface FetchResponse {
  data?: any;
  error?: string;
  raw?: Response;
}

const DefaultOptions: FetchOptions = {
  headers: {},
  timeout: 5000,
};

export class Fetch extends EventEmitter {

  private _options: FetchOptions;

  constructor(options: FetchOptions = {}) {

    super();

    this._options = { ...DefaultOptions, ...options };
  }

  create(options: FetchOptions = {}) {
    return new Fetch({ ...this._options, ...options });
  }

  async delete(path: string, query?: FetchQuery): Promise<FetchResponse> {
    return this.fetch({ method: "delete", path, query });
  }

  async get(path: string, query?: FetchQuery): Promise<FetchResponse> {
    return this.fetch({ method: "get", path, query });
  }

  async head(path: string, query?: FetchQuery): Promise<FetchResponse> {
    return this.fetch({ method: "head", path, query });
  }

  async options(path: string, query?: FetchQuery): Promise<FetchResponse> {
    return this.fetch({ method: "options", path, query });
  }

  async patch(path: string, body: any, query?: FetchQuery): Promise<FetchResponse> {
    return this.fetch({ method: "patch", path, query, body });
  }

  async post(path: string, body: any, query?: FetchQuery): Promise<FetchResponse> {
    return this.fetch({ method: "post", path, query, body });
  }

  async put(path: string, body: any, query?: FetchQuery): Promise<FetchResponse> {
    return this.fetch({ method: "put", path, query, body });
  }

  async request(path: string, query?: FetchQuery): Promise<FetchResponse> {
    return this.fetch({ method: "request", path, query });
  }

  async fetch(init: FetchInit): Promise<FetchResponse> {

    const request = this._request(init);

    const response: FetchResponse = {};

    try {

      this.emit("before", request);

      response.raw = await fetch(request.url, request);

      response.data = await this._data(response.raw);

      if (!response.raw.ok) {

        response.error = response.raw.statusText;
      }

      this.emit("complete", response);

    } catch (error: any) {

      this.emit("error", error);

      response.error = error.message;
    }

    return response;
  }

  private _body(body: any): FetchBody {

    const blob = body instanceof Blob;
    const form = body instanceof FormData;

    const json = !(blob || form || isString(body));

    return { json, parse: json ? body ? JSON.stringify(body) : null : body };
  }

  private _data(response: Response): Promise<any> {

    const type = response.headers.get("Content-Type")?.toLowerCase() || "";

    const text = type.indexOf("text/html") >= 0;
    const json = type.indexOf("application/json") >= 0;

    return !type || text ? response.text() : json ? response.json() : response.blob();
  }

  private _headers(headers?: FetchHeaders) {

    return { ...this._options.headers, ...headers };
  }

  private _query(query?: FetchQuery): string | undefined {

    const keys = Object.keys(query || {});

    const params = new URLSearchParams();

    if (query) {

      keys.forEach((key) => params.set(key, query[key]));
    }

    return keys.length ? "?" + params.toString() : undefined
  }

  private _request({ url, path, query, method, body, headers, timeout }: FetchInit): FetchRequest {

    const params = this._query(query);

    url = this._url(url, path, params);

    method = method.toUpperCase();

    headers = this._headers(headers);

    const { json, parse } = this._body(body);

    if (json) {

      headers["Content-Type"] = "application/json";
    }

    const signal = this._signal(timeout);

    return { url, method, body: parse, headers, signal };
  }

  private _signal(timeout?: number): AbortSignal {

    const controller = new AbortController;

    if (timeout || this._options.timeout) {

      setTimeout(() => controller.abort(), timeout || this._options.timeout);
    }

    return controller.signal;
  }

  private _url(url?: string, path?: string, query?: string): string {

    url = url || this._options.url;

    return [url, path, query].filter(isDef).map((value) => {

      return value?.toString().replace(/(^\/+|\/+$)/mg, "");

    }).join("/");
  }
}

export default Fetch;
