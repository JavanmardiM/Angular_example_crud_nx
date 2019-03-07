import { Component, OnInit, Input } from '@angular/core';
import {
  EmployeeDrawerService,
  CloseDrawerEvent
} from '../services/employee-drawer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GateOption, EmployeeService } from '../services/employee.service';

@Component({
  selector: 'angular-nx-exitconfirm',
  templateUrl: './exitconfirm.component.html',
  styleUrls: ['./exitconfirm.component.css'],
  host: {
    'class': 'angular-nx-exitconfirm'
  }
})
export class ExitconfirmComponent implements OnInit {

  form:FormGroup;
  gateOption:GateOption={
    employeeId:0
  };

  @Input() employeeID : number;
  @Input() fullName : string;

  constructor(private employeeDrawerService: EmployeeDrawerService,
    formBuilder:FormBuilder,
    private employeeService : EmployeeService) {
      this.form=formBuilder.group({
        description : ['']
      });
    }

  ngOnInit() {}

  save(){
    const info : GateOption = this.form.value;
    this.gateOption={employeeId:this.employeeID, fullName:this.fullName, description:info.description}
    this.employeeService.employeeExit(this.employeeID,this.gateOption).subscribe(
      ID=>alert('ثبت شد.'),
      err=>alert('خطا')
    );
  }

  cancel(): void {
    this.employeeDrawerService.changeDrawerState(new CloseDrawerEvent());
  }
}
