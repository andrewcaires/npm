export const camelCase = (str: string): string => {

  return str.toLowerCase().replace(/\W+/g, " ").trim().replace(/ (.)/g, ($1) => $1.toUpperCase()).replace(/ /g, "");
}

export const stringReverse = (str: string): string => {

  return str.split("").reverse().join("");
}
