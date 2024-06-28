import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { notFutureDateValidator } from '../../../core/validators/not-future-date.validator';
import { ValidationErrorsComponent } from '../../../core/components/validation-errors/validation-errors.component';

export type ExchangeRatesFiltersDialogData = {
  date: Date;
};

@Component({
  selector: 'app-exchange-rates-filters',
  standalone: true,
  imports: [
    ValidationErrorsComponent,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButton,
  ],
  templateUrl: './exchange-rates-filters.component.html',
  styleUrl: './exchange-rates-filters.component.scss',
})
export class ExchangeRatesFiltersComponent {
  dialogRef = inject(MatDialogRef<ExchangeRatesFiltersComponent>);

  dialogData = inject<ExchangeRatesFiltersDialogData>(MAT_DIALOG_DATA);

  formBuilder = inject(FormBuilder);

  form = this.formBuilder.nonNullable.group({
    date: [
      this.dialogData.date,
      [Validators.required, notFutureDateValidator()],
    ],
  });

  get dateControl() {
    return this.form.get('date');
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(this.form.value);
  }
}
