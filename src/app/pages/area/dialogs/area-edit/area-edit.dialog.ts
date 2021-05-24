import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AreaService } from 'src/app/modules/area/services/area.service';
import { SpinnerDialog } from 'src/app/shared/dialogs/spinner/spinner.dialog';

@Component({
  selector: 'app-area-edit',
  templateUrl: './area-edit.dialog.html',
  styles: [
  ]
})
export class AreaEditDialog implements OnInit {
  formUpdate: FormGroup;
  arrStatus: Array<number> = [0, 1];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private areaService: AreaService,
    private fb: FormBuilder  
  ) { }

  ngOnInit(): void {
    this.formUpdate = this.fb.group({
      name: [this.data.name, Validators.required],
      status: [this.data.status]
    })
  }

  onUpdate() {
    let id = this.data.id;
    let dataF = this.formUpdate.value;
    this.dialog.open(SpinnerDialog);
    this.areaService.updateAll(id, dataF).subscribe(res => {
      this.dialog.closeAll();
    })
  }
}
