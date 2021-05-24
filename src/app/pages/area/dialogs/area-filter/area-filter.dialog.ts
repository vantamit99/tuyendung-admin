import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-area-filter',
  templateUrl: './area-filter.dialog.html',
  styles: [
  ]
})
export class AreaFilterDialog implements OnInit {
  formFilter: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<AreaFilterDialog>
  ) { }

  ngOnInit(): void {
    this.formFilter = this.fb.group({
      name: [''],
      created_at_start: [null],
      created_at_end: [null],
      updated_at_start: [null],
      updated_at_end: [null],
      status: [false]
    })
  }

  onFilter() {
    this.dialogRef.close(this.formFilter.value);
  }
}
