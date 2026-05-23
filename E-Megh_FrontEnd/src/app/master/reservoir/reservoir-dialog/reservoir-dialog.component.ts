import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { cls_ReservoirMaster } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { MapDialogComponent } from "@source/app/_shared/map-dialog/map-dialog.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-reservoir-dialog",
  templateUrl: "./reservoir-dialog.component.html",
  styleUrls: ["./reservoir-dialog.component.scss"],
})
export class ReservoirDialogComponent extends UnSubscriber {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<ReservoirDialogComponent>, private dialog: MatDialog, public _GlobalService: GlobalService) {
    super();
    this.dialoghandler(data);
  }

  // #region Variable
  IsEdit: boolean = false;
  IsActive: boolean = false;
  ViewData: any;
  ReservoirID: number = 0;
  ReservoirName: string = "";
  ReservoirLocation: string = "";
  ReservoirLatitude?: number;
  ReservoirLongitude?: number;
  KMFromCapital?: number;
  TotalLevelHeight?: number;
  DangerLevelHeight?: number;
  WarningLevelHeight?: number;
  NormalDischarge?: number;
  MaxDischarge?: number;
  MaxTimeDuration?: number;
  ReservoirMapData: any[] = [];
  timeIntervalOptions: { value: number; display: string }[] = [
    { value: 1, display: "Every 1 hr (Daily 24 Reading)" },
    { value: 2, display: "Every 2 hrs (Daily 12 Reading)" },
    { value: 3, display: "Every 3 hrs (Daily 8 Reading)" },
    { value: 4, display: "Every 4 hrs (Daily 6 Reading)" },
    { value: 6, display: "Every 6 hrs (Daily 4 Reading)" },
    { value: 8, display: "Every 8 hrs (Daily 3 Reading)" },
    { value: 12, display: "Every 12 hrs (Daily 2 Reading)" },
    { value: 24, display: "Every 24 hrs (Daily 1 Reading)" },
  ];
  // #endregion

  // Helper function to compare values in the dropdown
  compareFn(option1: any, option2: any): boolean {
    return option1 && option2 ? option1 === option2 : option1 === option2;
  }

  dialoghandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.ReservoirID = data.ID;
      this.GetReservoirData();
    }
  }

  GetReservoirData() {
    this.anotherSubscription = this._MasterService.GetReservoirMaster(false, this.ReservoirID).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

      const TempModal = Table[0];
      this.ReservoirID = TempModal.ReservoirID;
      this.ReservoirName = TempModal.ReservoirName;
      this.ReservoirLocation = TempModal.ReservoirLocation;
      this.ReservoirLatitude = TempModal.ReservoirLatitude;
      this.ReservoirLongitude = TempModal.ReservoirLongitude;
      this.KMFromCapital = TempModal.KMFromCapital;
      this.DangerLevelHeight = TempModal.DangerLevelHeight;
      this.TotalLevelHeight = TempModal.TotalLevelHeight;
      this.WarningLevelHeight = TempModal.WarningLevelHeight;
      this.NormalDischarge = TempModal.NornalDischarge;
      this.MaxDischarge = TempModal.MaxDischarge;
      this.MaxTimeDuration = Number(TempModal.MaxTimeDuration); // Ensure it's a number
      this.IsActive = TempModal.IsActive;
      this.ReservoirMapData = TempModal;
    });
  }

  OpenMap() {
    const location = {
      Latitude: this.ReservoirLatitude,
      Longitude: this.ReservoirLongitude
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
      if (res) {
        this.ReservoirLocation = res.address;
        this.ReservoirLongitude = res.lng;
        this.ReservoirLatitude = res.lat;
      }
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.ReservoirName.trim()) {
      ErrMsg += "Reservoir Name";
    }

    if (!this.ReservoirLocation.trim()) {
      ErrMsg += "Reservoir Location";
    }

    if (!this.ReservoirLatitude) {
      ErrMsg += "Reservoir Latitude";
    }

    if (!this.ReservoirLongitude) {
      ErrMsg += "Reservoir Longitude";
    }

    // if (!this.KMFromCapital) {
    //   ErrMsg += "KMFromCapital";
    // }

    if (!this.DangerLevelHeight) {
      ErrMsg += "Danger Level Height";
    }

    if (!this.WarningLevelHeight) {
      ErrMsg += "Warning Level Height";
    }

    // if (!this.NormalDischarge) {
    //   ErrMsg += "Normal Discharge";
    // }

    // if (!this.MaxDischarge) {
    //   ErrMsg += "Max Discharge";
    // }

    if (!this.MaxTimeDuration) {
      ErrMsg += "Max Time Duration";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "Oops");
      Valid = false;
    }

    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new cls_ReservoirMaster();
    FmData.ReservoirName = this.ReservoirName;
    FmData.ReservoirLocation = this.ReservoirLocation;
    FmData.ReservoirLatitude = this.ReservoirLatitude;
    FmData.ReservoirLongitude = this.ReservoirLongitude;
    FmData.KMFromCapital = this.KMFromCapital;
    FmData.DangerLevelHeight = this.DangerLevelHeight;
    FmData.NormalDischarge = this.NormalDischarge;
    FmData.WarningLevelHeight = this.WarningLevelHeight;
    FmData.TotalLevelHeight = this.TotalLevelHeight;
    FmData.MaxDischarge = this.MaxDischarge;
    FmData.MaxTimeDuration = this.MaxTimeDuration;
    FmData.CreatedBy = parseInt(sessionStorage.getItem("UID") || "0");

    if (!this.IsEdit) {
      FmData.IsActive = true;
      FmData.ReservoirID = 0;
    } else {
      FmData.IsActive = this.IsActive;
      FmData.ReservoirID = this.ReservoirID;
    }

    this.anotherSubscription = this._MasterService.AddReservoirMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}
interface DialogData {
  IsEdit: boolean;
  ID: number;
}
