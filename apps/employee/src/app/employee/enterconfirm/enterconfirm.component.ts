import { GateOption, EmployeeService } from './../services/employee.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CloseDrawerEvent } from './../services/employee-drawer.service';
import { Component, OnInit, Input } from '@angular/core';
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

  form:FormGroup;
  gateOption:GateOption={
    employeeId:0,

  };
  @Input() employeeID : number;
  @Input() fullName : string;

  constructor(
    formBuilder:FormBuilder,
    private employeeDrawerService: EmployeeDrawerService,
    private employeeService : EmployeeService
  ) {
    this.form= formBuilder.group({
      description:['']
    });
  }

  ngOnInit() {
  }

  save(){
    if(this.form.valid){
      const info : GateOption = this.form.value;
      this.gateOption={employeeId : this.employeeID, fullName : this.fullName, description : info.description};
      console.log(this.gateOption);
      this.employeeService.employeeEnter(this.employeeID,this.gateOption).subscribe();
    }
  }

  cancel(): void {
    this.employeeDrawerService.changeDrawerState(
      new CloseDrawerEvent()
    );
  }
}
