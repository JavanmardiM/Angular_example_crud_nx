import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'angular-nx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
      username :['admin',[Validators.required]],
      password : ['123456',[Validators.required]]
    });
   };

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(
      authenticated => {
        this.router.navigate(['/employee'])
      },
      err => {
        console.log(err)
      }
    );
  }

  submit(){
    if (this.form.valid) {
      const { value: {username, password} } = this.form;
      this.authService.login(username, password);
    }
  }
}
