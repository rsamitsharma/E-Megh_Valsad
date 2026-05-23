import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ExcelToJsonDialogComponent } from '../excel-to-json-dialog/excel-to-json-dialog.component';
import { ToastrService } from "ngx-toastr";
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog, private toastr: ToastrService) { }


  matDialogDefaultConfig(config: MatDialogConfig) {
    config.hasBackdrop = true;
    config.disableClose = true;
    config.autoFocus = false;
    config.closeOnNavigation = true;
  }

  excelToJSONDialog(dialogConfig: MatDialogConfig, okCallback: (data: any[]) => void, cancelCallback: () => void) {
    this.matDialogDefaultConfig(dialogConfig);
    dialogConfig.width = "350px";
    const dialogRef = this.dialog.open(ExcelToJsonDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        okCallback(result);
      } else {
        cancelCallback();
      }
    });
  }
}
