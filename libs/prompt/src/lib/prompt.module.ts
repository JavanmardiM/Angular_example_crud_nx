import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromptComponent } from './prompt/prompt.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  exports: [PromptComponent],
  declarations: [PromptComponent],
  entryComponents: [PromptComponent]
})
export class PromptModule {}
