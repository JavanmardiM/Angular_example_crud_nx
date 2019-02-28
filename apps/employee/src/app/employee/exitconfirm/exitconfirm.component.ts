import { Component, OnInit } from '@angular/core';
import {
  EmployeeDrawerService,
  CloseDrawerEvent
} from '../services/employee-drawer.service';

@Component({
  selector: 'angular-nx-exitconfirm',
  templateUrl: './exitconfirm.component.html',
  styleUrls: ['./exitconfirm.component.css'],
  host: {
    'class': 'angular-nx-exitconfirm'
  }
})
export class ExitconfirmComponent implements OnInit {
  constructor(private employeeDrawerService: EmployeeDrawerService) {}

  ngOnInit() {}

  cancel(): void {
    this.employeeDrawerService.changeDrawerState(new CloseDrawerEvent());
  }
}
