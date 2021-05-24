import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/modules/category/services/category.service';
import { SpinnerDialog } from 'src/app/shared/dialogs/spinner/spinner.dialog';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.dialog.html',
  styles: [
  ]
})
export class CategoryEditDialog implements OnInit {
  formUpdate: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private cateService: CategoryService
  ) { }

  ngOnInit(): void {
    this.formUpdate = this.fb.group({
      name: [this.data.name, Validators.required]
    })
  }

  onUpdate() {
    let id = this.data.id;
    let data = this.formUpdate.value;
    this.dialog.open(SpinnerDialog);
    this.cateService.updateAll(id, data).subscribe(res => {
      this.dialog.closeAll();
    })
  }
}
