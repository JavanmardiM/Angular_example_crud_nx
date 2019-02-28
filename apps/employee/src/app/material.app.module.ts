import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
} from '@angular/material';

const includeModules = [
  CommonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
];

@NgModule({
  declarations: [],
  imports: [includeModules],
  exports: [includeModules]
})

export class   MaterialAppModule{

}
