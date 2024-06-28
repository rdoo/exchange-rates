import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { ExchangeRatesResponse } from './exchange-rates-response.model';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesService {
  http = inject(HttpClient);

  getExchangeRates({ date }: { date: string }) {
    return this.http
      .get<ExchangeRatesResponse>(
        `https://api.nbp.pl/api/exchangerates/tables/A/${date}?format=json`
      )
      .pipe(map((response) => response[0].rates));
  }
}
