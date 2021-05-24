import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/category/services/category.service';
import { Category } from 'src/app/core/models/category';
import { CategoryCreateDialog } from './dialogs/category-create/category-create.dialog';
import { CategoryDetailDialog } from './dialogs/category-detail/category-detail.dialog';
import { CategoryEditDialog } from './dialogs/category-edit/category-edit.dialog';
import { ConfirmDialog } from 'src/app/shared/dialogs/confirm/confirm.dialog';
import { SpinnerDialog } from 'src/app/shared/dialogs/spinner/spinner.dialog';
import { SearchService } from 'src/app/shared/services/search.service';
import { CategoryFilterDialog } from './dialogs/category-filter/category-filter.dialog';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styles: [
  ]
})
export class CategoryPage implements OnInit {
  arrCate: Array<Category>;
  arrCateCopy: Array<Category>;
  cate: Category;

  constructor(
    private cateService: CategoryService, 
    public dialog: MatDialog,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.searchService.valueSearch$.subscribe(res => {
      this.onSearch(res);
    })
  }

  onSearch(val) {
    val = val.toLowerCase();
    this.arrCate = this.arrCateCopy.filter(cate => {
      return String(cate.id).indexOf(val) > -1 || (cate.name).toLowerCase().indexOf(val) > -1;
    })
  }

  getList() {
    this.cateService.getList().subscribe(res => {
      this.arrCate = res;  
      this.arrCateCopy = this.arrCate;       
    })
  }

  onCreate() {
    let dialogData = this.dialog.open(CategoryCreateDialog, {
      minWidth: 450
    });
    dialogData.afterClosed().subscribe(res => {
      this.getList();
    })
  }

  onDetail(cate: Category) {
    this.dialog.open(CategoryDetailDialog, {
      data: cate,
      minWidth: 900
    })
  }

  onEdit(e, cate: Category) {
    e.stopPropagation();
    let dialogData = this.dialog.open(CategoryEditDialog, {
      data: cate,
      minWidth: 450
    })
    dialogData.afterClosed().subscribe(res => {
      this.getList();
    })
  }

  onDelete(e, id) {
    e.stopPropagation();
    let dialogData = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Delete',
        content: 'Do you want delete it?'
      },
      minWidth: 450
    });
    dialogData.afterClosed().subscribe(res => {
      if(res) {
        this.dialog.open(SpinnerDialog);
        this.cateService.delete(id).subscribe(res => {
          this.getList();
          this.dialog.closeAll();
        })
      }
    })
  }

  onAllData() {
    this.arrCate = this.arrCateCopy;
  }

  onFilter() {
    this.arrCate = this.arrCateCopy;
    let dialogData = this.dialog.open(CategoryFilterDialog, {
      data: this.arrCate,
      minWidth: 450
    })
    dialogData.afterClosed().subscribe(res => {
      if(res) {
        this.arrCate = this.arrCateCopy.filter(cate => {       
          return cate.name.indexOf(res.name) > -1 && cate.status == res.status && (cate.created_at >= (res.created_at_start || cate.created_at) && cate.created_at <= (res.created_at_end || cate.created_at)) && (cate.updated_at >= (res.updated_at_start || cate.updated_at) && cate.updated_at <= (res.updated_at_end || cate.updated_at));
        })
      }
    })
  }
}
