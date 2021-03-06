const chr = (slice: number): string => Math.random().toString(16).slice(slice);

const chr3 = (): string => chr(-3);
const chr4 = (): string => chr(-4);

const chr8 = (): string => chr4() + chr4();
const chr12 = (): string => chr8() + chr4();
const chr16 = (): string => chr8() + chr8();

export const simpleID = (): string => chr3() + chr4();

export const uniqueID = (): string => chr16() + chr16() + chr16() + chr16();

export const uuidv4 = (): string => chr8() + "-" + chr4() + "-4" + chr3() + "-" + chr4() + "-" + chr12();
