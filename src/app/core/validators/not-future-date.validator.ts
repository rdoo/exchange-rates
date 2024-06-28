import { AbstractControl, ValidatorFn } from '@angular/forms';

export function notFutureDateValidator(): ValidatorFn {
  return (control: AbstractControl<Date>) => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (value.getTime() > Date.now()) {
      return { notFutureDate: value };
    }

    return null;
  };
}
