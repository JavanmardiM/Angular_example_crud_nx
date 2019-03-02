import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { EmployeeService, Employee } from '../services/employee.service';
import { EmployeeDrawerService, CloseDrawerEvent } from '../services/employee-drawer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('employeeRegisterForm') formElm: ElementRef;

  form: FormGroup;
  isRegistered?: boolean;

  public get fullname() : FormControl {
    return this.form.get('fullname') as FormControl;
  }
  public get nationalCode() : FormControl {
    return this.form.get('nationalCode') as FormControl;
  }
  public get mobileNumber() : FormControl {
    return this.form.get('mobileNumber') as FormControl;
  }
  public get address() : FormControl {
    return this.form.get('address') as FormControl;
  }


  constructor(
    formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private employeeDrawerService: EmployeeDrawerService
  ) {
    this.form = formBuilder.group({
      fullname: formBuilder.control('', [Validators.required]),
      nationalCode: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      address: ['',[Validators.required]],

    });
  }

  ngOnInit(): void {

  }

  save(): void {
    if(this.form.valid) {
      const employee: Employee = this.form.value;
      this.employeeService.registerEmployee(employee)
        .subscribe(
          _ => {
            console.log('employee registered.')
          },
          (err) => {
            console.log('An error occurred when registring an employee.', err);
          }
        );
    }
  }
  cancel(): void {
    this.employeeDrawerService.changeDrawerState(
      new CloseDrawerEvent()
    );
  }
}
