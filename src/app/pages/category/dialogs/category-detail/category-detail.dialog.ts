import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.dialog.html',
  styles: [
  ]
})
export class CategoryDetailDialog implements OnInit {
  arrCate: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.arrCate.push(this.data);
  }

}
