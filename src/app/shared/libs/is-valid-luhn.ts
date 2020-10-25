export const isValidLuhn = (cardNumber: string): boolean =>
{
  const ccNumbers:Array<number> = cardNumber.split('').reverse().map( (val: string): number => +val );
  const len: number             = ccNumbers.length;

  let n: number   = 0;
  let sum: number = 0;
  let j: number   = 0;

  let digit: number;
  while (j < len)
  {
    digit = ccNumbers[n];
    digit = +digit;

    if (n % 2)
    {
      digit *= 2;
      sum += (digit < 10) ? digit : digit - 9;
    }
    else
    {
      sum += digit;
    }

    n = ++j;
  }

  return sum % 10 === 0;
};
