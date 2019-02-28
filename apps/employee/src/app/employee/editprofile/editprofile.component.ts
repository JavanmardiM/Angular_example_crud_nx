import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import {
  EmployeeDrawerService,
  CloseDrawerEvent
} from '../services/employee-drawer.service';

@Component({
  selector: 'angular-nx-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss'],
  host: {
    class: 'angular-nx-editprofile'
  }
})
export class EditprofileComponent implements OnInit {
  @Output() cancelEdit = new EventEmitter<string>();

  constructor(private employeeDrawerService: EmployeeDrawerService) {}

  ngOnInit() {}

  cancel() {
    // this.employeeDrawerService.changeDrawerState(
    //   new CloseDrawerEvent()
    // );
    this.cancelEdit.emit('profile');
  }
}
