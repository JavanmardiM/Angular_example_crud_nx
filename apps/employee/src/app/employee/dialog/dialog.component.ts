import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'angular-nx-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data

    ) {}

  cancel(): void {
    this.dialogRef.close();
  }
  confirm(){
    this.dialogRef.close({ result : true});
  }

  ngOnInit() {
  }


}
