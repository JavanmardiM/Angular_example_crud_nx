import { Component, OnInit, Input } from '@angular/core';
import {
  EmployeeDrawerService,
  CloseDrawerEvent
} from '../services/employee-drawer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GateOption, EmployeeService, AttendanceList } from '../services/employee.service';
import { MatSnackBar } from '@angular/material';

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
  gateOption:GateOption = {
    employeeId:0
  };

  @Input() selectedEmployee : AttendanceList;

  constructor(
    private employeeDrawerService: EmployeeDrawerService,
    formBuilder:FormBuilder,
    private employeeService : EmployeeService,
    private snackBar: MatSnackBar
    ) {
      this.form=formBuilder.group({
        description : ['']
      });
    }

  ngOnInit() {}

  save(){
    const info : GateOption = this.form.value;
    this.gateOption={employeeId:this.selectedEmployee.employeeId, description:info.description}
    this.employeeService.employeeExit(this.selectedEmployee.employeeId , this.gateOption).subscribe(
      ID=>{
        this.snackBar.open(`خروج برای کاربر با شماره پرسنلی ${ID} در سیستم ثبت شد`, 'بستن', {
          duration: 2000,
        });
        this.employeeDrawerService.changeDrawerState(new CloseDrawerEvent<AttendanceList>('exitconfirm', {
          employeeId : this.selectedEmployee.employeeId,
          fullName : this.selectedEmployee.fullName,
          date :this.selectedEmployee.date,
          description : [this.selectedEmployee.description[0],info.description,this.selectedEmployee.description[2]],
          enterTime :this.selectedEmployee.enterTime,
          exitTime : new Date().toLocaleTimeString(),
          isAbsence : false
        }));
      },
      err => {
        this.snackBar.open('با عرض پوزش در سیستم خطا رخ داد', 'بستن', {
          duration: 2000,
        });
      }
    );
  }

  cancel(): void {
    this.employeeDrawerService.changeDrawerState(new CloseDrawerEvent<any>('', null));

  }
}
