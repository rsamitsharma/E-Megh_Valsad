import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { cls_GatewaySirenData } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-gateway-siron-data-dialog",
  templateUrl: "./gateway-siron-data-dialog.component.html",
  styleUrls: ["./gateway-siron-data-dialog.component.scss"],
})
export class GatewaySironDataDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private datepipe: DatePipe, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<GatewaySironDataDialogComponent>, public _GlobalService: GlobalService) {
    super();
    this.IsEdit = data.Edit;
    this.dialogHandler(data);
  }

  ngOnInit() {
    this.GetSirenLocationData();
    this.GetGatewayIMEIData();
  }

  // #region Variable
  IsEdit: boolean = false;
  FromDate: string = "";
  ToDate: string = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  GatewaySirenDataID: number = 0;
  GatewayIMEI?: number;
  currentdate = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  RDatetime = this.datepipe.transform(this.currentdate, "yyyy-MM-dd")!;
  CurrentIP: string = "";
  IsPowerOn?: boolean;
  BetteryLevel?: number;
  SingleLevel?: number;
  PowerLevel?: number;
  SirenLocationID: number = 0;
  SirenLocationList: any[] = [];
  GatewayIMEIList: any[] = [];
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.GatewaySirenDataID = data.ID;
      this.FromDate = this.datepipe.transform(data.FromDate, "yyyy-MM-dd")!;
      this.ToDate = this.datepipe.transform(data.ToDate, "yyyy-MM-dd")!;
      this.GetGatewaySirenData();
    }
  }

  GetGatewaySirenData() {
    this.anotherSubscription = this._MasterService.GetGatewaySirenData(this.GatewaySirenDataID, this.FromDate, this.ToDate).subscribe((res: any) => {
      const { Table } = res;
      const TempModal: any = Table[0];
      this.GatewaySirenDataID = TempModal.GatewaySirenDataID;
      this.GatewayIMEI = TempModal.GatewayIMEI;
      this.SirenLocationID = TempModal.SirenLocationID;
      this.RDatetime = this.datepipe.transform(TempModal.RDateTime, "yyyy-MM-dd")!;
      this.CurrentIP = TempModal.CurrentIP;
      this.BetteryLevel = TempModal.BetteryLevel;
      this.SingleLevel = TempModal.SingleLevel;
      this.PowerLevel = TempModal.PowerLevel;
      this.IsPowerOn = TempModal.IsPowerOn;
    });
  }

  GetSirenLocationData() {
    this._MasterService.GetSirenLocationMaster(true, 0).subscribe((res: any) => {
      this.SirenLocationList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.SirenLocationList, "SirenLocationID", item => `${item.SirenLocationName}`);
    });
  }

  GetGatewayIMEIData() {
    this._MasterService.GetGatewayMaster(true, 0).subscribe((res: any) => {
      this.GatewayIMEIList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.GatewayIMEIList, "GatewayIMEI", item => `${item.GatewayName}`);
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.GatewayIMEI) {
      ErrMsg += "GatewayIMEI";
    }

    if (!this.RDatetime) {
      ErrMsg += "Date";
    }

    if (!this.CurrentIP) {
      ErrMsg += "Current IP";
    }

    if (!this.BetteryLevel) {
      ErrMsg += "Battery level";
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
    let FmData = new cls_GatewaySirenData();
    FmData.GatewayIMEI = this.GatewayIMEI;
    FmData.RDateTime = this.RDatetime;
    FmData.CurrentIP = this.CurrentIP;
    FmData.BetteryLevel = this.BetteryLevel;
    FmData.SingleLevel = this.SingleLevel;
    FmData.PowerLevel = this.PowerLevel;
    FmData.IsPowerOn = this.IsPowerOn;
    FmData.SirenLocationID = this.SirenLocationID;

    if (!this.IsEdit) {
      FmData.GatewaySirenDataID = 0;
      this.anotherSubscription = this._MasterService.AddGatewaySirenData(FmData).subscribe((res: any) => {
        this.toastr.success(res.message, "Success");
        this._dialogRef.close(true);
      });
    }
  }
}

interface DialogData {
  IsEdit: boolean;
  ID: number;
  GatewaySirenDataID: number;
  FromDate: Date;
  ToDate: Date;
}
