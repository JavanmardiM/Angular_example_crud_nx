import { Component, OnInit, Input } from '@angular/core';
import { EmployeeDrawerService, CloseDrawerEvent } from '../services/employee-drawer.service';
import { EmployeeList, GateOption, EmployeeService } from '../services/employee.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'angular-nx-absenceconfirm',
  templateUrl: './absenceconfirm.component.html',
  styleUrls: ['./absenceconfirm.component.css'],
  host:{
    'class':'angular-nx-absenceconfirm'
  }
})
export class AbsenceconfirmComponent {

  @Input() selectedEmployee : EmployeeList;
  form : FormGroup;
  gateOption : GateOption = {
    employeeId : 0,
  };


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

      this.employeeService.employeeAbsence(this.selectedEmployee.employeeId,this.gateOption).subscribe(
        ID=>{
          this.snackBar.open(`غیبت برای کاربر با شماره پرسنلی ${ID} در سیستم ثبت شد`, 'بستن', {
            duration: 2000,
          });
          this.employeeDrawerService.changeDrawerState(new CloseDrawerEvent<EmployeeList>('absenceconfirm', {
            employeeId : this.selectedEmployee.employeeId,
            fullName : this.selectedEmployee.fullName,
            date :this.selectedEmployee.date,
            description : [this.selectedEmployee.description[0],this.selectedEmployee.description[1],info.description],
            enterTime :this.selectedEmployee.enterTime,
            exitTime : this.selectedEmployee.exitTime,
            isAbsence : true
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
    this.employeeDrawerService.changeDrawerState(new CloseDrawerEvent('absenceconfirm'));
  }

}
