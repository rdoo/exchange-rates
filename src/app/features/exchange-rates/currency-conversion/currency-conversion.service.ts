import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConversionService {
  // TODO: javascript numbers are not precise so for financial calculations consider using a library like bignumber.js
  // TODO: write unit tests
  convertCurrency(amount: number, rate1: number, rate2: number): number {
    return (amount * rate1) / rate2;
  }
}
