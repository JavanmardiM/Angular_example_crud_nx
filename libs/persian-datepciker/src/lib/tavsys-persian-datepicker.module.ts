import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersianDatepickerComponent } from './persian-datepicker/persian-datepicker.component';
import { PersianCalendarComponent } from './persian-calendar/persian-calendar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatButtonModule, MatCardModule, MatGridListModule, MatSelectModule, MatDividerModule, MatTooltipModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { PersianDatepickerToggle, PersianDatepickerToggleIcon } from './persian-datepicker-toggle/persian-datepicker-toggle';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    A11yModule,
    FlexLayoutModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatTooltipModule
  ],
  declarations: [
    PersianDatepickerComponent,
    PersianCalendarComponent,
    PersianDatepickerToggle,
    PersianDatepickerToggleIcon
  ],
  entryComponents: [PersianCalendarComponent],
  exports: [
    PersianDatepickerComponent,
    PersianDatepickerToggle,
    PersianDatepickerToggleIcon
  ]
})
export class TavsysPersianDatepcikerModule {}
