import { isArray, isDef } from "./type";

export const chunkArray = <T>(array: Array<T>, length: number = 1): Array<Array<T>> => {

  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i += length) {

    result.push(array.slice(i, (i + length)));
  }

  return result;
}

export const toArray = (value: any): Array<any> => {

  return isArray(value) ? value : isDef(value) ? [value] : [];
}
