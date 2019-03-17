import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from './employee/services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { AuthGuard } from './employee/services/auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'attendance', canActivate:[AuthGuard] , component: AttendanceComponent },
  { path: 'employeeList', canActivate:[AuthGuard] , component: EmployeeListComponent },
  { path: 'archive', canActivate:[AuthGuard] , component: ArchivedListComponent },
  { path: '**', redirectTo: ''}

];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    EmployeeModule,
    FlexLayoutModule,
    NxModule.forRoot(),
    BrowserAnimationsModule,
    MaterialAppModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
