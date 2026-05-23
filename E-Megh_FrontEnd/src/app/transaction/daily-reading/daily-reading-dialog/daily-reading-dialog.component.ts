import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { cls_DailyReadingRecord } from "@source/app/_models";
import { MasterService, GlobalService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-daily-reading-dialog",
  templateUrl: "./daily-reading-dialog.component.html",
  styleUrls: ["./daily-reading-dialog.component.scss"],
})
export class DailyReadingDialogComponent extends UnSubscriber implements OnInit {
  constructor(public datepipe: DatePipe, @Inject(MAT_DIALOG_DATA) public data: any, private _MasterService: MasterService, public _GlobalService: GlobalService, private toastr: ToastrService, private _dialogRef: MatDialogRef<DailyReadingDialogComponent>) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {
    this.GetReadingLocationMaster();
  }

  // #region Variable
  IsEdit: boolean = false;
  DRID?: number;
  FromDate = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  ToDate = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  EDate: string = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  currentdate = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  ETime: string = this.datepipe.transform(new Date(), "hh:mm")!;
  WaterLevel?: number;
  DangerWaterLevel?: number;
  MinWaterLevel?: number;
  MaxWaterLevel?: number;
  ReadingLocationID: number = 0;
  ReadingLocationName: string = "";
  ReadingLocationList: any[] = [];
  ReadBy: string = "";
  Trend: string = "";
  Remarks: string = "";
  DailyreadingData: any[] = [];
  DailyReadingID: number = 0;
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.DRID = data.ID;
      this.DailyReadingID = data.ID;
      this.FromDate = this.datepipe.transform(data.FromDate, "yyyy-MM-dd")!;
      this.ToDate = this.datepipe.transform(data.ToDate, "yyyy-MM-dd")!;
      this.ReadingLocationID = data.ReadingLocationID;
      this.GetDailyReading();
    }
  }

  GetReadingLocationMaster() {
    this.anotherSubscription = this._MasterService.GetReadingLocationMaster(true, 0).subscribe((res: any) => {
      this.ReadingLocationList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.ReadingLocationList, "RLID", item => `${item.Name}`);
    });
  }

  GetDailyReading() {
    this.anotherSubscription = this._MasterService.GetDailyReadingDataReport(this.ReadingLocationID, this.DailyReadingID).subscribe((res: any) => {
      const { Table } = res;
      console.log(Table);
      this.DailyreadingData = Table;
      const TempModal: any = this.DailyreadingData.filter((item: any) => item.DRID === this.DRID)[0];
      this.DRID = TempModal.DRID;
      // this.DistrictID = TempModal.DistrictID;
      this.EDate = this.datepipe.transform(TempModal.Edate, "yyyy-MM-dd")!;
      this.ETime = TempModal.EDateTime.split(" ")[1];
      this.ReadBy = TempModal.ReadBy;
      this.ReadingLocationName = TempModal.Name;
      this.WaterLevel = TempModal.WaterLevel;
      
      this.Trend = TempModal.Trend;
      this.Remarks = TempModal.Remarks;
      this.DangerWaterLevel = TempModal.DangerWaterLevel;
      this.MinWaterLevel = TempModal.MinWaterLevel;
      this.MaxWaterLevel = TempModal.MaxWaterLevel;
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.EDate) {
      ErrMsg += "Date";
    }

    if (!this.ETime) {
      ErrMsg += "Time";
    }

    if (this.WaterLevel === null || this.WaterLevel === undefined || this.WaterLevel.toString() === "") {
      ErrMsg += "Water Level";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "Oops");
      Valid = false;
    }

    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new cls_DailyReadingRecord();
    FmData.EDATE = this.datepipe.transform(this.EDate, "yyyy-MM-dd")!;
    FmData.ETIME = this._GlobalService.convertToTime(this.ETime);
    FmData.WATERLEVEL = this.WaterLevel;
    FmData.TREND = this.Trend;
    FmData.READBY = this.ReadBy;
    FmData.READINGLID = this.ReadingLocationID;
    FmData.REMARKS = this.Remarks;
    FmData.DANGERWATERLEVEL = this.DangerWaterLevel;
    FmData.MINWATERLEVEL = this.MinWaterLevel;
    FmData.MAXWATERLEVEL = this.MaxWaterLevel;

    if (!this.IsEdit) {
      FmData.DRID = 0;
    } else {
      FmData.DRID = this.DRID;
    }

    this.anotherSubscription = this._MasterService.AddDailyReading(FmData).subscribe((res: any) => {
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
