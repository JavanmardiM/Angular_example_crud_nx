import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  EmployeeDrawerService,
  CloseDrawerEvent,
  DataService
} from '../services/employee-drawer.service';

@Component({
  selector: 'angular-nx-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.scss'],
  host: {
    class: 'angular-nx-viewprofile'
  }
})
export class ViewprofileComponent implements OnInit {
  employee = {
    number: '1',
    code: '3444445555',
    fullname: 'ali ali',
    phonenumber: '09125454454',
    nationalcode: '6564125452',
    address: 'شیراز شیراز'
  };

  flag: ViewFlag;

  @Output() flagViaOutput = new EventEmitter<ViewFlag>();

  constructor(
    private employeeDrawerService: EmployeeDrawerService,
    private data: DataService
  ) {}

  ngOnInit() {
    this.data.currentFlag.subscribe(flag => (this.flag = flag));
  }

  cancel(): void {
    this.employeeDrawerService.changeDrawerState(new CloseDrawerEvent());
  }

  onEditViaService() {
    this.data.changeFlag('edit');
  }

  onEditViaOutput() {
    this.flagViaOutput.emit('edit');
  }
}
type ViewFlag = null | 'edit';
