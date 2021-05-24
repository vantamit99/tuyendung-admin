import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { AreaPage } from 'src/app/pages/area/area.page';
import { AreaService } from './services/area.service';
import { AreaDetailDialog } from 'src/app/pages/area/dialogs/area-detail/area-detail.dialog';
import { AreaCreateDialog } from 'src/app/pages/area/dialogs/area-create/area-create.dialog';
import { AreaEditDialog } from 'src/app/pages/area/dialogs/area-edit/area-edit.dialog';
import { AreaFilterDialog } from '../../pages/area/dialogs/area-filter/area-filter.dialog';

const routes : Routes = [
  {
    path: '',
    component: AreaPage
  }
]

@NgModule({
  declarations: [
    AreaPage,
    AreaDetailDialog,
    AreaCreateDialog,
    AreaEditDialog,
    AreaFilterDialog
  ],
  imports: [
    CommonModule,
    SharedModule,    
    RouterModule.forChild(routes)
  ],
  providers: [AreaService]
})
export class AreaModule { }
