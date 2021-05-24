import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Area } from 'src/app/core/models/area';

@Component({
  selector: 'app-posts-filter',
  templateUrl: './posts-filter.dialog.html',
  styles: [
  ]
})
export class PostsFilterDialog implements OnInit {
  formFilter: FormGroup;
  arrArea: Array<Area> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<PostsFilterDialog>
  ) { }

  ngOnInit(): void {    
    this.arrArea = this.data.areaId;
    this.formFilter = this.fb.group({
      title: [''],
      areaId: [null],
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
