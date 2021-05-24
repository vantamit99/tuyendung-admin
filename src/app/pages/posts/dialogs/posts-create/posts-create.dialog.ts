import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostsService } from 'src/app/modules/posts/services/posts.service';
import { SpinnerDialog } from 'src/app/shared/dialogs/spinner/spinner.dialog';
import { ChangeImage } from 'src/app/shared/functions/change-image';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.dialog.html',
  styles: [
  ]
})
export class PostsCreateDialog implements OnInit {
  formCreate: FormGroup;  
  arrData: any = [];
  arrCateId: Array<number> = [];
  arrAreaId: Array<number> = [];
  arrStatus: Array<number> = [0, 1];
  selectedFile: File;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any, 
    public dialog: MatDialog,
    private fb: FormBuilder,
    private postsService: PostsService  
  ) { }

  ngOnInit(): void {
    this.arrData = this.data;  
    this.arrData.map(data => {
      if(data.areaId) {      
        this.arrAreaId = data.areaId;        
      }
      if(data.cateId) {
        this.arrCateId = data.cateId;
      }
      return data;
    });   

    this.formCreate = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      status: [null, Validators.required],
      cate_id: [null, Validators.required],
      area_id: [null, Validators.required],
      expired: [null],
      image: [null]
    })
  }

  onCreate() { 
    let date = this.formCreate.value.expired.getDate();
    let month = this.formCreate.value.expired.getMonth() + 1;
    let year = this.formCreate.value.expired.getFullYear();
    let setTime = '';
    if(date < 10 && month > 10) {
    setTime = `0${date}-${month}-${year}`;
    }
    if(date > 10 && month < 10) {
      setTime = `${date}-0${month}-${year}`;
    }
    if(date < 10 && month < 10) {
      setTime = `0${date}-0${month}-${year}`;
    }
    // setvalue
    this.formCreate.controls.image.setValue(this.selectedFile);
    this.formCreate.controls.expired.setValue(setTime);    
    let form = this.formCreate.value;
    let formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    formData.append('status', form.status);
    formData.append('expired', form.expired);
    formData.append('cate_id', form.cate_id);
    formData.append('area_id', form.area_id);
    formData.append('image', form.image, form.image.name);
    this.dialog.open(SpinnerDialog);
    this.postsService.create(formData).subscribe(res => {     
      this.dialog.closeAll();
    });    
  }

  onChangeImage(e) {
    this.selectedFile = e.target.files[0] as File;    
    ChangeImage('upload__img', this.selectedFile);
  }
}
