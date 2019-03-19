import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PromptComponent } from './prompt/prompt.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

  constructor(
    private dialog: MatDialog
  ) { }

  open(message: string, title: string, btnPositiveLabel?: string, btnNegativeLabel?: string): Observable<boolean> {
    return this.dialog.open(PromptComponent, {
      direction: 'rtl',
      autoFocus: true,
      disableClose: false,
      width: '350px',
      height : '250px',
      data: {message, title, btnPositiveLabel, btnNegativeLabel}
    }).afterClosed();
  }
}
