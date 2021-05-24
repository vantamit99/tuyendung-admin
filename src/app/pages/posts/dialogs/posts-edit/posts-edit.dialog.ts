import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from 'src/app/modules/posts/services/posts.service';
import { SpinnerDialog } from 'src/app/shared/dialogs/spinner/spinner.dialog';
import { Posts } from 'src/app/core/models/posts';
import { ChangeImage } from 'src/app/shared/functions/change-image';

@Component({
  selector: 'app-posts-edit',
  templateUrl: './posts-edit.dialog.html',
  styles: [
  ]
})
export class PostsEditDialog implements OnInit {
  formUpdate: FormGroup;
  selectedFile: File;
  arrStatus: Array<number> = [0, 1];
  arrCateId: Array<number> = [];
  arrAreaId: Array<number> = [];
  postsData: Posts;
  isChangeImage: boolean = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.data.map(res => {
      if(res.cateId) {
        this.arrCateId = res.cateId;
      } 
      if(res.areaId) {
        this.arrAreaId = res.areaId;
      }
      if(res.postsData) {
        this.postsData = res.postsData;
      }
    })
   
    this.formUpdate = this.fb.group({
      title: [this.postsData.title, Validators.required],
      content: [this.postsData.content, Validators.required],
      status: [this.postsData.status, Validators.required],
      cate_id: [this.postsData.category.id, Validators.required],
      area_id: [this.postsData.area.id, Validators.required],
      image: [this.postsData.image, Validators.required]
    })
  }

  onChangeImage(e) {
    this.selectedFile = e.target.files[0] as File;    
    ChangeImage('upload__img', this.selectedFile);
    this.isChangeImage = true;
  }

  onUpdate() {     
    let id = this.postsData.id;
    let formData = new FormData();
    formData.append('title', this.formUpdate.value.title);
    formData.append('content', this.formUpdate.value.content);
    formData.append('status', this.formUpdate.value.status);
    formData.append('cate_id', this.formUpdate.value.cate_id);
    formData.append('area_id', this.formUpdate.value.area_id);    
    if(this.isChangeImage) {
      this.formUpdate.controls.image.setValue(this.selectedFile);
      formData.append('image', this.formUpdate.value.image, this.formUpdate.value.image.name)
    } else {
      formData.append('image', this.formUpdate.value.image)
    }
    this.dialog.open(SpinnerDialog);
    this.postsService.updateAll(id, formData).subscribe(res => {
      console.log(res);
      this.dialog.closeAll();
    })
  }
}
