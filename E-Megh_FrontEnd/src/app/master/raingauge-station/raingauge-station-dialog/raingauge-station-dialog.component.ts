import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { cls_RaingaugeLocationMaster } from "@source/app/_models/master";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { MapDialogComponent } from "@source/app/_shared/map-dialog/map-dialog.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-raingauge-station-dialog",
  templateUrl: "./raingauge-station-dialog.component.html",
  styleUrls: ["./raingauge-station-dialog.component.scss"],
})
export class RaingaugeStationDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<RaingaugeStationDialogComponent>, private dialog: MatDialog) {
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
  RaingaugeLocationID: number = 0;
  RaingaugeLocationName: string = "";
  DisctrictID?: number;
  DisctrictList: any[] = [];
  SAddress: string = "";
  Latitude?: number;
  Longitude?: number;
  GatewayMasterID?: number;
  GatewayMasterList: any[] = [];
  GatewayIMEI?: number;
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.RaingaugeLocationID = data.ID;
      this.GetRainguageStationData();
    }
  }

  GetDistrictMaster() {
    this.anotherSubscription = this._MasterService.GetDisctrictMaster(0).subscribe((res: any) => {
      this.DisctrictList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.DisctrictList, "DistrictID", item => `${item.DistrictName}`);
    });
  }

  GetGatewayMaster() {
    this.anotherSubscription = this._MasterService.GetGatewayMaster(true, 0).subscribe((res: any) => {
      this.GatewayMasterList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.GatewayMasterList, "GatewayMasterID", item => `${item.GatewayName}`);
    });
  }

  GetRainguageStationData() {
    this.anotherSubscription = this._MasterService.GetRaingaugeStationMaster(false, this.RaingaugeLocationID).subscribe((res: any) => {
      const { Table } = res;
      const TempModal = Table[0];
      this.RaingaugeLocationID = TempModal.RaingaugeLocationID;
      this.RaingaugeLocationName = TempModal.RaingaugeLocationName;
      this.DisctrictID = TempModal.DisctrictID;
      this.SAddress = TempModal.SAddress;
      this.Latitude = TempModal.Latitude;
      this.Longitude = TempModal.Longitude;
      this.GatewayMasterID = TempModal.GatewayMasterID;
      this.GatewayIMEI = TempModal.GatewayIMEI;
      this.IsActive = TempModal.IsActive;
    });
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

  GetGatewayIMEI(data: any) {
    this.GatewayIMEI = data.GatewayIMEI;
  }

  Validatedata() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.RaingaugeLocationName.trim()) {
      ErrMsg += "RaingaugeLocation Name ";
    }

    if (!this.DisctrictID) {
      ErrMsg += "District ";
    }

    if (!this.SAddress.trim()) {
      ErrMsg += "Address ";
    }

    if (!this.Latitude) {
      ErrMsg += "Latitude ";
    }

    if (!this.Longitude) {
      ErrMsg += "Longitude ";
    }

    if (!this.GatewayMasterID) {
      ErrMsg += "Gatewaymaster ";
    }

    if (!this.GatewayIMEI) {
      ErrMsg += "Gateway IMEI ";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "Oops");
      Valid = false;
    }

    return Valid;
  }

  Submit() {
    if (!this.Validatedata()) return;
    let FmData = new cls_RaingaugeLocationMaster();
    FmData.RaingaugeLocationName = this.RaingaugeLocationName;
    FmData.DisctrictID = this.DisctrictID;
    FmData.SAddress = this.SAddress;
    FmData.Latitude = this.Latitude;
    FmData.Longitude = this.Longitude;
    FmData.GatewayMasterID = this.GatewayMasterID;
    FmData.GatewayIMEI = this.GatewayIMEI;
    FmData.CreatedBy = parseInt(sessionStorage.getItem("UID") || "0");

    if (!this.IsEdit) {
      FmData.IsActive = true;
      FmData.RaingaugeLocationID = 0;
    } else {
      FmData.IsActive = this.IsActive;
      FmData.RaingaugeLocationID = this.RaingaugeLocationID;
    }

    this.anotherSubscription = this._MasterService.AddRaingaugeStationMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}
interface DialogData {
  IsEdit: boolean;
  ID: number;
}
