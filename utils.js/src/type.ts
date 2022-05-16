const types: { [key: string]: string } = {};

export const isArray = (test: any) => type(test) == "array";

export const isBoolean = (test: any) => type(test) == "boolean";

export const isDef = (test: any) => type(test) != "null";

export const isFunction = (test: any) => type(test) == "function";

export const isNumber = (test: any) => type(test) == "number";

export const isObject = (test: any) => type(test) == "object";

export const isString = (test: any) => type(test) == "string";

export const isFloat = (test: any) => isNumber(test) && !!(test % 1);

export const isInteger = (test: any) => isNumber(test) && !(test % 1);

export const isNull = (test: any) => test === null;

export const isUndefined = (test: any) => test === undefined;

export const type = (test: any): string => test == null ? "null" : types[types.toString.call(test)] || "object";

["Array", "Boolean", "Function", "Number", "Object", "String"].forEach((type) => types["[object " + type + "]"] = type.toLowerCase());
