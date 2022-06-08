import { TypeCallback } from "./typedef";

type ForEachCallback<T> = TypeCallback<T, number, Array<T>, Promise<void>>;

export const forEachAsync = async <T>(array: Array<T>, callback: ForEachCallback<T>, thisArg?: any): Promise<void> => {

  await Promise.all(array.map((value, index) => callback.call(thisArg, value, index, array)));
}

export const forEachSeries = async <T>(array: Array<T>, callback: ForEachCallback<T>, thisArg?: any): Promise<void> => {

  for (let index = 0; index < array.length; index++) {

    await callback.call(thisArg, array[index], index, array);
  }
}

export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
