import {
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatIconRegistry,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatDialogModule
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
  MatSortModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatDialogModule
];

@NgModule({
  declarations: [],
  imports: [includeModules],
  exports: [includeModules],
  providers: [MatIconRegistry]
})
export class MaterialEmployeeModule {}
