export const removeFileExtension = (string: string) =>
  string.includes('.') ? string.split('.')[0] : string;
