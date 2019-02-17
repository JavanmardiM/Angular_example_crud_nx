import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { EmployeeService, Employee } from '../services/employee.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('employeeRegisterForm') formElm: ElementRef;

  form: FormGroup;
  isRegistered?: boolean;

  public get username() : FormControl {
    return this.form.get('username') as FormControl;
  }
  
  constructor(
    formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.form = formBuilder.group({
      username: formBuilder.control('', [Validators.required]),
      fullname: ['', Validators.required],
      nationalCode: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      address: [''],
      
    });
  }

  ngOnInit(): void {
    this.employeeService.getUsers().subscribe(
      users => console.log(users),
      err => console.log(err)
    );
  }

  save(): void {
    // this.employeeService.createUser().subscribe(
    //   _ => console.log('user was created.'),
    //   err => console.log('An error occurred when creating user.', err)
    // );

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
}
