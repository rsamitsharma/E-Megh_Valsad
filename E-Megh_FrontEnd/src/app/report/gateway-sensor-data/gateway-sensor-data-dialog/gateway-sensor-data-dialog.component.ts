import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { cls_GatewaySensorData } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-gateway-sensor-data-dialog",
  templateUrl: "./gateway-sensor-data-dialog.component.html",
  styleUrls: ["./gateway-sensor-data-dialog.component.scss"],
})
export class GatewaySensorDataDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private datepipe: DatePipe, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<GatewaySensorDataDialogComponent>, public _GlobalService: GlobalService) {
    super();
    this.Dialogdata = data["SensorData"];
    this.dialogHandler(data);
  }

  ngOnInit() {
    // this.GetGatewaySensorData();
    this.GetGatewayMaster();
  }

  // #region Variable
  Dialogdata: any;
  ReadingLocationID: number = 0;
  LocationList: any[] = [];
  LastMonthDate = new Date();
  FromDate: string = "";
  ToDate: string = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  GatewaySensorData: any[] = [];
  IsEdit: boolean = false;
  GatewaySensorDataID?: number;
  GatewayMasterID?: number;
  GatewayMasterList: any[] = [];
  GatewayIMEI?: number;
  Reading?: number;
  RDatetime = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  currentdate = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  CurrentIP: string = "";
  IsPowerOn?: boolean;
  BetteryLevel?: number;
  SingleLevel?: number;
  PowerLevel?: number;
  GatewayIMEIList: any[] = [];
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.ReadingLocationID = data.ReadingLocationID;
      this.FromDate = this.datepipe.transform(data.FromDate, "yyyy-MM-dd")!;
      this.ToDate = this.datepipe.transform(data.ToDate, "yyyy-MM-dd")!;
      this.GetGatewaySensorData();
    }
  }

  GetReadingLocationList() {
    this.anotherSubscription = this._MasterService.GetReadingLocationMaster(true, 0).subscribe((res: any) => {
      const { Table } = res;
      this.LocationList = Table;
      this._GlobalService.dynamicInputSelect(this.LocationList, "RLID", item => `${item.Name}`);
    });
  }

  GetGatewayMaster() {
    this.anotherSubscription = this._MasterService.GetGatewayMaster(true, 0).subscribe((res: any) => {

      this.GatewayMasterList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.GatewayMasterList, "FID", item => `${item.FName}`);
    });
  }

  GetGatewaySensorData() {
    this.anotherSubscription = this._MasterService.GetGatewaySensorData(this.ReadingLocationID, this.FromDate, this.ToDate).subscribe((res: any) => {
      const { Table } = res;

      this.GatewaySensorData = Table;

      const TempModal: any = this.GatewaySensorData;
      this.GatewaySensorDataID = TempModal.DRID;
      this.GatewayMasterID = TempModal.FID;
      this.GatewayIMEI = TempModal.GatewayIMEI;
      this.Reading = TempModal.Reading;
      this.RDatetime = this.datepipe.transform(TempModal.RDateTime, "yyyy-MM-dd")!;
      this.CurrentIP = TempModal.CurrentIP;
      this.IsPowerOn = TempModal.IsPowerOn;
      this.BetteryLevel = TempModal.BetteryLevel;
      this.SingleLevel = TempModal.SingleLevel;
      this.PowerLevel = TempModal.PowerLevel;
    });
  }

  GetGatewayIMEI(data: any) {
    this.GatewayIMEI = data.GatewayIMEI;
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.GatewayIMEI) {
      ErrMsg += "GatewayIMEi";
    }

    if (!this.Reading) {
      ErrMsg += "Reading";
    }

    if (!this.CurrentIP) {
      ErrMsg += "Current IP";
    }

    if (!this.BetteryLevel) {
      ErrMsg += "Battery Level";
    }

    if (!this.SingleLevel) {
      ErrMsg += "Single Level";
    }

    if (!this.PowerLevel) {
      ErrMsg += "Power Level";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "Oops");
      Valid = false;
    }

    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new cls_GatewaySensorData();
    FmData.GatewaySensorDataID = 0;
    FmData.GatewayIMEI = this.GatewayIMEI;
    FmData.Reading = this.Reading;
    FmData.RDateTime = this.RDatetime;
    FmData.CurrentIP = this.CurrentIP;
    FmData.BetteryLevel = this.BetteryLevel;
    FmData.SingleLevel = this.SingleLevel;
    FmData.PowerLevel = this.PowerLevel;
    FmData.IsPowerOn = this.IsPowerOn;

    this.anotherSubscription = this._MasterService.AddGatewaySensorData(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}

interface DialogData {
  IsEdit: boolean;
  ID: number;
  ReadingLocationID: number;
  FromDate: Date;
  ToDate: Date;
}
