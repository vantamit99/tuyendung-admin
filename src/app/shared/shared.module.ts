import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { ConfirmDialog } from './dialogs/confirm/confirm.dialog';
import { SpinnerDialog } from './dialogs/spinner/spinner.dialog';


@NgModule({
  declarations: [
    ConfirmDialog,
    SpinnerDialog
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ConfirmDialog,
    SpinnerDialog
  ]
})
export class SharedModule { }
