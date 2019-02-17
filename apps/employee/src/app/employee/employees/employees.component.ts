import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(
      employees => this.employees = employees,
      err => console.log('An error occurred when getting all employees.', err)
    );
  }

}
