
const cacheIndex: any[] = [];
const cacheObject: object[] = [];

export const cache = (object: any): object => {

  const index = cacheIndex.indexOf(object);

  if (index >= 0) {

    return cacheObject[index];
  }

  const data = {};

  cacheIndex.push(object);
  cacheObject.push(data);

  return data;
}
