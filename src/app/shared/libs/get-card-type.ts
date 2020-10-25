import { CCTypes } from '../cc-types';

import {
  CCData,
  CreditCardData
} from '../cc-data/card-data';

export const getCardType = (cardNumber: string): CCTypes =>
{
  // remove spaces/dashes from card number
  const creditCardNumber: string = cardNumber.replace(/[ -]/g, '');

  // loop over types and test each pattern
  const types: Array<string> = Object.keys(CCTypes as object);
  const n: number            = types.length;

  let i: number;
  let data: CCData;
  let pattern: RegExp;
  let type: string;

  for (i = 0; i < n; ++i)
  {
    type    = CCTypes[types[i]];
    data    = CreditCardData[type];
    pattern = data.pattern;

    if (pattern !== null && creditCardNumber.match(pattern)) {
      return type as CCTypes;
    }
  }

  return CCTypes.UNKNOWN;
};
