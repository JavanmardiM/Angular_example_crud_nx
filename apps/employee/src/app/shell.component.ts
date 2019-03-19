import { Component, ViewChild, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { PromptService } from '@angular-nx/prompt';
import { MatDialog, MatSidenav } from '@angular/material';
import { AuthService } from '@angular-nx/auth';


@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  title = 'employee';
  @ViewChild('sidenav') sidenav : MatSidenav;
  employeesDatasource: any;
  employeeService: any;

  constructor(
    private router : Router,
    private authService: AuthService,
    public dialog : MatDialog,
    private promptService: PromptService,
    ){}

    ngOnInit(): void {

      this.router.events.pipe(
        filter(e=> e instanceof NavigationEnd) ).subscribe(
          _=>{
            this.sidenav.close();
          }
        )
    }


  // exit(){
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  // }

  openDialog(): void {

  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     width: '350px',
  //     height : '250px',
  //     data: {dialogTitle:'تایید خروج از سیستم ', confirmButton:'خروج',contentMsg:'' },
  //     direction:'rtl'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //    if(result){
  //       this.exit();
  //    }
  //   });
  // }

  this.promptService.open('', 'خروج از برنامه', 'خروج', 'لغو')
  .subscribe(result => {
    if (result) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }, console.log.bind(console));

}
}
