import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AreaService } from 'src/app/modules/area/services/area.service';
import { Area } from 'src/app/core/models/area';
import { AreaDetailDialog } from './dialogs/area-detail/area-detail.dialog';
import { AreaCreateDialog } from './dialogs/area-create/area-create.dialog';
import { ConfirmDialog } from 'src/app/shared/dialogs/confirm/confirm.dialog';
import { AreaEditDialog } from './dialogs/area-edit/area-edit.dialog';
import { SpinnerDialog } from 'src/app/shared/dialogs/spinner/spinner.dialog';
import { SearchService } from 'src/app/shared/services/search.service';
import { AreaFilterDialog } from './dialogs/area-filter/area-filter.dialog';

@Component({
  selector: 'app-area',
  templateUrl: './area.page.html',
  styles: [
  ]
})
export class AreaPage implements OnInit {
  arrArea: Array<Area>;
  arrAreaCopy: Array<Area>;
  
  constructor(
    private areaService: AreaService, 
    public dialog: MatDialog,
    private searchService: SearchService  
  ) { }

  ngOnInit(): void {
    this.getList();
    this.searchService.valueSearch$.subscribe(res => {
      this.onSearch(res);
    })
  }   

  onSearch(val) {
    val = val.toLowerCase();
    this.arrArea = this.arrAreaCopy.filter(area => {
      return String(area.id).indexOf(val) > -1 || (area.name).toLowerCase().indexOf(val) > -1 || (area.slug).toLowerCase().indexOf(val) > -1;
    })
  }

  getList() {
    this.areaService.getList().subscribe(res => {
      this.arrArea = res;  
      this.arrAreaCopy = this.arrArea;        
    })
  }

  onCreate() {
    let dialogData = this.dialog.open(AreaCreateDialog, {
      minWidth: 450
    });
    dialogData.afterClosed().subscribe(res => {
      this.getList();
    })
  }

  onDetail(area: Area) {
    this.dialog.open(AreaDetailDialog, {
      data: area,
      minWidth: 900
    })
  }

  onEdit(e, area: Area) {
    e.stopPropagation();
    let dialogData = this.dialog.open(AreaEditDialog, {
      data: area,
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
        this.areaService.delete(id).subscribe(res => {
          this.getList();
          this.dialog.closeAll();
        })
      }
    })
  }

  onAllData() {
    this.arrArea = this.arrAreaCopy;    
  }

  onFilter() {
    this.arrArea = this.arrAreaCopy;
    let dialogData = this.dialog.open(AreaFilterDialog, {
      data: this.arrArea,
      minWidth: 450
    })
    dialogData.afterClosed().subscribe(res => {
      if(res) {
        this.arrArea = this.arrAreaCopy.filter(area => {       
          return area.name.indexOf(res.name) > -1 && area.status == res.status && (area.created_at >= (res.created_at_start || area.created_at) && area.created_at <= (res.created_at_end || area.created_at)) && (area.updated_at >= (res.updated_at_start || area.updated_at) && area.updated_at <= (res.updated_at_end || area.updated_at));
        })
      }
    })
  }
}
