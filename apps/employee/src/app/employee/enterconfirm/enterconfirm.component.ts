import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { moment } from 'moment-jalaali';
import {MatSnackBar} from '@angular/material';
import { GateOption, EmployeeService, EmployeeList } from './../services/employee.service';
import { CloseDrawerEvent } from './../services/employee-drawer.service';
import { EmployeeDrawerService } from '../services/employee-drawer.service';

@Component({
  selector: 'angular-nx-enterconfirm',
  templateUrl: './enterconfirm.component.html',
  styleUrls: ['./enterconfirm.component.css'],
  host: {
    'class': 'angular-nx-enterconfirm'
  }
})
export class EnterconfirmComponent{

  form : FormGroup;
  gateOption : GateOption = {
    employeeId:0,
  };

  @Input() selectedEmployee : EmployeeList;
  @Output() isEntered = new EventEmitter<boolean>();
  option={hour12:false};

  constructor(
    formBuilder:FormBuilder,
    private employeeDrawerService: EmployeeDrawerService,
    private employeeService : EmployeeService,
    private snackBar: MatSnackBar
  ) {
    this.form = formBuilder.group({
      description : ['']
    });
  }

  save(){
    if(this.form.valid){
      const info : GateOption = this.form.value;
      this.gateOption={employeeId : this.selectedEmployee.employeeId, description : info.description};

      this.employeeService.employeeEnter(this.selectedEmployee.employeeId,this.gateOption).subscribe(
        ID=>{
          this.snackBar.open(`ورود برای کاربر با شماره پرسنلی ${ID} در سیستم ثبت شد`, 'بستن', {
            duration: 2000,
          });
          //this.isEntered.emit(true);
          this.employeeDrawerService.changeDrawerState(new CloseDrawerEvent<EmployeeList>('enterconfirm', {
            employeeId : this.selectedEmployee.employeeId,
            fullName : this.selectedEmployee.fullName,
            date :this.selectedEmployee.date,
            description : [info.description,'',''],
            enterTime :new Date().toLocaleTimeString('en-US',this.option),//moment(new moment()).format("HH:mm:ss"),
            exitTime : this.selectedEmployee.exitTime,
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
  }

  cancel(): void {
    this.employeeDrawerService.changeDrawerState(new CloseDrawerEvent('enterconfirm'));
  }
}
