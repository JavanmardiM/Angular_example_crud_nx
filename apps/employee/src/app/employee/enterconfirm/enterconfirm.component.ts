import { CloseDrawerEvent } from './../services/employee-drawer.service';
import { Component, OnInit } from '@angular/core';
import { EmployeeDrawerService } from '../services/employee-drawer.service';

@Component({
  selector: 'angular-nx-enterconfirm',
  templateUrl: './enterconfirm.component.html',
  styleUrls: ['./enterconfirm.component.css'],
  host: {
    'class': 'angular-nx-enterconfirm'
  }
})
export class EnterconfirmComponent implements OnInit {

  constructor(
    private employeeDrawerService: EmployeeDrawerService
  ) {}

  ngOnInit() {
  }

  cancel(): void {
    this.employeeDrawerService.changeDrawerState(
      new CloseDrawerEvent()
    );
  }
}
