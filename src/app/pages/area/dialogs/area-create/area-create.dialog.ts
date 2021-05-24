import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AreaService } from 'src/app/modules/area/services/area.service';
import { SpinnerDialog } from 'src/app/shared/dialogs/spinner/spinner.dialog';

@Component({
  selector: 'app-area-create',
  templateUrl: './area-create.dialog.html',
  styles: [
  ]
})
export class AreaCreateDialog implements OnInit {
  formCreate: FormGroup;
  arrStatus: Array<number> = [0, 1];

  constructor(private fb: FormBuilder, private areaService: AreaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      name: ['', Validators.required],
      status: [null, Validators.required]
    })
  }
  onCreate() {
    let data = this.formCreate.value;
    this.dialog.open(SpinnerDialog);
    this.areaService.create(data).subscribe(res => {
      this.dialog.closeAll();
    })
  }
}
