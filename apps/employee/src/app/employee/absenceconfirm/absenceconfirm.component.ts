import { Component, OnInit } from '@angular/core';
import { EmployeeDrawerService, CloseDrawerEvent } from '../services/employee-drawer.service';

@Component({
  selector: 'angular-nx-absenceconfirm',
  templateUrl: './absenceconfirm.component.html',
  styleUrls: ['./absenceconfirm.component.css'],
  host:{
    'class':'angular-nx-absenceconfirm'
  }
})
export class AbsenceconfirmComponent implements OnInit {

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
