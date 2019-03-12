import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {  FormGroup,  FormBuilder,  Validators,  FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

import {TavsysValidators} from '../../validators'
import { EmployeeService, Employee } from '../services/employee.service';
import {  EmployeeDrawerService,  CloseDrawerEvent} from '../services/employee-drawer.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('employeeRegisterForm') formElm: ElementRef;

  form: FormGroup;
  isRegistered?: boolean;

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
    private employeeService: EmployeeService,
    private employeeDrawerService: EmployeeDrawerService,
    private snackBar: MatSnackBar
  ) {
    this.form = formBuilder.group({
      fullName: formBuilder.control('', [Validators.required]),
      nationalCode: ['', [Validators.required , TavsysValidators.nationalcode]],
      mobileNumber: ['', [Validators.required , TavsysValidators.mobile]],
      address: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  save(): void {
    if (this.form.valid) {
      const employee: Employee = this.form.value;
      this.employeeService.registerEmployee(employee).subscribe(
        employeeId => {
          employee.employeeId = employeeId;
          this.employeeDrawerService.changeDrawerState(new CloseDrawerEvent<Employee>('register', employee));

          this.snackBar.open(`کاربر با شماره پرسنلی ${employeeId} در سیستم ثبت شد`, 'بستن', {
            duration: 2000,
          });

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
    this.employeeDrawerService.changeDrawerState(new CloseDrawerEvent<Employee>('register', null));
  }

  openSnackBar(message: string, action: string) {

  }

}
