import { TypeObjectAny } from "./typedef";

export const allowedObject = (allowed: string[], raw: TypeObjectAny): TypeObjectAny => {

  return allowed.reduce((obj, key) => ({ ...obj, [key]: raw[key] }), {});
}

export const deniedObject = (denied: string[], raw: TypeObjectAny): TypeObjectAny => {

  return allowedObject(Object.keys(raw).filter((value) => denied.indexOf(value) == -1), raw);
}
