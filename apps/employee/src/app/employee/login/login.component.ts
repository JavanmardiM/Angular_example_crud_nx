import { AuthService } from './../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'angular-nx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;
  constructor(
    private router : Router,
    formBuilder:FormBuilder,
    private authService: AuthService
  ) {
    this.form=formBuilder.group({
      username :['',[Validators.required]],
      password : ['',[Validators.required]]
    });
   };

  ngOnInit() {
  }

  submit(){
    const info : Info = this.form.value;
    this.authService.login(info.username,info.password);
    this.router.navigate(['/attendance']);
  }
}

interface Info{
  username : string;
  password : string;
}
