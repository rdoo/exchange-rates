import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ExchangeRate } from '../../../core/data/exchange-rates/exchange-rate.model';

@Component({
  selector: 'app-exchange-rates-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './exchange-rates-list.component.html',
  styleUrl: './exchange-rates-list.component.scss',
})
export class ExchangeRatesListComponent {
  data = input.required<ExchangeRate[]>();

  displayedColumns = ['symbol', 'name', 'rate'];
}
