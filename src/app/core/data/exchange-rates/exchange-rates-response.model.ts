import { ExchangeRate } from './exchange-rate.model';

export type ExchangeRatesResponse = [
  {
    table: string;
    no: string;
    effectiveDate: string;
    rates: ExchangeRate[];
  }
];
