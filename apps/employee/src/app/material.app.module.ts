import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatListModule,
} from '@angular/material';

const includeModules = [
  CommonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatListModule
];

@NgModule({
  declarations: [],
  imports: [includeModules],
  exports: [includeModules]
})

export class   MaterialAppModule{

}
