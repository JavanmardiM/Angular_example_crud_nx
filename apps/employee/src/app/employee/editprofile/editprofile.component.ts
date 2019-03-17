import {
  EmploeeProfile,
  EmployeeService,
  AttendanceList,
  Employee
} from './../services/employee.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  EmployeeDrawerService,
  CloseDrawerEvent
} from '../services/employee-drawer.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TavsysValidators } from '../../validators';

@Component({
  selector: 'angular-nx-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss'],
  host: {
    class: 'angular-nx-editprofile'
  }
})
export class EditprofileComponent implements OnInit {


  @Input() public selectedEmployee : AttendanceList;


  form: FormGroup;
  employeeInfo: EmploeeProfile;

  public get fullName(): FormControl {
    return this.form.get('fullName') as FormControl;
  }
  public get nationalCode(): FormControl{
    return this.form.get('nationalCode') as FormControl;
  }
  public get mobileNumber() : FormControl{
    return this.form.get('mobileNumber') as FormControl;
  }

  constructor(
    formBuilder: FormBuilder,
    private employeeDrawerService: EmployeeDrawerService,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {
    this.form = formBuilder.group({
      employeeId:[''] ,
      fullName: formBuilder.control('', [Validators.required]),
      nationalCode: ['', [Validators.required,TavsysValidators.nationalcode]],
      mobileNumber: ['', [Validators.required , TavsysValidators.mobile]],
      address: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.employeeService.viewEmploee(this.selectedEmployee.employeeId).subscribe(
      employeeInfo => {
        this.employeeInfo = employeeInfo;
        if(!!this.form){
          this.form.patchValue(this.employeeInfo);
        }
      },
      err => console.log("error occured"+ err)
    );
  }

  edit(){
    if (this.form.valid) {
      const employeeInfo: EmploeeProfile = this.form.value;
      this.employeeService.editEmployeeInfo(employeeInfo,this.employeeInfo.employeeId).subscribe(
        ID=>{
        this.snackBar.open(`  کاربر با شماره پرسنلی ${ID} با موفقیت ویرایش شد`, 'بستن', {
          duration: 2000,
        });
        this.employeeDrawerService.changeDrawerState(new CloseDrawerEvent<EmploeeProfile>('editprofile',employeeInfo
        // {
        //     date:this.selectedEmployee.date ,
        //     employeeId: this.selectedEmployee.employeeId,
        //     description:this.selectedEmployee.description,
        //     enterTime: this.selectedEmployee.enterTime,
        //     exitTime: this.selectedEmployee.exitTime,
        //     fullName:employeeInfo.fullName,
        //     isAbsence: this.selectedEmployee.isAbsence
        // }
        ));
      },
      err => {
        this.snackBar.open('با عرض پوزش در سیستم خطا رخ داد', 'بستن', {
          duration: 2000,
        });
      }
      );
    }
  }

  cancel() {
    this.employeeDrawerService.changeDrawerState(new CloseDrawerEvent<any>('', null));
  }
}
