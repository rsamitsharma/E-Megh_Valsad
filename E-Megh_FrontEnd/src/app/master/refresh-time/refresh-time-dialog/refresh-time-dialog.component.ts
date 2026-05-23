import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ClsRefreshTimeMaster } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-refresh-time-dialog",
  templateUrl: "./refresh-time-dialog.component.html",
  styleUrls: ["./refresh-time-dialog.component.scss"],
})
export class RefreshTimeDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<RefreshTimeDialogComponent>) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {}

  // #region Variable
  IsEdit: boolean = false;
  RID: number = 0;
  ChartRefreshTime?: number;
  AlertSMSRefreshTime?: number;
  CurrentReadingRefreshTime?: number;
  SirenRefreshTime?: number;
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.RID = data.ID;
      this.GetRefreshTimeData();
    }
  }

  GetRefreshTimeData() {
    this.anotherSubscription = this._MasterService.GetRefreshTimeMaster(this.RID).subscribe((res: any) => {
      const { Table } = res;
      const TempModal = Table[0];
      this.RID = TempModal.RID;
      this.ChartRefreshTime = TempModal.ChartRefreshTime;
      this.AlertSMSRefreshTime = TempModal.AlertSMSRefreshTime;
      this.CurrentReadingRefreshTime = TempModal.CurrentReadingRefreshTime;
      this.SirenRefreshTime = TempModal.SirenRefreshTime;
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.ChartRefreshTime) {
      ErrMsg += "ChartRefreshTime ";
    }

    if (!this.AlertSMSRefreshTime) {
      ErrMsg += "AlertSMSRefreshTime ";
    }

    if (!this.CurrentReadingRefreshTime) {
      ErrMsg += "CurrentReadingRefreshTime ";
    }

    if (!this.SirenRefreshTime) {
      ErrMsg += "SirenRefreshTime ";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "Oops");
      Valid = false;
    }

    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new ClsRefreshTimeMaster();
    FmData.ChartRefreshTime = this.ChartRefreshTime;
    FmData.AlertSMSRefreshTime = this.AlertSMSRefreshTime;
    FmData.CurrentReadingRefreshTime = this.CurrentReadingRefreshTime;
    FmData.SirenRefreshTime = this.SirenRefreshTime;

    if (!this.IsEdit) {
      FmData.RID = 0;
    } else {
      FmData.RID = this.RID;
    }

    this.anotherSubscription = this._MasterService.AddRefreshTimeMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}
interface DialogData {
  IsEdit: boolean;
  ID: number;
}
