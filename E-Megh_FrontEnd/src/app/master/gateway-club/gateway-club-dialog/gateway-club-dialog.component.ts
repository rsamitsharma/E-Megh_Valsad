import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { cls_GatewaynDeviceClubMaster } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-gateway-club-dialog",
  templateUrl: "./gateway-club-dialog.component.html",
  styleUrls: ["./gateway-club-dialog.component.scss"],
})
export class GatewayClubDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<GatewayClubDialogComponent>) {
    super();
    console.log(data);

    this.dialogHandler(data);
  }

  ngOnInit() {
    this.GetGatewayMaster();
    this.GetDeviceMaster();
    this.GetSimMaster();
  }

  // #region Variable
  IsEdit: boolean = false;
  IsActive?: boolean;
  GatewaynDeviceClubMasterID: number = 0;
  GatewaydeviceList: any[] = [];
  GatewaynDeviceClubName: string = "";
  DeviceMasterID?: number;
  DeviceMasterList: any[] = [];
  GatewayMasterID?: number;
  GatewayMasterList: any[] = [];
  SIMID?: number;
  SimList: any[] = [];
  // #endregion

  dialogHandler(data: DialgData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.GatewaynDeviceClubMasterID = data.ID;
      this.GetGatewayClubData();
    }
  }

  GetGatewayMaster() {
    this._MasterService.GetGatewayMaster(true, 0).subscribe((res: any) => {
      this.GatewayMasterList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.GatewayMasterList, "GatewayMasterID", item => `${item.GatewayName}`);
    });
  }

  GetDeviceMaster() {
    this._MasterService.GetDeviceMaster(true, 0).subscribe((res: any) => {
      this.DeviceMasterList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.DeviceMasterList, "DeviceMasterID", item => `${item.DeviceName}`);
    });
  }

  GetSimMaster() {
    this.anotherSubscription = this._MasterService.GetSimMaster(true, 0).subscribe((res: any) => {
      this.SimList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.SimList, "SIMID", item => `${item.CompanyName}`);
    });
  }

  GetGatewayClubData() {
    this.anotherSubscription = this._MasterService.GetGatewaynDeviceClubMaster(true).subscribe((res: any) => {
      const { Table } = res;
      this.GatewaydeviceList = Table;
      const TempModal: any = this.GatewaydeviceList.filter(item => item.GatewaynDeviceClubMasterID === this.GatewaynDeviceClubMasterID)[0];
      this.GatewaynDeviceClubMasterID = TempModal.GatewaynDeviceClubMasterID;
      this.GatewaynDeviceClubName = TempModal.GatewaynDeviceClubName;
      this.DeviceMasterID = TempModal.DeviceMasterID;
      this.GatewayMasterID = TempModal.GatewayMasterID;
      this.SIMID = TempModal.SIMID;
      this.IsActive = TempModal.IsActive;
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.GatewaynDeviceClubName) {
      ErrMsg += "Name ";
    }

    if (!this.SIMID) {
      ErrMsg += "SIm ID ";
    }

    if (!this.GatewayMasterID) {
      ErrMsg += "GatewayMasterID ";
    }

    if (!this.DeviceMasterID) {
      ErrMsg += "DeviceMasterID ";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "Oops");
      Valid = false;
    }

    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new cls_GatewaynDeviceClubMaster();
    FmData.GatewaynDeviceClubName = this.GatewaynDeviceClubName;
    FmData.DeviceMasterID = this.DeviceMasterID;
    FmData.SIMID = this.SIMID;
    FmData.GatewayMasterID = this.GatewayMasterID;
    FmData.CreatedBy = parseInt(sessionStorage.getItem("UID") || "0");

    if (!this.IsEdit) {
      FmData.IsActive = true;
      FmData.GatewaynDeviceClubMasterID = 0;
    } else {
      FmData.IsActive = this.IsActive;
      FmData.GatewaynDeviceClubMasterID = this.GatewaynDeviceClubMasterID;
    }

    this.anotherSubscription = this._MasterService.AddGatewaynDeviceClubMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}
interface DialgData {
  IsEdit: boolean;
  ID: number;
}
