import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CvService } from 'src/app/modules/cv/services/cv.service';
import { Cv } from 'src/app/core/models/cv';
import { CvCreateDialog } from './dialogs/cv-create/cv-create.dialog';
import { CvDetailDialog } from './dialogs/cv-detail/cv-detail.dialog';
import { CvEditDialog } from './dialogs/cv-edit/cv-edit.dialog';
import { ConfirmDialog } from 'src/app/shared/dialogs/confirm/confirm.dialog';
import { SpinnerDialog } from 'src/app/shared/dialogs/spinner/spinner.dialog';
import { SearchService } from 'src/app/shared/services/search.service';
import { AreaService } from 'src/app/modules/area/services/area.service';
import { CategoryService } from 'src/app/modules/category/services/category.service';
import { promise } from 'selenium-webdriver';
import { CvFilterDialog } from './dialogs/cv-filter/cv-filter.dialog';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.page.html',
  styles: [
  ]
})
export class CvPage implements OnInit {
  arrCv: Array<Cv>;
  arrCvCopy: Array<Cv>;
  cv: Cv;

  constructor(
    private cvService: CvService,
    public dialog: MatDialog,  
    private searchService: SearchService,
    private areaService: AreaService,
    private cateService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.searchService.valueSearch$.subscribe(res => {
      this.onSearch(res);
    })
  }

  onSearch(val) {
    val = val.toLowerCase();
    this.arrCv = this.arrCvCopy.filter(cv => {
      return String(cv.id).indexOf(val) > -1 || (cv.name).toLowerCase().indexOf(val) > -1 || (cv.email).toLowerCase().indexOf(val) > -1 || String(cv.phone).indexOf(val) > -1;
    })
  }

  getList() {
    this.cvService.getList().subscribe(res => {
      this.arrCv = res;
      this.arrCvCopy = this.arrCv;
    })
  }

  onCreate() {
    let dialogData = this.dialog.open(CvCreateDialog, {
      minWidth: 450
    });
    dialogData.afterClosed().subscribe(res => {
      this.getList();
    })
  }

  onDetail(cv: Cv) {
    this.dialog.open(CvDetailDialog, {
      data: cv,
      minWidth: 900
    })
  }

  onEdit(e, cv: Cv) {
    e.stopPropagation();
    let dialogData = this.dialog.open(CvEditDialog, {
      data: cv,
      minWidth: 450
    })
    dialogData.afterClosed().subscribe(res => {
      this.getList();
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
        this.cvService.delete(id).subscribe(res => {
          this.getList();
          this.dialog.closeAll();
        })
      }
    })
  }

  onAllData() {
    this.arrCv = this.arrCvCopy;
  }

  onFilter() {
    this.arrCv = this.arrCvCopy;
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
    Promise.all([promiseGetCate, promiseGetArea]).then(res => {
      let dialogData = this.dialog.open(CvFilterDialog, {
        data: res,
        minWidth: 450
      })
      dialogData.afterClosed().subscribe(res => {          
        if(res) {
          this.arrCv = this.arrCvCopy.filter(cv => {            
            return cv.name.toLowerCase().indexOf(res.name.toLowerCase()) > -1 && cv.email.indexOf(res.email.toLowerCase()) > -1 && String(cv.phone).indexOf(res.phone) > -1 && cv.address.toLowerCase().indexOf(res.address.toLowerCase()) > -1 && cv.area.id == (res.areaId || cv.area.id) && cv.category.id == (res.cateId || cv.category.id) && (cv.created_at >= (res.created_at_start || cv.created_at) && cv.created_at <= (res.created_at_end || cv.created_at)) && (cv.updated_at >= (res.updated_at_start || cv.updated_at) && cv.updated_at <= (res.updated_at_end || cv.updated_at))
          })
        }
      })
    })
  }
}
