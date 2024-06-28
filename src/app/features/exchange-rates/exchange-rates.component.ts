import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { catchError, of, switchMap, tap } from 'rxjs';
import { ExchangeRatesService } from '../../core/data/exchange-rates/exchange-rates.service';
import { ExchangeRatesListComponent } from './exchange-rates-list/exchange-rates-list.component';

@Component({
  selector: 'app-exchange-rates',
  standalone: true,
  imports: [ExchangeRatesListComponent, MatButton, MatToolbar, DatePipe],
  templateUrl: './exchange-rates.component.html',
  styleUrl: './exchange-rates.component.scss',
})
export class ExchangeRatesComponent {
  dialog = inject(MatDialog);

  exchangeRatesService = inject(ExchangeRatesService);

  filters = signal({
    date: new Date(),
  });

  exchangeRates = toSignal(
    toObservable(this.filters).pipe(
      switchMap((filters) => {
        const date = filters.date;

        // TODO: a date formatting library would be useful here
        const dateFormattedForApi = `${date.getFullYear()}-${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        return this.exchangeRatesService
          .getExchangeRates({
            date: dateFormattedForApi,
          })
          .pipe(
            tap(() => this.apiError.set('')),
            catchError((error: HttpErrorResponse) => {
              if (error.status === 404) {
                this.apiError.set(
                  'There is no exchange rate data for the chosen date'
                );
              } else {
                this.apiError.set('There was a problem with the request');
              }
              return of(null);
            })
          );
      })
    )
  );

  apiError = signal('');

  async openFiltersDialog() {
    // lazy load the dialog because otherwise it would be in the initial bundle
    const { ExchangeRatesFiltersComponent } = await import(
      './exchange-rates-filters/exchange-rates-filters.component'
    );

    const dialogRef = this.dialog.open(ExchangeRatesFiltersComponent, {
      data: this.filters(),
    });

    dialogRef.afterClosed().subscribe((newFilters) => {
      if (newFilters) {
        this.filters.set(newFilters);
      }
    });
  }

  async openCurrencyConversionDialog() {
    // lazy load the dialog because otherwise it would be in the initial bundle
    const { CurrencyConversionComponent } = await import(
      './currency-conversion/currency-conversion.component'
    );

    this.dialog.open(CurrencyConversionComponent, {
      data: this.exchangeRates(),
    });
  }
}
