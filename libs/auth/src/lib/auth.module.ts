import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [LoginComponent],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class AuthModule {}
