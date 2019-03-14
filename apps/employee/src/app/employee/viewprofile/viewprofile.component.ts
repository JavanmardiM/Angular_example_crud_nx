import {
  EmployeeService,
  EmploeeProfile
} from './../services/employee.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  AfterContentChecked,
  Input,
  OnDestroy
} from '@angular/core';
import {
  EmployeeDrawerService,
  CloseDrawerEvent,
} from '../services/employee-drawer.service';

@Component({
  selector: 'angular-nx-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.scss'],
  host: {
    class: 'angular-nx-viewprofile'
  }
})
export class ViewprofileComponent implements OnInit, OnDestroy, AfterContentChecked {
  // employee = {
  //   number: '1',
  //   code: '3444445555',
  //   fullname: 'ali ali',
  //   phonenumber: '09125454454',
  //   nationalcode: '6564125452',
  //   address: 'شیراز شیراز'
  // };


  //2 way of defining input
  //first

  // @Input()
  // public set empId(id : number) {
  //   console.log('Selected Employee Id: ', id);

  //   this._empId = id;
  // }
  // public get empId() : number {
  //   return this._empId;
  // }
  // private _empId: number

  //second
  @Input() public empId: number;

  flag: ViewFlag;

  employeeInfo: EmploeeProfile = {
    employeeId: 0,
    fullName: '',
    nationalCode: '',
    mobileNumber: '',
    address: ' '
  };

  @Output() flagViaOutput = new EventEmitter<ViewFlag>();

  constructor(
    private employeeService: EmployeeService,
    private employeeDrawerService: EmployeeDrawerService,
  ) {}

  ngOnInit() {
    this.employeeService.viewEmploee(this.empId).subscribe(
      employeeInfo => {
        this.employeeInfo = employeeInfo;
      },
      err => console.log("error occured"+err)
    );
  }

  ngOnDestroy(): void {
  }

  ngAfterContentChecked() {}

  cancel(): void {
    this.employeeDrawerService.changeDrawerState(new CloseDrawerEvent('viewprofile'));
  }
}
type ViewFlag = null | 'edit';
