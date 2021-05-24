import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Area } from 'src/app/core/models/area';
import { Category} from 'src/app/core/models/category';

@Component({
  selector: 'app-cv-filter',
  templateUrl: './cv-filter.dialog.html',
  styles: [
  ]
})
export class CvFilterDialog implements OnInit {
  formFilter: FormGroup;
  arrArea: Array<Area>;
  arrCate: Array<Category>;
  arrGender: Array<any> = [
    { value: 0, view: 'Female' },
    { value: 1, view: 'Male' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CvFilterDialog>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.data.map(item => {
      if(item.cateId) {
        this.arrCate = item.cateId;
      }
      if(item.areaId) {
        this.arrArea = item.areaId;
      }
      return item;
    })
    this.formFilter = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      gender: [null],
      address: [''],
      cateId: [null],
      areaId: [null],
      created_at_start: [null],
      created_at_end: [null],
      updated_at_start: [null],
      updated_at_end: [null]
    })
  }

  onFilter() {
    this.dialogRef.close(this.formFilter.value);
  }
}
