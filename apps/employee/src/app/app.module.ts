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
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { AttendanceComponent } from './employee/attendance/attendance.component';
import { ArchivedListComponent } from './employee/archived-list/archived-list.component';
import { LoginComponent } from './employee/login/login.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'employeeList', component: EmployeeListComponent },
  { path: 'archive', component: ArchivedListComponent },
  { path: '**', redirectTo: ''}

];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    EmployeeModule,

    NxModule.forRoot(),
    BrowserAnimationsModule,
    MaterialAppModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
