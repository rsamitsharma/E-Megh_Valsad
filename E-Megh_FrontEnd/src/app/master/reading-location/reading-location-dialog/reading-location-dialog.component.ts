import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ClsReadingLocationMaster } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { MapDialogComponent } from "@source/app/_shared/map-dialog/map-dialog.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-reading-location-dialog",
  templateUrl: "./reading-location-dialog.component.html",
  styleUrls: ["./reading-location-dialog.component.scss"],
})
export class ReadingLocationDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<ReadingLocationDialogComponent>, private dialog: MatDialog) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {
    this.GetDistrictMaster();
  }

  // #region Variable
  IsEdit: boolean = false;
  IsActive: boolean = false;
  ReadingLocationID: number = 0;
  DisctrictID?: number;
  DistrictList: any[] = [];
  ReadingLocationName: string = "";
  RiverName: string = "";
  Location: string = "";
  Latitude?: number;
  Longitude?: number;
  Altitude?: number;
  RangeHeightMin?: number;
  RangeHeightMax?: number;
  GatewayIMEI?: number;
  DangerHeight?: number;
  WarningLevel?: number;
  DangerLevel?: number;
  MaxTimeDuration?: number;
  // MaxWaterLevel?: number;
  IsManualEntry?: boolean;
  Remarks: string = "";
  ReadingLocationMapData: any[] = [];
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.ReadingLocationID = data.ID;
      this.GetReadingLocationData();
    }
  }

  GetDistrictMaster() {
    this.anotherSubscription = this._MasterService.GetDisctrictMaster(0).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

      this.DistrictList = Table;
      this.DistrictList.reverse();
      this._GlobalService.dynamicInputSelect(this.DistrictList, "DistrictID", item => `${item.DistName}`);
    });
  }

  GetReadingLocationData() {
    this.anotherSubscription = this._MasterService.GetReadingLocationMaster(false, this.ReadingLocationID).subscribe((res: any) => {
      const { Table } = res;

      const TempModal = Table[0];
      this.ReadingLocationID = TempModal.RLID;
      this.DisctrictID = TempModal.DisctrictID;
      this.ReadingLocationName = TempModal.Name;
      this.RiverName = TempModal.RiverName;
      this.GatewayIMEI = TempModal.GatewayIMEI;
      this.Location = TempModal.Location;
      this.Latitude = +TempModal.Latitude;
      this.Longitude = +TempModal.Longitude;
      this.Altitude = +TempModal.Altitude;
      this.RangeHeightMax = TempModal.RangeHeightMax;
      this.RangeHeightMin = TempModal.RangeHeightMin;
      this.DangerHeight = TempModal.DangerWaterLevel;
      this.WarningLevel = TempModal.WarningWaterLevel;
      this.WarningLevel = TempModal.WarningWaterLevel;
      this.DangerLevel = TempModal.DangerWaterLevel;
      this.MaxTimeDuration = TempModal.MaxTimeDuration;
      this.IsManualEntry = TempModal.IsManualEntry;
      this.Remarks = TempModal.Remarks;
      this.IsActive = TempModal.IsActive;
      this.ReadingLocationMapData = TempModal;
    });
  }

  OpenMap() {
    const location = {
      Latitude: this.Latitude,
      Longitude: this.Longitude
    };
    const dialogconfig = new MatDialogConfig();
    this._GlobalService.matDialogDefaultConfig(dialogconfig);
    dialogconfig.width = "100%";

    dialogconfig.data = {
      IsDashboard: false,
      arrayForDialog: location,
    };
    const dialogref = this.dialog.open(MapDialogComponent, dialogconfig);
    dialogref.afterClosed().subscribe((res: any) => {
      console.log(res);

      if (res) {
        this.Location = res.address;
        this.Longitude = res.lng;
        this.Latitude = res.lat;
        this.Altitude = res.altitude;
      }
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    // if (!this.DisctrictID) {
    //   ErrMsg += "District ";
    // }

    if (!this.ReadingLocationName.trim()) {
      ErrMsg += "Reading Location  ";
    }

    if (!this.RiverName.trim()) {
      ErrMsg += "River";
    }

    if (!this.Location) {
      ErrMsg += "Location ";
    }

    // if (!this.GatewayMasterID) {
    //   ErrMsg += "Gateway Master ";
    // }

    // if (!this.Latitude) {
    //   ErrMsg += "Latitude ";
    // }

    // if (!this.Longitude) {
    //   ErrMsg += "Longitude ";
    // }

    // if (!this.Altitude) {
    //   ErrMsg += "Altitude ";
    // }

    if (!this.Remarks.trim()) {
      ErrMsg += "Remarks ";
    }

    // if (!this.GatewayIMEI) {
    //   ErrMsg += "GatewayIMEI ";
    // }

    // if (!this.RangeHeightMin) {
    //   ErrMsg += "RangeHeightMin ";
    // }

    // if (!this.RangeHeightMax) {
    //   ErrMsg += "RangeHeightMax ";
    // }

    // if (!this.ActualVoltagePerMeter) {
    //   ErrMsg += "ActualVoltagePerMeter ";
    // }

    // if (!this.ZeroLevelVotage) {
    //   ErrMsg += "ZeroLevelVotage ";
    // }

    // if (!this.AdjustMeter) {
    //   ErrMsg += "AdjustMeter ";
    // }

    // if (!this.MaxTimeDuration) {
    //   ErrMsg += "MaxTimeDuration ";
    // }

    // if (!this.Resistance) {
    //   ErrMsg += "Resistance";
    // }

    // if (!this.MilliAmpsMin) {
    //   ErrMsg += "MilliAmpsMin";
    // }

    // if (!this.MilliAmpsMax) {
    //   ErrMsg += "MilliAmpsMax";
    // }

    // if (!this.DangerHeight) {
    //   ErrMsg += "Danger Height";
    // }

    // if (!this.WarningLevel) {
    //   ErrMsg += "Warning Level";
    // }

    // if (!this.DangerLevel) {
    //   ErrMsg += "Danger Level";
    // }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "error");
      Valid = false;
    }
    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new ClsReadingLocationMaster();
    // FmData.DisctrictID = this.DisctrictID;
    FmData.ReadingLocationID = this.ReadingLocationID;
    FmData.ReadingLocationName = this.ReadingLocationName;
    FmData.RiverName = this.RiverName;
    FmData.Location = this.Location;
    FmData.WarningLevel = this.WarningLevel;
    FmData.Longitude = this.Longitude;
    FmData.Latitude = this.Latitude;
    FmData.Altitude = this.Altitude;
    // FmData.GatewayMasterID = this.GatewayMasterID;
    // FmData.GatewayIMEI = this.GatewayIMEI;
    // FmData.Resistance = this.Resistance;
    // FmData.MilliAmpsMax = this.MilliAmpsMax;
    // FmData.MilliAmpsMin = this.MilliAmpsMin;
    // FmData.RangeHeightMax = this.RangeHeightMax;
    // FmData.RangeHeightMin = this.RangeHeightMin;
    FmData.DangerWaterLevel = this.DangerHeight;
    // FmData.WarningLevel = this.WarningLevel;
    // FmData.DangerLevel = this.DangerLevel;
    // FmData.VoltagePerMeter = this.VoltagePerMeter;
    // FmData.ActualVoltagePerMeter = this.ActualVoltagePerMeter;
    // FmData.ZeroLevelVotage = this.ZeroLevelVotage;
    // FmData.AdjustMeter = this.AdjustMeter;
    // FmData.DataRefreshMin = this.DataRefreshMin;
    FmData.MaxTimeDuration = this.MaxTimeDuration;
    FmData.IsActive = this.IsActive;
    FmData.IsManualEntry = this.IsManualEntry;
    FmData.Remarks = this.Remarks;
    // FmData.CreatedBy = parseInt(sessionStorage.getItem("UID") || "0");

    if (!this.IsEdit) {
      FmData.IsActive = true;
      FmData.ReadingLocationID = 0;
    } else {
      FmData.ReadingLocationID = this.ReadingLocationID;
      FmData.IsActive = this.IsActive;
    }
    console.log(FmData);

    this.anotherSubscription = this._MasterService.AddReadingLocationMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message);
      this._dialogRef.close(true);
    });
  }
}

interface DialogData {
  IsEdit: boolean;
  ID: number;
}
