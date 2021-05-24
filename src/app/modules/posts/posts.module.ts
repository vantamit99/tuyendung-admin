import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CKEditorModule } from 'ngx-ckeditor';

import { SharedModule } from 'src/app/shared/shared.module';
import { PostsPage } from 'src/app/pages/posts/posts.page';
import { PostsDetailDialog } from 'src/app/pages/posts/dialogs/posts-detail/posts-detail.dialog';
import { PostsCreateDialog } from 'src/app/pages/posts/dialogs/posts-create/posts-create.dialog';
import { PostsEditDialog } from 'src/app/pages/posts/dialogs/posts-edit/posts-edit.dialog';
import { PostsFilterDialog } from '../../pages/posts/dialogs/posts-filter/posts-filter.dialog';

const routes : Routes = [
  {
    path: '',
    component: PostsPage
  }
]

@NgModule({
  declarations: [
    PostsPage,
    PostsDetailDialog,
    PostsCreateDialog,
    PostsEditDialog,
    PostsFilterDialog,
  ],
  imports: [
    CommonModule,
    CKEditorModule,    
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PostsModule { }
