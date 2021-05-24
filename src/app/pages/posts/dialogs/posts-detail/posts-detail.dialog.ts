import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.dialog.html',
  styles: [
  ]
})
export class PostsDetailDialog implements OnInit {
  arrPosts: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.arrPosts.push(this.data);
  }

}
