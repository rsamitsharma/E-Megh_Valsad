import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { cls_TidalData } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-tidal-data-dialog",
  templateUrl: "./tidal-data-dialog.component.html",
  styleUrls: ["./tidal-data-dialog.component.scss"],
})
export class TidalDataDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private datepipe: DatePipe, private _MasterService: MasterService, public _GlobalService: GlobalService, private toastr: ToastrService, private _dialogRef: MatDialogRef<TidalDataDialogComponent>) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {
    this.GetReadingLocation();
  }

  // #region Variable
  IsEdit: boolean = false;
  ViewData: any;
  TypeID: number = 0;
  TidalDataID?: number;
  ReadingLocationID: number = 0;
  LocationList: any[] = [];
  TID: number = 0;
  TType: number = 1;
  TypeList = [
    { id: 1, Name: "High" },
    { id: 2, Name: "Low" },
  ];
  TDate: string = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  currentdate = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  TTime: string = this.datepipe.transform(new Date(), "hh:mm")!;
  Height?: number;
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.ReadingLocationID = data.ReadingLocationID;
      this.TID = data.ID;
      this.GetTidalData();
    }
  }

  GetReadingLocation() {
    this.anotherSubscription = this._MasterService.GetReadingLocationMaster(true, 0).subscribe((res: any) => {
      this.LocationList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.LocationList, "RLID", item => `${item.Name}`);
      this._GlobalService.dynamicInputSelect(this.TypeList, "id", item => `${item.Name}`);
    });
  }

  GetTidalData() {
    this.anotherSubscription = this._MasterService.GetTidalData_Report(this.ReadingLocationID, this.TID).subscribe((res: any) => {
      const { Table } = res;
      const TempModal: any = Table[0];
      this.TID = TempModal.TID;
      this.ReadingLocationID = TempModal.ReadingLocationID;
      this.TDate = this.datepipe.transform(TempModal.TDate, "yyyy-MM-dd")!;
      this.TTime = TempModal.TTime.split("T")[1].split(":").slice(0, 2).join(":");
      this.TType = TempModal.TType;
      this.Height = TempModal.Height_MTR;
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.ReadingLocationID) {
      ErrMsg += "Select location ";
    }

    if (!this.TDate) {
      ErrMsg += "Date";
    }

    if (!this.TTime) {
      ErrMsg += "Time";
    }

    if (!this.TType) {
      ErrMsg += "Type ";
    }

    if (this.Height === null || this.Height === undefined || this.Height.toString() === "") {
      ErrMsg += "Height";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "Oops");
      Valid = false;
    }

    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new cls_TidalData();
    FmData.ReadingLocationID = this.ReadingLocationID;
    FmData.TDate = this.TDate;
    FmData.TType = this.TType;
    FmData.TTime = this._GlobalService.convertToTime(this.TTime);
    FmData.Height = this.Height;
    FmData.CreatedBy = parseInt(sessionStorage.getItem("UID") || "0");

    if (!this.IsEdit) {
      FmData.TidalDataID = 0;
    } else {
      FmData.TidalDataID = this.TID;
    }

    this.anotherSubscription = this._MasterService.AddTidalData(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}

interface DialogData {
  IsEdit: boolean;
  ID: number;
  ReadingLocationID: number;
}
