import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import(`../../modules/dashboard/dashboard.module`).then(m => m.DashboardModule)
      },
      {
        path: 'area',
        loadChildren: () => import(`../../modules/area/area.module`).then(m => m.AreaModule)
      },
      {
        path: 'category',
        loadChildren: () => import(`../../modules/category/category.module`).then(m => m.CategoryModule)
      },
      {
        path: 'cv',
        loadChildren: () => import(`../../modules/cv/cv.module`).then(m => m.CvModule)
      },
      {
        path: 'posts',
        loadChildren: () => import(`../../modules/posts/posts.module`).then(m => m.PostsModule)
      },
      {
        path: 'profile',
        loadChildren: () => import(`../../modules/profile/profile.module`).then(m => m.ProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
