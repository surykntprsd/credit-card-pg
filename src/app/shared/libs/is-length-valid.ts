import { CCTypes } from '../cc-types';
import {
  CCData,
  CreditCardData
}                  from '../cc-data/card-data';
import { inEnum  } from './in-enum';

export const isCCLengthValid = (cardNumber: string, cardTypeIdentifier: string): boolean =>
{
  if (!inEnum(cardTypeIdentifier, CCTypes)) {
    return false;
  }

  const data: Partial<CCData> = CreditCardData[cardTypeIdentifier];
  const digits: number        = cardNumber.length;

  if (data.minLength !== undefined && data.maxLength !== undefined) {
    return digits >= data.minLength && digits <= data.maxLength;
  }

  return digits === data.length;
};
