import {
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatSortModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const includeModules = [
  CommonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatSortModule
];

@NgModule({
  declarations: [],
  imports: [includeModules],
  exports: [includeModules]
})
export class MaterialEmployeeModule {}
