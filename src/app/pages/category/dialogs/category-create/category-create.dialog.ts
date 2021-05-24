import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/modules/category/services/category.service';
import { SpinnerDialog } from 'src/app/shared/dialogs/spinner/spinner.dialog';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.dialog.html',
  styles: [
  ]
})
export class CategoryCreateDialog implements OnInit {
  formCreate: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private cateService: CategoryService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      name: ['', Validators.required]
    })
  }

  onCreate() {
    let data = this.formCreate.value;
    this.dialog.open(SpinnerDialog);
    this.cateService.create(data).subscribe(res => {     
      this.dialog.closeAll()
    })
  }
}
