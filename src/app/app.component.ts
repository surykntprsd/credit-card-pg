import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  FormControl,
  FormGroup,
} from '@angular/forms';

import { CreditCardComponent } from './credit-card/credit-card.component';
import { CCGroupComponents } from './credit-card/credit-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit
{
  public paymentForm: FormGroup;
  @ViewChild(CreditCardComponent, {static: true})
  public creditCardComponent;

  constructor()
  {
    // empty
  }

  public ngOnInit(): void
  {
    this.paymentForm = new FormGroup({
      name: new FormControl(''),
      creditCard: this.creditCardComponent.ccSubGroup,
    });
  }

  public onSubmit(): void
  {
    const name = this.paymentForm.get('name');
    const ccGroup: FormGroup         = this.paymentForm.controls['creditCard'] as FormGroup;
    const cardNumber: string         = ccGroup.controls[CCGroupComponents.CREDIT_CARD_NUMBER].value;
    const expMonth: string           = ccGroup.controls[CCGroupComponents.EXPIRATION_MONTH].value;
    const expYear: string            = ccGroup.controls[CCGroupComponents.EXPIRATION_YEAR].value;
    const cvv: string                = ccGroup.controls[CCGroupComponents.CVV].value;

    console.log('Name        :', name.value);
    console.log('Card Number :', cardNumber);
    console.log('Exp. Month  :', expMonth);
    console.log('Exp. Year   :', expYear);
    console.log('CVV         :', cvv);
  }
}