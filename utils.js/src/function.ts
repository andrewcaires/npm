type forEachCallback = (value: any, key: string, object: any) => void | boolean;
type forLoopCallback = (index: number, count: number) => void;
type forMapCallback = (value: any, key: string, object: any) => any;

export const forEach = (object: any, callback: forEachCallback, thisArg?: any) => {

  const keys = Object.keys(object);

  for (let key in keys) {

    if (callback.call(thisArg, object[key], key, object) === false) {

      return object;
    }
  }

  return object;
}

export const forLoop = (count: number, callback: forLoopCallback, thisArg?: any) => {

  for (let index = 1; index <= count; index++) {

    callback.call(thisArg, index, count);
  }

  return count;
}

export const forMap = (object: any, callback: forMapCallback, thisArg?: any): any => {

  const keys = Object.keys(object);

  for (let key in keys) {

    object[key] = callback.call(thisArg, object[key], key, object);
  }

  return object;
}

export const noop = () => { }
