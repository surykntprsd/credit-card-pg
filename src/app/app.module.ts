import {AbstractControlOptions, ReactiveFormsModule, ValidatorFn} from '@angular/forms';
import { BrowserModule       } from '@angular/platform-browser';
import { NgModule            } from '@angular/core';

import { AppComponent              } from './app.component';
import { CreditCardComponent       } from './credit-card/credit-card.component';
import { CreditCardNumberDirective } from './shared/directives/credit-card-number.directive';


@NgModule({
  declarations: [
    AppComponent,
    CreditCardComponent,
    CreditCardNumberDirective,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }