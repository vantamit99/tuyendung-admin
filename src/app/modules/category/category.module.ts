import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryPage } from 'src/app/pages/category/category.page';
import { CategoryEditDialog } from 'src/app/pages/category/dialogs/category-edit/category-edit.dialog';
import { CategoryCreateDialog } from 'src/app/pages/category/dialogs/category-create/category-create.dialog';
import { CategoryDetailDialog } from 'src/app/pages/category/dialogs/category-detail/category-detail.dialog';
import { CategoryFilterDialog } from '../../pages/category/dialogs/category-filter/category-filter.dialog';

const routes : Routes = [
  {
    path: '',
    component: CategoryPage
  }
]

@NgModule({
  declarations: [CategoryPage, CategoryEditDialog, CategoryCreateDialog, CategoryDetailDialog, CategoryFilterDialog],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoryModule { }
