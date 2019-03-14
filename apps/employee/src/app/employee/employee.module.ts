import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialEmployeeModule } from './material.employee.module';

import { RegisterComponent } from './register/register.component';
import { EmployeeService } from './services/employee.service';
import {  AttendanceComponent,  MatPaginatorIntlCro} from './attendance/attendance.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { EnterconfirmComponent } from './enterconfirm/enterconfirm.component';
import { ExitconfirmComponent } from './exitconfirm/exitconfirm.component';
import { AbsenceconfirmComponent } from './absenceconfirm/absenceconfirm.component';
import { EmployeeDrawerService } from './services/employee-drawer.service';
import { MatPaginatorIntl } from '@angular/material';
import { DescriptionComponent } from './description/description.component';

import { TavsysPersianDatepcikerModule } from "@angular-nx/persian-datepciker";
import { PersianDatePipe } from './persian-date.pipe';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ArchivedListComponent } from './archived-list/archived-list.component';

@NgModule({
  declarations: [
    RegisterComponent,
    AttendanceComponent,
    ViewprofileComponent,
    EditprofileComponent,
    EnterconfirmComponent,
    ExitconfirmComponent,
    AbsenceconfirmComponent,
    DescriptionComponent,
    PersianDatePipe,
    EmployeeListComponent,
    ArchivedListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialEmployeeModule,
    TavsysPersianDatepcikerModule
  ],
  providers: [
    EmployeeService,
    EmployeeDrawerService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }
  ],
  exports: [
    RegisterComponent,
    AttendanceComponent,
    ViewprofileComponent,
    EnterconfirmComponent,
    DescriptionComponent
  ]
})
export class EmployeeModule {}
