export const getParsedValue = (parsedValue: any): string => {
  if (typeof parsedValue === "string") {
    return `'${parsedValue}'`;
  }
  if (typeof parsedValue === "object") {
    if (parsedValue instanceof Date) {
      return `'${parsedValue.toISOString().split("T")[0]}'`;
    }
    if (Array.isArray(parsedValue)) {
      return `'{"${parsedValue.join('", "')}"}'`;
    }
    const objectKeys = Object.keys(parsedValue);
    const objectValues = Object.values(parsedValue);
    let objectAsString = "'{";
    objectKeys.forEach((objectKey, index) => {
      objectAsString += `"${objectKey}": "${objectValues[index]}"`;
      if (index !== objectKeys.length - 1) {
        objectAsString += ", ";
      }
    });
    objectAsString += "}'";
    return objectAsString;
  }
  return parsedValue;
};
