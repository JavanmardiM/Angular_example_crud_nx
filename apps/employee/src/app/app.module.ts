import { AbsenceconfirmComponent } from './employee/absenceconfirm/absenceconfirm.component';
import { ViewprofileComponent } from './employee/viewprofile/viewprofile.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NxModule } from '@nrwl/nx';

import { AppComponent } from './app.component';
import { EmployeeModule } from './employee/employee.module';
import { MaterialAppModule } from './material.app.module';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './employee/attendance/attendance.component';
import { RegisterComponent } from './employee/register/register.component';
import { EditprofileComponent } from './employee/editprofile/editprofile.component';
import { EnterconfirmComponent } from './employee/enterconfirm/enterconfirm.component';
import { ExitconfirmComponent } from './employee/exitconfirm/exitconfirm.component';

const appRoutes: Routes = [
  { path: '', component: AttendanceComponent },
  { path: '', component: RegisterComponent },
  { path: '', component: EditprofileComponent },
  { path: '', component: ViewprofileComponent },
  { path: '', component: AbsenceconfirmComponent },
  { path: '', component: EnterconfirmComponent },
  { path: '', component: ExitconfirmComponent }

];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    EmployeeModule,

    NxModule.forRoot(),
    BrowserAnimationsModule,
    MaterialAppModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
