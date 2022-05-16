type objectRaw = { [key: string]: any };

export const allowedObject = (allowed: string[], raw: objectRaw): objectRaw => {

  return allowed.reduce((obj, key) => ({ ...obj, [key]: raw[key] }), {});
}

export const deniedObject = (denied: string[], raw: objectRaw): objectRaw => {

  return allowedObject(Object.keys(raw).filter((value) => denied.indexOf(value) == -1), raw);
}
