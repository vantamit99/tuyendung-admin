import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from 'src/app/pages/dashboard/dashboard.page';

const routes : Routes = [
  {
    path: '',
    component: DashboardPage
  }
]

@NgModule({
  declarations: [
    DashboardPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
