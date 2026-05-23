import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { cls_DeviceMaster } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-device-master-dialog",
  templateUrl: "./device-master-dialog.component.html",
  styleUrls: ["./device-master-dialog.component.scss"],
})
export class DeviceMasterDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<DeviceMasterDialogComponent>) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {}

  // #region Variable
  IsEdit: boolean = false;
  IsActive?: boolean = false;
  DeviceMasterID: number = 0;
  DeviceName: string = "";
  DeviceType?: number;
  CompanyName: string = "";
  SerialNo: string = "";
  Type: string = "";
  Warrenty: string = "";
  Remarks: string = "";
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.DeviceMasterID = data.ID;
      this.GetDeviceData();
    }
  }

  GetDeviceData() {
    this.anotherSubscription = this._MasterService.GetDeviceMaster(false, this.DeviceMasterID).subscribe((res: any) => {
      const { Table } = res;
      const TempModal = Table[0];
      this.DeviceMasterID = TempModal.DeviceMasterID;
      this.DeviceName = TempModal.DeviceName;
      this.DeviceType = TempModal.DeviceType;
      this.CompanyName = TempModal.CompanyName;
      this.SerialNo = TempModal.SerialNo;
      this.Type = TempModal.Type;
      this.Warrenty = TempModal.Warrenty;
      this.Remarks = TempModal.Remarks;
      this.IsActive = TempModal.IsActive;
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.DeviceName?.trim()) {
      ErrMsg += "Device Name ";
    }

    if (!this.DeviceType) {
      ErrMsg += "Device Type ";
    }

    if (!this.CompanyName?.trim()) {
      ErrMsg += "Company Name ";
    }

    if (!this.SerialNo?.trim()) {
      ErrMsg += "Serial no.";
    }

    if (!this.Type?.trim()) {
      ErrMsg += "Type ";
    }

    if (!this.Warrenty?.trim()) {
      ErrMsg += "Warrenty ";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "error");
      Valid = false;
    }
    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new cls_DeviceMaster();
    FmData.DeviceName = this.DeviceName;
    FmData.DeviceType = this.DeviceType;
    FmData.CompanyName = this.CompanyName;
    FmData.SerialNo = this.SerialNo;
    FmData.Type = this.Type;
    FmData.Warrenty = this.Warrenty;
    FmData.Remarks = this.Remarks;
    FmData.CreatedBy = parseInt(sessionStorage.getItem("UID") || "0");

    if (!this.IsEdit) {
      FmData.IsActive = true;
      FmData.DeviceMasterID = this.DeviceMasterID;
    } else {
      FmData.IsActive = this.IsActive;
      FmData.DeviceMasterID = this.DeviceMasterID;
    }
    this.anotherSubscription = this._MasterService.AddDeviceMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}
interface DialogData {
  IsEdit: boolean;
  ID: number;
}
