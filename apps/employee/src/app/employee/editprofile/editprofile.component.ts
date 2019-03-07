import {
  EmploeeProfile,
  EmployeeService
} from './../services/employee.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  EmployeeDrawerService,
  CloseDrawerEvent
} from '../services/employee-drawer.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'angular-nx-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss'],
  host: {
    class: 'angular-nx-editprofile'
  }
})
export class EditprofileComponent implements OnInit {

  @Output() cancelEdit = new EventEmitter<string>();
  @Input() public empId : number;
  @Output() editedEmployeeInfo : EmploeeProfile;


  form: FormGroup;
  employeeInfo: EmploeeProfile;


  constructor(
    formBuilder: FormBuilder,
    private employeeDrawerService: EmployeeDrawerService,
    private employeeService: EmployeeService
  ) {
    this.form = formBuilder.group({
      employeeId:[''] ,
      fullName: formBuilder.control('', [Validators.required]),
      nationalCode: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.employeeService.viewEmploee(this.empId).subscribe(
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
        ID=>alert('کاربر با شماره پرسنلی' + ' ' + ID + ' ' + 'با موفقیت ویرایش شد.'),
        err=>alert('خطا رخ داد.')
      );
    }
  }

  cancel() {
    this.cancelEdit.emit('profile');
  }
}
