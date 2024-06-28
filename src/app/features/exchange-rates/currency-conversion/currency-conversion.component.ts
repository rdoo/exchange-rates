import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { map } from 'rxjs';
import { ExchangeRate } from '../../../core/data/exchange-rates/exchange-rate.model';
import { CurrencyConversionService } from './currency-conversion.service';
import { ValidationErrorsComponent } from '../../../core/components/validation-errors/validation-errors.component';
import { toSignal } from '@angular/core/rxjs-interop';

export type CurrencyConversionDialogData = ExchangeRate[] | null;

@Component({
  selector: 'app-currency-conversion',
  standalone: true,
  imports: [
    ValidationErrorsComponent,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButton,
  ],
  templateUrl: './currency-conversion.component.html',
  styleUrl: './currency-conversion.component.scss',
})
export class CurrencyConversionComponent {
  dialogData = inject<CurrencyConversionDialogData>(MAT_DIALOG_DATA);

  formBuilder = inject(FormBuilder);

  currencyConversionService = inject(CurrencyConversionService);

  form = this.formBuilder.nonNullable.group({
    amount: [
      undefined as number | undefined,
      [Validators.required, Validators.min(0)],
    ],
    from: [undefined as ExchangeRate | undefined, [Validators.required]],
    to: [undefined as ExchangeRate | undefined, [Validators.required]],
  });

  conversionResult = toSignal(
    this.form.valueChanges.pipe(
      map((value) => {
        if (this.form.invalid) {
          return null;
        }

        return this.currencyConversionService.convertCurrency(
          value.amount!,
          value.from!.mid,
          value.to!.mid
        );
      })
    )
  );
}
