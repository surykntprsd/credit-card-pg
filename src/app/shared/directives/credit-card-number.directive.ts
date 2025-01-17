import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output
} from '@angular/core';

import { CCTypes            } from '../cc-types';
import { CREDIT_CARD_ERRORS } from '../validators/card-validator';

// validation functions
import { getCardType     } from '../libs/get-card-type';
import { isCCLengthValid } from '../libs/is-length-valid';
import { isValidLuhn     } from '../libs/is-valid-luhn';

@Directive({
  selector: '[creditCardNumber]'
})
export class CreditCardNumberDirective implements OnInit
{
  protected _input: HTMLInputElement;                 // Direct reference to the Input element

  /**
   * Credit card type is detected (other than unknown)
   */
  @Output('onCreditCardType')
  protected _cardTypeOutput: EventEmitter<CCTypes>;

  /**
   * Valid credit card number detected
   */
  @Output('onCreditCardNumber')
  protected _cardNumberOutput: EventEmitter<string>;

  /**
   * Error detected while typing credit-card number
   */
  @Output('onCreditCardError')
  protected _cardErrorOutput: EventEmitter<string>;

  constructor(protected _elementRef: ElementRef)
  {
    this._input = this._elementRef.nativeElement as HTMLInputElement;

    this._cardTypeOutput   = new EventEmitter<CCTypes>();
    this._cardNumberOutput = new EventEmitter<string>();
    this._cardErrorOutput  = new EventEmitter<string>();
  }

  public ngOnInit(): void
  {
    this._cardTypeOutput.emit(CCTypes.UNKNOWN);
  }

  /**
   * Access the current credit-card number length
   */
  public get length(): number
  {
    return this._input.value.length;
  }

  // NOTE: HostListener fires change detection; consider RxJS fromEvent() as an alternative
  /** @internal */
  @HostListener('keydown', ['$event'])
  public onKeyDown(evt: KeyboardEvent): boolean
  {
    const key: string = evt.key;

    // Backspace and Delete are okay
    const code = evt.code.toLowerCase();
    if (code === 'backspace' || code === 'delete') {
      return true;
    }

    const value: RegExpMatchArray = key.match(/[\d -]+/);

    if (value == null) {
      return false;
    }

    return true;
  }

  /** @internal */
  @HostListener('keyup')
  public onKeyUp(): boolean
  {
    const cardNumber: string = this._input.value;

    /*
      Note:  In general, 2-4 digits is all it takes to identify the card type; after that, this test is redundant.  Make this
      more efficient as an exercise.
     */
    const cardType: CCTypes = getCardType(cardNumber);

    if (cardType === CCTypes.UNKNOWN)
    {
      this._cardErrorOutput.emit(CREDIT_CARD_ERRORS.UNSUPPORTED_CARD);
      return false;
    }
    else
    {
      this._cardTypeOutput.emit(cardType);
    }

    if (!isCCLengthValid(cardNumber, cardType))
    {
      this._cardErrorOutput.emit(CREDIT_CARD_ERRORS.INVALID_LENGTH);
      return false;
    }

    if (!isValidLuhn(cardNumber))
    {
      this._cardErrorOutput.emit(CREDIT_CARD_ERRORS.INVALID_NUMBER);
      return false;
    }

    this._cardErrorOutput.emit(CREDIT_CARD_ERRORS.NONE);
    this._cardNumberOutput.emit(cardNumber);

    return true;
  }
}
