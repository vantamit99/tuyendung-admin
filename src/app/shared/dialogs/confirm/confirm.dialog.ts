import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.dialog.html',
  styles: [
  ]
})
export class ConfirmDialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialog | any) { }

  ngOnInit(): void {
  }

}
