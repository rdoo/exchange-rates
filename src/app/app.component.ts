import { Component } from '@angular/core';
import { ExchangeRatesComponent } from './features/exchange-rates/exchange-rates.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ExchangeRatesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
