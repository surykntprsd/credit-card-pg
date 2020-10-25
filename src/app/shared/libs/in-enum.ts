export const inEnum = (value: string, enumeration: object): boolean => {

  if (value === undefined || value == null || value === '') {
    return false;
  }

  const keys: Array<string> = Object.keys(enumeration);
  const n: number      = keys.length;

  let i: number;
  for (i = 0; i < n; ++i) {
    if (value === enumeration[keys[i]]) {
      return true;
    }
  }

  return false;
};
