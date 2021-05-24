import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cv-detail',
  templateUrl: './cv-detail.dialog.html',
  styles: [
  ]
})
export class CvDetailDialog implements OnInit {
  arrCv: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.arrCv.push(this.data); 
  }

  exportFile() {
    var link = document.createElement('a');
    link.href = this.data.cv;
    link.download = this.data.cv.slice(this.data.cv.lastIndexOf('/')+1, this.data.cv.length);
    document.body.appendChild(link);    
    link.click();  
    document.body.removeChild(link);    
  }
}
