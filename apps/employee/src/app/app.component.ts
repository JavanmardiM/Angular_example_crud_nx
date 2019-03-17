import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './employee/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'angular-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'employee';
  @ViewChild('sidenav') sidenav : MatSidenav;

  constructor(
    private router : Router,
    private authService: AuthService
    ){}

    ngOnInit(): void {

      this.router.events.pipe(
        filter(e=> e instanceof NavigationEnd) ).subscribe(
          _=>{
            this.sidenav.close();
          }
        )

    }


  exit(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
