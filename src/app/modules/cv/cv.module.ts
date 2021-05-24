import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SharedModule } from 'src/app/shared/shared.module';
import { CvPage } from 'src/app/pages/cv/cv.page';
import { CvDetailDialog } from 'src/app/pages/cv/dialogs/cv-detail/cv-detail.dialog';
import { CvEditDialog } from 'src/app/pages/cv/dialogs/cv-edit/cv-edit.dialog';
import { CvCreateDialog } from 'src/app/pages/cv/dialogs/cv-create/cv-create.dialog';
import { CvFilterDialog } from '../../pages/cv/dialogs/cv-filter/cv-filter.dialog';

const routes : Routes = [
  {
    path: '',
    component: CvPage
  }
]

@NgModule({
  declarations: [
    CvPage,
    CvDetailDialog,
    CvEditDialog,
    CvCreateDialog,
    CvFilterDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes)
  ]
})
export class CvModule { }
