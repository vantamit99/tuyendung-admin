import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { LoginPage } from '../../pages/login/login.page';

const routes : Routes = [
  {
    path: '', 
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage
  }
]

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
