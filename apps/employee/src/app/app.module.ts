
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PromptModule } from '@angular-nx/prompt';
import { LoginComponent, AuthService, AuthModule } from '@angular-nx/auth';
import { Routes, RouterModule } from '@angular/router';

import { NxModule } from '@nrwl/nx';

import { AppComponent } from './app.component';
import { MaterialAppModule } from './material.app.module';
import { AuthGuard } from './auth.guard';
import { ShellComponent } from './shell.component';



const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'employee'
      },
      {
        path: 'employee',
        loadChildren: './employee/employee.module#EmployeeModule'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
  ,
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  declarations: [AppComponent, ShellComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    NxModule.forRoot(),
    BrowserAnimationsModule,
    MaterialAppModule,
    RouterModule.forRoot(routes),
    AuthModule,
    PromptModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
