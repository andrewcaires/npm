import { EventEmitter, forEachKey, isString, isUndefined } from "@andrewcaires/utils.js";

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

export class Fetch extends EventEmitter {

  private _options: FetchOptions;

  constructor(options: FetchOptions = {}) {

    super();

    this._options = { headers: {}, timeout: 5000, ...options };
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

  private _request({ url, path, query, method, body, headers, timeout }: FetchInit): FetchRequest {

    url = this._url(url, path, query);

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

    if (isUndefined(timeout)) {

      timeout = this._options.timeout;
    }

    if (timeout) {

      setTimeout(() => controller.abort(), timeout);
    }

    return controller.signal;
  }

  private _url(base?: string, path?: string, query?: FetchQuery): string {

    const url = new URL(path || "", base || this._options.url);

    if (query) {

      forEachKey(query, (value, key) => url.searchParams.set(key, value));
    }

    return url.toString();
  }
}

export default Fetch;
