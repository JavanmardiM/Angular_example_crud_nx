import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialEmployeeModule } from './material.employee.module';

import { RegisterComponent } from './register/register.component';
import { EmployeeService } from './services/employee.service';
import { EmployeesComponent } from './employees/employees.component';
import {
  AttendanceComponent,
  MatPaginatorIntlCro
} from './attendance/attendance.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { EnterconfirmComponent } from './enterconfirm/enterconfirm.component';
import { ExitconfirmComponent } from './exitconfirm/exitconfirm.component';
import { AbsenceconfirmComponent } from './absenceconfirm/absenceconfirm.component';
import { EmployeeDrawerService, DataService } from './services/employee-drawer.service';
import { MatPaginatorIntl } from '@angular/material';
import { DescriptionComponent } from './description/description.component';

import { TavsysPersianDatepcikerModule } from "@angular-nx/persian-datepciker";

@NgModule({
  declarations: [
    RegisterComponent,
    EmployeesComponent,
    AttendanceComponent,
    ViewprofileComponent,
    EditprofileComponent,
    EnterconfirmComponent,
    ExitconfirmComponent,
    AbsenceconfirmComponent,
    DescriptionComponent
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
    EmployeeDrawerService,DataService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }
  ],
  exports: [
    RegisterComponent,
    EmployeesComponent,
    AttendanceComponent,
    ViewprofileComponent,
    EnterconfirmComponent,
    DescriptionComponent
  ]
})
export class EmployeeModule {}
