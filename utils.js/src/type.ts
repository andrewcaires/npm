import { TypeObjectString } from "./typedef";

const types: TypeObjectString = {};

export const isArray = (test: any): test is Array<any> => type(test) == "array";

export const isBoolean = (test: any): test is boolean => type(test) == "boolean";

export const isDef = (test: any): test is any => type(test) != "null";

export const isFunction = (test: any): test is Function => type(test) == "function";

export const isNumber = (test: any): test is number => type(test) == "number";

export const isObject = (test: any): test is object => type(test) == "object";

export const isString = (test: any): test is string => type(test) == "string";

export const isFloat = (test: any): test is number => isNumber(test) && !!(test % 1);

export const isInteger = (test: any): test is number => isNumber(test) && !(test % 1);

export const isNull = (test: any): test is null => test === null;

export const isUndefined = (test: any): test is undefined => test === undefined;

export const type = (test: any): string => test == null ? "null" : types[types.toString.call(test)] || "object";

["Array", "Boolean", "Function", "Number", "Object", "String"].forEach((type) => types["[object " + type + "]"] = type.toLowerCase());
