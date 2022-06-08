import { isArray, isObject } from "./type";
import { TypeCallback, TypeCallbackArray, TypeCallbackObject, TypeObject } from "./typedef";

type EachCallback = TypeCallback<any, string | number, any, any>;

type LoopCallback = (index: number, count: number) => any;

export const forEachIndex = <T>(array: Array<T>, callback: TypeCallbackArray<T>, thisArg?: any): Array<T> => {

  const length = array.length;

  for (let index = 0; index <= length; index++) {

    if (callback.call(thisArg, array[index], index, array) === false) {

      break;
    }
  }

  return array;
}

export const forEachKey = <T>(object: TypeObject<T>, callback: TypeCallbackObject<T>, thisArg?: any): TypeObject<T> => {

  const keys = Object.keys(object);

  for (let key in keys) {

    if (callback.call(thisArg, object[key], key, object) === false) {

      break;
    }
  }

  return object;
}

export const each = (object: any, callback: EachCallback, thisArg?: any): any => {

  if (isArray(object)) {

    return forEachIndex(object, callback, thisArg);
  }

  if (isObject(object)) {

    return forEachKey(object, callback, thisArg);
  }

  return null;
}

export const loop = (count: number, callback: LoopCallback, thisArg?: any) => {

  for (let index = 1; index <= count; index++) {

    if (callback.call(thisArg, index, count) === false) {

      break;
    }
  }

  return count;
}

export const map = <T>(object: TypeObject<T>, callback: TypeCallbackObject<T>, thisArg?: any): TypeObject<T> => {

  const keys = Object.keys(object);

  for (let key in keys) {

    object[key] = callback.call(thisArg, object[key], key, object);
  }

  return object;
}

export const noop = () => { }
