import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

import { isCCLengthValid } from '../libs/is-length-valid';
import { getCardType     } from '../libs/get-card-type';
import { isValidLuhn     } from '../libs/is-valid-luhn';
import { CCTypes         } from '../cc-types';
import {
  CCData,
  CreditCardData,
} from '../cc-data/card-data';

export enum CREDIT_CARD_ERRORS
{
  INVALID_LENGTH   = 'invalid_length',
  UNSUPPORTED_CARD = 'unsupported card',
  INVALID_NUMBER   = 'invalid_number',
  INVALID_MONTH    = 'invalid_month',
  INVALID_CCV      = 'invalid_ccv',
  NONE             = 'none',
}
export const creditCardValidator: ValidatorFn = (controls: FormGroup): ValidationErrors | null =>
{
  if (controls === undefined || controls == null) {
    return {invalid_length: true};
  }

  // Card number group
  const cardNumberGroup = controls.get('cardNumberGroup');

  // Access the CC number, expiration month/year, and CVV.
  const cardNumberField: AbstractControl = cardNumberGroup.get('ccNumber');
  const expirationMonth: AbstractControl = cardNumberGroup.get('expirationMonth');
  const expirationYear: AbstractControl  = cardNumberGroup.get('expirationYear');
  const cvv: AbstractControl             = cardNumberGroup.get('cvv');

  const cardNumber: string = cardNumberField.value;
  const cardType: CCTypes = getCardType(cardNumber);

  if (cardType === CCTypes.UNKNOWN) {
    return {unsupported_card: true};
  }

  if (!isCCLengthValid(cardNumber, cardType)) {
    return {invalid_length: cardNumber.length};
  }

  if (!isValidLuhn(cardNumber))
  {
    return {invalid_number: cardNumber};
  }

  // Card number is okay - check expiration
  const selectedMonth: number = +expirationMonth.value;
  const selectedYear: number  = +expirationYear.value;

  const theDate: Date    = new Date();
  const curMonth: number = theDate.getMonth();
  const curYear: number  = theDate.getFullYear();

  if (selectedMonth <= curMonth && curYear == selectedYear) {
    return {invalid_month: selectedMonth};
  }

  // Finally, check CVV
  const cvvNumber: number = +cvv.value;
  const digits: number    = cvvNumber == 0 ? 0 : Math.floor(Math.log10(cvvNumber)) + 1;

  const ccData: CCData = CreditCardData[cardType];
 return digits === ccData.cvvDigits ? null : {'invalid_ccv': {value: cvvNumber}};
};
