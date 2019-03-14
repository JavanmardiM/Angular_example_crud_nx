import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'angular-nx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;
  constructor(
    formBuilder:FormBuilder
  ) {
    this.form=formBuilder.group({
      username :['',[Validators.required]],
      password : ['',[Validators.required]]
    });
   }

  ngOnInit() {
  }

}
