const between = (value: number): number => Math.min(255, Math.max(0, value));

const parse = (color: string, percent: number): string => between(parseInt(color, 16) + percent).toString(16);

export const shadeColor = (color: string, percent: number): string => {

  return "#" + color.replace(/^#/, "").replace(/../g, (color) => ("0" + parse(color, percent)).slice(-2));
}
