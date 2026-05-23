import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ClsUserMasterReadingLocations } from "@source/app/_models/master";
import { GlobalService, MasterService } from "@source/app/_services";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-user-reading-location-dialog",
  templateUrl: "./user-reading-location-dialog.component.html",
  styleUrls: ["./user-reading-location-dialog.component.scss"],
})
export class UserReadingLocationDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<UserReadingLocationDialogComponent>) {
    this.IsEdit = data.Edit;
    this.ViewData = data.data;
    console.log(data.data);
  }

  ngOnInit() {
    this.GetUserReadingLocation();
  }

  // #region Variable
  IsEdit: boolean = false;
  IsActive: boolean = false;
  ViewData: any;
  ReadingLocationID?: number;
  GatewayMasterID?: number;
  GatewayMasterList: any[] = [];
  // GatewayIMEI?: number;
  Resistance?: number;
  MilliAmpsMin?: number;
  MilliAmpsMax?: number;
  // VoltagePerMeter?: number;
  // ActualVoltagePerMeter?: number;
  // ZeroLevelVotage?: number;
  AdjustMeter?: number;
  DataRefreshMin?: number;
  // #endregion

  GetUserReadingLocation() {
    this._MasterService.GetGatewayMaster(true, 0).subscribe((res: any) => {
      const { Table } = res;
      this.GatewayMasterList = Table;
      this._GlobalService.dynamicInputSelect(this.GatewayMasterList, "GatewayMasterID", item => `${item.GatewayName}`);
    });
    if (this.IsEdit) {
      console.log(this.ViewData);
      this.ReadingLocationID = this.ViewData.ReadingLocationID;
      this.GatewayMasterID = this.ViewData.GatewayMasterID;
      // this.GatewayIMEI = this.ViewData.GatewayIMEI;
      this.Resistance = this.ViewData.Resistance;
      this.MilliAmpsMin = this.ViewData.MilliAmpsMin;
      this.MilliAmpsMax = this.ViewData.MilliAmpsMax;
      // this.VoltagePerMeter = this.ViewData.VoltagePerMeter;
      // this.ActualVoltagePerMeter = this.ViewData.ActualVoltagePerMeter;
      // this.ZeroLevelVotage = this.ViewData.ZeroLevelVotage;
      this.AdjustMeter = this.ViewData.AdjustMeter;
      this.DataRefreshMin = this.ViewData.DataRefreshMin;
      this.IsActive = this.ViewData.IsActive;
    }
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.GatewayMasterID) {
      ErrMsg += "Gateway Master ";
    }

    // if (!this.GatewayIMEI) {
    //   ErrMsg += "GatewayIMEI ";
    // }

    if (!this.Resistance) {
      ErrMsg += "Resistance";
    }

    if (!this.MilliAmpsMin) {
      ErrMsg += "MilliAmpsMin";
    }

    if (!this.MilliAmpsMax) {
      ErrMsg += "MilliAmpsMax";
    }

    if (!this.AdjustMeter) {
      ErrMsg += "AdjustMeter";
    }

    if (!this.DataRefreshMin) {
      ErrMsg += "DataRefreshMin";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "Oops");
      Valid = false;
    }
    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new ClsUserMasterReadingLocations();
    FmData.ReadingLocationID = this.ReadingLocationID;
    FmData.GatewayMasterID = this.GatewayMasterID;
    // FmData.GatewayIMEI = this.GatewayIMEI;
    FmData.Resistance = this.Resistance;
    FmData.MilliAmpsMax = this.MilliAmpsMax;
    FmData.MilliAmpsMin = this.MilliAmpsMin;
    // FmData.VoltagePerMeter = this.VoltagePerMeter;
    // FmData.ActualVoltagePerMeter = this.ActualVoltagePerMeter;
    // FmData.ZeroLevelVotage = this.ZeroLevelVotage;
    FmData.AdjustMeter = this.AdjustMeter;
    FmData.DataRefreshMin = this.DataRefreshMin;

    let api: any;
    if (!this.IsEdit) {
      FmData.IsActive = true;
      FmData.ReadingLocationID = 0;
      console.log(FmData);
      api = this._MasterService.AddUserMasterReadingLocation(FmData).subscribe(
        (res: any) => {
          this.toastr.success(res.message);
          this._dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(err.error.message, "Oops");
          this._dialogRef.close();
        }
      );
    } else {
      FmData.ReadingLocationID = this.ReadingLocationID;
      FmData.IsActive = this.IsActive;
      console.log(FmData);
      api = this._MasterService.AddUserMasterReadingLocation(FmData).subscribe(
        (res: any) => {
          this.toastr.success(res.message);
          this._dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(err.error.message, "Oops");
          this._dialogRef.close();
        }
      );
    }
  }
}
