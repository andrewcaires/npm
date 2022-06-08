export type TypeArray<T> = Array<T>;
export type TypeArrayAny = TypeArray<any>;
export type TypeArrayString = TypeArray<string>;
export type TypeArrayNumber = TypeArray<number>;
export type TypeArrayFunction = TypeArray<Function>;

export type TypeObject<T> = { [key: string]: T };
export type TypeObjectAny = TypeObject<any>;
export type TypeObjectString = TypeObject<string>;
export type TypeObjectNumber = TypeObject<number>;
export type TypeObjectFunction = TypeObject<Function>;

export type TypeCallback<T, K, O, R> = (value: T, key: K, object: O) => R;
export type TypeCallbackArray<T> = TypeCallback<T, number, TypeArray<T>, any>;
export type TypeCallbackMap<T> = TypeCallback<T, number, TypeArray<T>, T>;
export type TypeCallbackObject<T> = TypeCallback<T, string, TypeObject<T>, any>;
