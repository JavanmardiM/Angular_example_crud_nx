import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatListModule,
  MatMenuModule,} from '@angular/material';

const includeModules = [
  CommonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatListModule,
  MatMenuModule
];

@NgModule({
  declarations: [],
  imports: [includeModules],
  exports: [includeModules]
})

export class   MaterialAppModule{

}
