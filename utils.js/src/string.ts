type replaceCallback = (text: string) => string;

export const cutText = (text: string, length: number) => {
  if (text.length > length) {
    const words = text.substring(0, length).split(" ");
    words.pop();
    return words.join(" ") + "...";
  }
  return text;
}

const replace = (text: string, callback: replaceCallback): string => {

  return callback(text.toLowerCase().replace(/\W+/g, " ")).replace(/\s/g, "");
}

export const lowerCamelCase = (text: string): string => {

  return replace(text, (text) => text.replace(/\s(\w)/g, ($0) => $0.toUpperCase()));
}

export const camelCase = lowerCamelCase;

export const upperCamelCase = (text: string): string => {

  return replace(text, (text) => text.replace(/(\w)(\w*)/g, ($0, $1, $2) => $1.toUpperCase() + $2));
}

export const stringReverse = (text: string): string => text.split("").reverse().join("");
