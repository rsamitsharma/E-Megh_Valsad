import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { cls_GatewayRaingaugeData } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-gateway-raingauge-data-dialog",
  templateUrl: "./gateway-raingauge-data-dialog.component.html",
  styleUrls: ["./gateway-raingauge-data-dialog.component.scss"],
})
export class GatewayRaingaugeDataDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private datepipe: DatePipe, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<GatewayRaingaugeDataDialogComponent>) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {
    this.GetGatewayMaster();
  }

  // #region Variable
  IsEdit: boolean = false;
  IsActive: boolean = false;
  GatewayRaingaugeDataID: number = 0;
  GatewayRaingaugeList: any[] = [];
  ReadingLocationList: any[] = [];
  RDatetime: string = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  RaingaugeLocationID: number = 0;
  RainGaugeData: any[] = [];
  GatewayMasterID?: number;
  Gatewaymasterlist: any[] = [];
  GatewayIMEI?: number;
  Reading?: number;
  CurrentIP: string = "";
  IsPowerOn?: boolean;
  BetteryLevel?: number;
  SingleLevel?: number;
  IsReal?: boolean;
  PowerLevel?: number;
  GatewayIMEIList: any[] = [];
  FromDate: string = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  ToDate: string = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.GatewayRaingaugeDataID = data.ID;
      this.FromDate = this.datepipe.transform(data.FromDate, "yyyy-MM-dd")!;
      this.ToDate = this.datepipe.transform(data.ToDate, "yyyy-MM-dd")!;
      this.GetRainGaugeData();
    }
  }

  GetGatewayMaster() {
    this.anotherSubscription = this._MasterService.GetGatewayMaster(true, 0).subscribe((res: any) => {
      this.Gatewaymasterlist = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.Gatewaymasterlist, "GatewayMasterID", item => `${item.GatewayName}`);
    });
  }

  GetRainGaugeStationMaster() {
    this.anotherSubscription = this._MasterService.GetRaingaugeStationMaster(true, 0).subscribe((res: any) => {
      this.RainGaugeData = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.RainGaugeData, "RaingaugeLocationID", item => `${item.RaingaugeLocationName}`);
    });
  }

  GetRainGaugeData() {
    this.anotherSubscription = this._MasterService.GetGatewayRaingaugeData(this.GatewayRaingaugeDataID, "", "").subscribe((res: any) => {
      const { Table } = res;
      this.GatewayRaingaugeList = Table[0];
      const TempModal: any = this.GatewayRaingaugeList;
      this.GatewayRaingaugeDataID = TempModal.GatewayRaingaugeDataID;
      this.RDatetime = this.datepipe.transform(TempModal.RDatetime, "yyyy-MM-dd")!;
      this.RaingaugeLocationID = TempModal.RaingaugeLocationID;
      this.GatewayMasterID = TempModal.GatewayMasterID;
      this.GatewayIMEI = TempModal.GatewayIMEI;
      this.Reading = TempModal.Reading;
      this.CurrentIP = TempModal.CurrentIP;
      this.IsPowerOn = TempModal.IsPowerOn;
      this.BetteryLevel = TempModal.BetteryLevel;
      this.SingleLevel = TempModal.SingleLevel;
      this.IsReal = TempModal.IsReal;
      this.PowerLevel = TempModal.PowerLevel;
    });
  }

  GetGatewayIMEI(data: any) {
    this.GatewayIMEI = data.GatewayIMEI;
  }

  ValidateDate() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.GatewayIMEI) {
      ErrMsg += "GatewayIMEI";
    }

    // if (!this.Reading) {
    //   ErrMsg += "Reading";
    // }

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
    if (!this.ValidateDate()) return;
    let FmData = new cls_GatewayRaingaugeData();
    FmData.RDatetime = this.RDatetime;
    FmData.GatewayMasterID = this.GatewayMasterID;
    // FmData.RaingaugeLocationID = this.RaingaugeLocationID;
    FmData.GatewayIMEI = this.GatewayIMEI;
    FmData.Reading = this.Reading;
    FmData.CurrentIP = this.CurrentIP;
    FmData.IsPowerOn = this.IsPowerOn;
    FmData.BetteryLevel = this.BetteryLevel;
    FmData.SingleLevel = this.SingleLevel;
    FmData.PowerLevel = this.PowerLevel;

    if (!this.IsEdit) {
      FmData.GatewayRaingaugeDataID = 0;
    } else {
      FmData.GatewayRaingaugeDataID = this.GatewayRaingaugeDataID;
    }

    this.anotherSubscription = this._MasterService.AddGatewayRainGaugeData(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}
interface DialogData {
  IsEdit: boolean;
  ID: number;
  GateWayraingaugeDataID: number;
  FromDate: Date;
  ToDate: Date;
}
