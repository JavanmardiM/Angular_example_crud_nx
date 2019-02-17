import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { EmployeeModule } from './employee/employee.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, EmployeeModule, NxModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
