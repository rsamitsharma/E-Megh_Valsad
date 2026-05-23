import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ClsSirenLocationMaster } from "@source/app/_models/master";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { MapDialogComponent } from "@source/app/_shared/map-dialog/map-dialog.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-siren-sensor-dialog",
  templateUrl: "./siren-sensor-dialog.component.html",
  styleUrls: ["./siren-sensor-dialog.component.scss"],
})
export class SirenSensorDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<SirenSensorDialogComponent>, private dialog: MatDialog) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {
    this.GetDistrictMaster();
    this.GetGatewayMaster();
  }

  // #region Variable
  IsEdit: boolean = false;
  IsActive: boolean = false;
  SirenLocationID: number = 0;
  SirenLocationName: string = "";
  DisctrictID?: number;
  DistrictList: any[] = [];
  GatewayMasterID?: number;
  GatewaymasterList: any[] = [];
  GatewayIMEI?: number;
  SAddress: string = "";
  Latitude?: number;
  Longitude?: number;
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.SirenLocationID = data.ID;
      this.GetSirenSensorData();
    }
  }

  GetDistrictMaster() {
    this.anotherSubscription = this._MasterService.GetDisctrictMaster(0).subscribe((res: any) => {
      this.DistrictList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.DistrictList, "DistrictID", item => `${item.DistrictName}`);
    });
  }

  GetGatewayMaster() {
    this.anotherSubscription = this._MasterService.GetGatewayMaster(true, 0).subscribe((res: any) => {
      this.GatewaymasterList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.GatewaymasterList, "GatewayMasterID", item => `${item.GatewayName}`);
    });
  }

  GetSirenSensorData() {
    this.anotherSubscription = this._MasterService.GetSirenLocationMaster(false, this.SirenLocationID).subscribe((res: any) => {
      const { Table } = res;
      const TempModal = Table[0];
      this.SirenLocationID = TempModal.SirenLocationID;
      this.SirenLocationName = TempModal.SirenLocationName;
      this.DisctrictID = TempModal.DisctrictID;
      this.GatewayMasterID = TempModal.GatewayMasterID;
      this.GatewayIMEI = TempModal.GatewayIMEI;
      this.SAddress = TempModal.SAddress;
      this.Latitude = TempModal.Latitude;
      this.Longitude = TempModal.Longitude;
      this.IsActive = TempModal.IsActive;
    });
  }

  GetGatewayIMEI(data: any) {
    this.GatewayIMEI = data.GatewayIMEI;
  }

  OpenMap() {
    const dialogconfig = new MatDialogConfig();
    this._GlobalService.matDialogDefaultConfig(dialogconfig);
    dialogconfig.width = "100%";
    const dialogref = this.dialog.open(MapDialogComponent, dialogconfig);
    dialogref.afterClosed().subscribe((res: any) => {
      if (res) {
        this.SAddress = res.address;
        this.Longitude = res.lng;
        this.Latitude = res.lat;
      }
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.SirenLocationName.trim()) {
      ErrMsg += "Name ";
    }

    if (!this.DisctrictID) {
      ErrMsg += "District ";
    }

    if (!this.GatewayMasterID) {
      ErrMsg += "Gateway Master ";
    }

    if (!this.GatewayIMEI) {
      ErrMsg += "GatewayIMEI ";
    }

    if (!this.SAddress.trim()) {
      ErrMsg += "Warrenty ";
    }

    if (!this.Latitude) {
      ErrMsg += "Latitude ";
    }

    if (!this.Longitude) {
      ErrMsg += "Longitude ";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "Oops");
      Valid = false;
    }
    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new ClsSirenLocationMaster();
    FmData.SirenLocationName = this.SirenLocationName;
    FmData.DisctrictID = this.DisctrictID;
    FmData.GatewayMasterID = this.GatewayMasterID;
    FmData.GatewayIMEI = this.GatewayIMEI;
    FmData.SAddress = this.SAddress;
    FmData.Latitude = this.Latitude;
    FmData.Longitude = this.Longitude;
    FmData.CreatedBy = parseInt(sessionStorage.getItem("UID") || "0");

    if (!this.IsEdit) {
      FmData.IsActive = true;
      FmData.SirenLocationID = 0;
    } else {
      FmData.IsActive = this.IsActive;
      FmData.SirenLocationID = this.SirenLocationID;
    }

    this.anotherSubscription = this._MasterService.AddSirenSensorLocationMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}
interface DialogData {
  IsEdit: boolean;
  ID: number;
}
