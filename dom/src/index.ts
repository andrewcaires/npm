import { camelCase, forEachIndex, forEachKey, isNull, isUndefined, noop, type, TypeCallbackArray, TypeCallbackMap, TypeObjectFunction, TypeObjectString } from "@andrewcaires/utils.js"

type DomElement = HTMLElement | SVGElement;

type DomList = Array<DomElement>;

type DomEventCallback = EventListener;

type DomSelector = Dom | string | number | DomList | DomElement;

const Types: TypeObjectFunction = {

  array: (selector: DomList, startNode: any) => selector,

  create: (selector: string, startNode: any) => [document.createElement(selector)],

  number: (selector: number, startNode: any) => Types.string(selector.toString(), startNode),

  string(selector: string, startNode: any) {
    try {
      if ("querySelectorAll" in startNode) {
        return startNode.querySelectorAll(selector);
      }
    } catch (e) { }
    return [];
  },

  object: (selector: DomElement, startNode: any) => selector ? [selector] : [],

};

const arr: DomList = [];

export class Dom {

  public length: number = 0;

  constructor(selector: DomSelector, startNode?: any) {
    this.push(...this.init(selector, startNode)(selector, startNode || document));
  }

  private fn(selector: DomSelector, startNode?: any): Function {
    return Types[isNull(startNode) ? 'create' : type(selector)] || Types['object'];
  }

  private init(selector: DomSelector, startNode?: any): Function {
    return selector instanceof Dom ? () => selector.toArray() : this.fn(selector, startNode);
  }

  add(selector: DomSelector, startNode?: any): Dom {
    return new Dom(this.toArray().concat((new Dom(selector, startNode)).toArray()));
  }

  clear(): Dom {
    return arr.splice.call(this, 0, this.length), this;
  }

  each(callback: TypeCallbackArray<DomElement>): Dom {
    return forEachIndex(this.toArray(), callback), this;
  }

  filter(callback: TypeCallbackArray<DomElement>): Dom {
    return new Dom(this.toArray().filter(callback));
  }

  forEach(callback: TypeCallbackArray<DomElement>): Dom {
    return this.toArray().forEach(callback, this), this;
  }

  get(index: number): DomElement | undefined {
    return arr.at.call(this, index);
  }

  map(callback: TypeCallbackMap<DomElement>): Dom {
    return new Dom(this.toArray().map(callback, this));
  }

  push(...items: DomList): Dom {
    return arr.push.call(this, ...items), this;
  }

  slice(start?: number, end?: number): Dom {
    return new Dom(arr.slice.call(this, start, end));
  }

  splice(start: number, deleteCount: number, ...items: DomList): Dom {
    return new Dom(arr.splice.call(this, start, deleteCount, ...items));
  }

  timeout(callback: Function, time: number): Dom {
    return setTimeout(callback || noop, time || 1, this), this;
  }

  toArray(): DomList {
    return arr.slice.call(this);
  }

  unique(): Dom {
    return this.filter((value, index, list) => list.indexOf(value) === index);
  }

  attr(name: string, value?: string | null): Dom | string | null {
    if (isNull(value)) {
      return this.forEach((elem) => elem.removeAttribute(name));
    }
    if (isUndefined(value)) {
      const elem = this.get(0);
      return elem ? elem.getAttribute(name) : null;
    }
    return this.forEach((elem) => elem.setAttribute(name, value || ""));
  }

  addClass(name: string): Dom {
    return this.forEach((elem) => elem.classList.add(name));
  }

  hasClass(name: string): boolean {
    let check = false;
    return this.each((elem) => {
      return (check = elem.classList.contains(name)), !check;
    }), check;
  }

  toggleClass(name: string): Dom {
    return this.forEach((elem) => elem.classList.toggle(name));
  }

  removeClass(name: string): Dom {
    return this.forEach((elem) => elem.classList.remove(name));
  }

  off(name: string, callback: EventListener, useCapture: boolean = false): Dom {
    return this.forEach((elem) => elem.removeEventListener(name, callback, useCapture));
  }

  on(name: string, callback: DomEventCallback, useCapture: boolean = false): Dom {
    return this.forEach((elem) => elem.addEventListener(name, callback, useCapture));
  }

  one(name: string, callback: DomEventCallback, useCapture: boolean = false): Dom {
    const one = (event: Event) => this.off(name, one, useCapture) && callback(event);
    return this.on(name, one, useCapture);
  }

  trigger(name: string, custom?: object) {
    const event = custom ? new CustomEvent(name, custom) : new Event(name);
    return this.forEach((elem) => elem.dispatchEvent(event));
  }

  style(prop: string, value?: string): Dom | string | null {
    prop = camelCase(prop);
    if (isUndefined(value)) {
      const elem = this.get(0);
      return elem ? (<any>getComputedStyle(elem))[prop] : null;
    }
    return this.forEach((elem) => ((<any>elem.style)[prop] = value));
  }

  css(styles: TypeObjectString): Dom {
    return forEachKey(styles, (value, key) => this.style(value, key)), this;
  }

  static parseHtml(text: string): Dom {
    const doc = document.implementation.createHTMLDocument();
    return doc.body.innerHTML = text, new Dom(arr.slice.call(doc.body.childNodes));
  }

  append(node: Dom | DomElement) {
    let clone = false;
    const list = new Dom(node);
    return this.forEach((elem) => {
      list.forEach((elem2) => {
        elem.appendChild(clone ? elem2.cloneNode(true) : elem2);
        clone = true;
      });
    });
  }

  children() {
    const elems: DomList = [];
    this.forEach((elem) => {
      elems.push(...arr.slice.call(elem.children));
    })
    return (new Dom(elems)).unique();
  }

  clone(deep: boolean = true) {
    return this.map((elem) => elem.cloneNode(deep) as any);
  }

  contains(other: DomElement): boolean {
    let contains = false;
    return this.each((elem2) => (contains = elem2.contains(other), !contains)), contains;
  }

  find(selector: DomSelector): Dom {
    const elems: DomList = [];
    this.forEach((elem) => elems.push(...(new Dom(selector, elem)).toArray()));
    return new Dom(elems).unique();
  }

  html(text?: string): Dom | string | null {
    if (isUndefined(text)) {
      const elem = this.get(0);
      return elem ? elem.innerHTML : null;
    }
    return this.forEach((elem) => (elem.innerHTML = text as any));
  }

  parent() {
    return this.map((elem) => elem.parentElement || elem).unique();
  }

  prepend(node: Dom | DomElement) {
    let clone = false;
    const list = new Dom(node);
    return this.forEach((elem) => {
      if (elem.firstChild) {
        list.toArray().reverse().forEach((elem2) => {
          elem.insertBefore(clone ? elem2.cloneNode(true) : elem2, elem.firstChild);
          clone = true;
        });
      } else {
        list.forEach((elem2) => {
          elem.appendChild(clone ? elem2.cloneNode(true) : elem2);
          clone = true;
        });
      }
    });
  }

  prop(name: string, value?: string): Dom | string | null {
    if (isUndefined(value)) {
      const elem = this.get(0) as any;
      return elem ? elem[name] : null;
    }
    return this.forEach((elem: any) => (elem[name] = value));
  }

  remove() {
    return this.forEach((elem) => {
      elem.parentNode && elem.parentNode.removeChild(elem);
    });
  }
}

export const dom = (selector: DomSelector, startNode?: any): Dom => new Dom(selector, startNode);
