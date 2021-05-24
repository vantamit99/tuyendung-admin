import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPage } from './pages/not-found/not-found.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import(`./layouts/auth-layout/auth-layout.module`).then(m => m.AuthLayoutModule)
  },
  {
    path: 'admin',
    loadChildren: () => import(`./layouts/admin-layout/admin-layout.module`).then(m => m.AdminLayoutModule)
  },
  {
    path: '**',
    component: NotFoundPage
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
