import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ClsDangerCategoryMaster } from "@source/app/_models/master";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-danger-category-dialog",
  templateUrl: "./danger-category-dialog.component.html",
  styleUrls: ["./danger-category-dialog.component.scss"],
})
export class DangerCategoryDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<DangerCategoryDialogComponent>) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {}

  // #region Variable
  IsEdit: boolean = false;
  IsActive?: boolean = false;
  DangerCategoryID: number = 0;
  DangerCategoryName: string = "";
  // gDangerCategoryName: string = "";
  ColorCode: string = " #050505";
  Remarks: string = "";
  OrderNo?: number;
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.DangerCategoryID = data.ID;
      this.GetDangerCategoryData();
    }
  }

  GetDangerCategoryData() {
    this.anotherSubscription = this._MasterService.GetDangerCategoryMaster(false, this.DangerCategoryID).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

      const TempModal = Table[0];
      this.DangerCategoryID = TempModal.DID;
      this.DangerCategoryName = TempModal.DangerCategoryName;
      // this.gDangerCategoryName = TempModal.gDangerCategoryName;
      this.ColorCode = TempModal.ColorCode;
      this.OrderNo = TempModal.OrderNo;
      this.Remarks = TempModal.Remarks;
      this.IsActive = TempModal.IsActive;
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.DangerCategoryName?.trim()) {
      ErrMsg += "Danger Category Name ";
    }

    if (!this.ColorCode?.trim()) {
      ErrMsg += "Color ";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "error");
      Valid = false;
    }
    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new ClsDangerCategoryMaster();
    FmData.DangerCategoryName = this.DangerCategoryName;
    // FmData.gDangerCategoryName = this.gDangerCategoryName;
    FmData.ColorCode = this.ColorCode;
    FmData.OrderNo = this.OrderNo;
    FmData.Remarks = this.Remarks;

    if (!this.IsEdit) {
      FmData.IsActive = true;
      FmData.DangerCategoryID = 0;
    } else {
      FmData.DangerCategoryID = this.DangerCategoryID;
      FmData.IsActive = this.IsActive;
    }

    this.anotherSubscription = this._MasterService.AddDangerCategoryMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}

interface DialogData {
  IsEdit: boolean;
  ID: number;
}
