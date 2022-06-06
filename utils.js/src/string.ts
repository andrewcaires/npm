type CamelCaseCallback = (text: string) => string;

const baseCamelCase = (text: string, callback: CamelCaseCallback): string => {

  return callback(text.toLowerCase().replace(/\W+/g, " ")).replace(/\s/g, "");
}

export const lowerCamelCase = (text: string): string => {

  return baseCamelCase(text, (text) => text.replace(/\s(\w)/g, ($0) => $0.toUpperCase()));
}

export const camelCase = lowerCamelCase;

export const upperCamelCase = (text: string): string => {

  return baseCamelCase(text, (text) => text.replace(/(\w)(\w*)/g, ($0, $1, $2) => $1.toUpperCase() + $2));
}

export const stringReverse = (text: string): string => {

  return text.split("").reverse().join("");
}
