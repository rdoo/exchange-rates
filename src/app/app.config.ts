import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideNativeDateAdapter(),
    // by default angular material datepicker uses american date format which looks weird because of swapped days and months
    // the easiest way to change it is by changing a locale so im doing it here
    // changing only the date format without changing the locale is more complicated so I will not do it for now
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    // change default date format in angular date pipe to be the same as in datepicker
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'dd/MM/yyyy' },
    },
  ],
};
