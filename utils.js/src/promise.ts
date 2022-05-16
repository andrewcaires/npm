type forEachCallback<T> = (value: T, index: number, arr: Array<T>) => Promise<void>;

export const forEachAsync = async <T>(arr: Array<T>, callback: forEachCallback<T>, thisArg?: any): Promise<void> => {

  await Promise.all(arr.map((value, index) => {

    return callback.call(thisArg || null, value, index, arr);
  }));
}

export const forEachSeries = async <T>(arr: Array<T>, callback: forEachCallback<T>, thisArg?: any): Promise<void> => {

  for (let index = 0; index < arr.length; index++) {

    await callback.call(thisArg || null, arr[index], index, arr);
  }
}

export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
