import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'angular-nx-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }


  // constructor(
  //   public dialogRef: MatDialogRef<PromptComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data

  //   ) {}

  // cancel(): void {
  //   this.dialogRef.close();
  // }
  // confirm(){
  //   this.dialogRef.close({ result : true});
  // }

  // ngOnInit() {
  // }
}
