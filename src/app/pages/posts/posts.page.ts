import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostsService } from 'src/app/modules/posts/services/posts.service';
import { Posts } from 'src/app/core/models/posts';
import { PostsDetailDialog } from 'src/app/pages/posts/dialogs/posts-detail/posts-detail.dialog';
import { PostsCreateDialog } from 'src/app/pages/posts/dialogs/posts-create/posts-create.dialog';
import { AreaService } from 'src/app/modules/area/services/area.service';
import { CategoryService } from 'src/app/modules/category/services/category.service';
import { ConfirmDialog } from 'src/app/shared/dialogs/confirm/confirm.dialog';
import { PostsEditDialog } from './dialogs/posts-edit/posts-edit.dialog';
import { SpinnerDialog } from 'src/app/shared/dialogs/spinner/spinner.dialog';
import { SearchService } from 'src/app/shared/services/search.service';
import { PostsFilterDialog } from './dialogs/posts-filter/posts-filter.dialog';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styles: [
  ]
})
export class PostsPage implements OnInit {
  arrPosts: Array<Posts>;
  arrPostsCopy: Array<Posts>;
  posts: Posts;
  
  constructor(
    private postsService: PostsService, 
    public dialog: MatDialog,
    private areaService: AreaService,
    private cateService: CategoryService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {    
    this.getList();
    this.searchService.valueSearch$.subscribe(res => {
      this.onSearch(res);
    })
  }
  
  getList() {
    this.postsService.getList().subscribe(res => {
        this.arrPosts = res; 
        this.arrPostsCopy = this.arrPosts;        
      } 
    )
  }

  onCreate() {    
    let promiseGetCate = new Promise((resolve, reject) => {
      this.cateService.getList().subscribe(res => { 
        let data: any = {};
        let arrId = res.map(cate => cate);        
        data.cateId = arrId;
        resolve(data);
      })      
    })
    let promiseGetArea = new Promise((resolve, reject) => {
      this.areaService.getList().subscribe(res => {
        let data: any = {};
        let arrId = res.map(area => area);
        data.areaId = arrId;
        resolve(data);
      }) 
    })
    Promise.all([promiseGetArea, promiseGetCate]).then(res => {      
      let dialogData = this.dialog.open(PostsCreateDialog, {
        data: res,
      });
      dialogData.afterClosed().subscribe(res => {
        this.getList();
      })
    })     
  }

  onDetail(posts: Posts) {
    this.dialog.open(PostsDetailDialog, {
      data: posts,
      minWidth: 1100
    })
  }

  onEdit(e, posts: Posts) {
    e.stopPropagation();
    let promiseGetCate = new Promise((resolve, reject) => {
      this.cateService.getList().subscribe(res => {
        let data: any = {};
        let arrId = res.map(cate => cate);
        data.cateId = arrId;
        resolve(data);
      })      
    })
    let promiseGetArea = new Promise((resolve, reject) => {
      this.areaService.getList().subscribe(res => {
        let data: any = {};
        let arrId = res.map(area => area);
        data.areaId = arrId;
        resolve(data);
      }) 
    })
    Promise.all([promiseGetArea, promiseGetCate]).then(res => {      
      res.push({postsData: posts})
      let dialogData = this.dialog.open(PostsEditDialog, {
        data: res,        
      });
      dialogData.afterClosed().subscribe(res => {
        this.getList();
      })
    })     
  }

  onDelete(e, id) {   
    e.stopPropagation();
    let dialogData = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Delete',
        content: 'Do you want delete it?'
      },
      minWidth: 450
    });
    dialogData.afterClosed().subscribe(res => {
      if(res) {
        this.dialog.open(SpinnerDialog);
        this.postsService.delete(id).subscribe(res => {
          this.getList();
          this.dialog.closeAll();
        })
      }
    })
  }

  onSearch(val) {
    val = val.toLowerCase();
    this.arrPosts = this.arrPostsCopy.filter(posts => {
      return String(posts.id).indexOf(val) > -1 || (posts.title).toLowerCase().indexOf(val) > -1;
    })
  }

  onAllData() {
    this.arrPosts = this.arrPostsCopy;
  }

  onFilter() {
    this.arrPosts = this.arrPostsCopy;
    let promiseGetArea = new Promise((resolve, reject) => {
      this.areaService.getList().subscribe(res => {
        let data: any = {};
        let arrId = res.map(area => area);
        data.areaId = arrId;
        resolve(data);
      }) 
    })
    promiseGetArea.then(res => {
      let dialogData = this.dialog.open(PostsFilterDialog, { 
        data: res,
        minWidth: 300
      });

      dialogData.afterClosed().subscribe(res => {              
        if(res) {        
          this.arrPosts = this.arrPostsCopy.filter(posts => {           
            return posts.title.toLowerCase().indexOf(res.title.toLowerCase()) > -1 && posts.area.id == (res.areaId || posts.area.id) && posts.status == res.status && (posts.created_at >= (res.created_at_start || posts.created_at) && posts.created_at <= (res.created_at_end || posts.created_at)) && (posts.updated_at >= (res.updated_at_start || posts.updated_at) && posts.updated_at <= (res.updated_at_end || posts.updated_at));
          })  
        }
      })
    })        
  }
}
