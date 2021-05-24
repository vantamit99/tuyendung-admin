import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-area-detail',
  templateUrl: './area-detail.dialog.html',
  styles: [
  ]
})
export class AreaDetailDialog implements OnInit {  
  arrArea: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.arrArea.push(this.data);
  }

}