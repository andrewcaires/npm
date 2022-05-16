export const dateFormat = (date: Date, format: string): string => {

  return format.replace(/%[yYmdHMS]/g, (type) => {

    let value: number;

    switch (type) {
      case "%y":
        value = date.getFullYear();
        break;
      case "%Y":
        return date.getFullYear().toString();
      case "%m":
        value = date.getMonth() + 1;
        break;
      case "%d":
        value = date.getDate();
        break;
      case "%H":
        value = date.getHours();
        break;
      case "%M":
        value = date.getMinutes();
        break;
      case "%S":
        value = date.getSeconds();
        break;
      default:
        return type.slice(1);
    }

    return ("0" + value.toString()).slice(-2);
  });
}
