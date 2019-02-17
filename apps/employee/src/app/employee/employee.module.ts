import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { RegisterComponent } from './register/register.component';
import { EmployeeService } from './services/employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeesComponent } from './employees/employees.component';

@NgModule({
  declarations: [RegisterComponent, EmployeesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [EmployeeService],
  exports: [
    RegisterComponent,
    EmployeesComponent
  ]
})
export class EmployeeModule { }
