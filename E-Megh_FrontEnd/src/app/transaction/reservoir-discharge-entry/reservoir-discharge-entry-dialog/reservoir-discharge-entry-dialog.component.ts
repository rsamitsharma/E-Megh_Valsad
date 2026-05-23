import { ReservoirDischargeEntryComponent } from "./../reservoir-discharge-entry.component";
import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { cls_ReservoirDischargeEntry } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-reservoir-discharge-entry-dialog",
  templateUrl: "./reservoir-discharge-entry-dialog.component.html",
  styleUrls: ["./reservoir-discharge-entry-dialog.component.scss"],
})
export class ReservoirDischargeEntryDialogComponent extends UnSubscriber implements OnInit {
  constructor(private datepipe: DatePipe, @Inject(MAT_DIALOG_DATA) public data: any, private _MasterService: MasterService, public _GlobalService: GlobalService, private toastr: ToastrService, private _dialogRef: MatDialogRef<ReservoirDischargeEntryDialogComponent>) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {
    this.GetReservoirMaster();
  }

  // #region Variable
  IsEdit: boolean = false;
  IsActive: boolean = false;
  ViewData: any;
  ReservoirDischargeEntryID: number = 0;
  ReservoirDischargeEntryDate: string = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  currentdate = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  ReservoirDischargeEntryTime: string = this.datepipe.transform(new Date(), "hh:mm")!;
  ReservoirID: number = 0;
  ReservoirList: any[] = [];
  TotalDischarge: number = 0;
  TotalTimetoReachedCapital?: number = 0;
  TotalInFlow: number = 0;
  GrossStorage: number = 0;
  IsSkip?: boolean;
  SkipReason: string = "";
  currentHeight: number = 0;
  // Remarks: string = "";
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    this.ReservoirID = data.ReservoirID;
    if (this.IsEdit) {
      this.ReservoirDischargeEntryID = data.ID;
      this.GetDischargeEntryData();
    }
  }

  GetReservoirMaster() {
    this.anotherSubscription = this._MasterService.GetReservoirMaster(true, 0).subscribe((res: any) => {
      this.ReservoirList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.ReservoirList, "ReservoirID", item => `${item.ReservoirName}`);
    });
  }

  GetDischargeEntryData() {
    this.anotherSubscription = this._MasterService.GetReservoirDischargeEntry(this.ReservoirID, this.ReservoirDischargeEntryID).subscribe((res: any) => {
      const { Table } = res;
      const TempModal = Table[0];
      this.ReservoirDischargeEntryID = TempModal.ReservoirDischargeEntryID;
      this.ReservoirID = TempModal.ReservoirID;
      this.ReservoirDischargeEntryDate = this.datepipe.transform(TempModal.ReservoirDischargeEntryDate, "yyyy-MM-dd")!;
      this.ReservoirDischargeEntryTime = TempModal.ReservoirDischargeEntryTime.split("T")[1].split(":").slice(0, 2).join(":");
      this.TotalDischarge = TempModal.TotalDischarge;
      this.TotalTimetoReachedCapital = TempModal.TotalTimetoReachedCapital;
      this.IsSkip = TempModal.IsSkip;
      this.SkipReason = TempModal.SkipReason;
      this.currentHeight = TempModal.CurrentHeight;
      this.TotalInFlow = TempModal.TotalInflow;
      this.GrossStorage = TempModal.GrossStorage;
      // this.Remarks = TempModal.Remarks;
      this.IsActive = TempModal.IsActive;
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.ReservoirDischargeEntryDate) {
      ErrMsg += "Enter Date";
    }

    if (!this.ReservoirDischargeEntryTime) {
      ErrMsg += "Enter Time";
    }

    if (this.TotalDischarge === null || this.TotalDischarge === undefined || this.TotalDischarge.toString() === "") {
      ErrMsg += "Total Discharge";
    }

    if (this.currentHeight === null || this.currentHeight === undefined || this.currentHeight.toString() === "") {
      ErrMsg += "Current Height";
    }

    if (ErrMsg) {
      this.toastr.error(ErrMsg, "Oops");
      Valid = false;
    }

    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    debugger;
    let FmData = new cls_ReservoirDischargeEntry();
    FmData.ReservoirDischargeEntryDate = this.datepipe.transform(this.ReservoirDischargeEntryDate, "yyyy-MM-dd")!;
    FmData.ReservoirDischargeEntryTime = this._GlobalService.convertToTime(this.ReservoirDischargeEntryTime);
    FmData.ReservoirID = this.ReservoirID;
    FmData.TotalDischarge = this.TotalDischarge;
    FmData.CurrentHeight = this.currentHeight;
    FmData.TotalInflow = this.TotalInFlow;
    FmData.GrossStorage = this.GrossStorage;
    FmData.TotalTimetoReachedCapital = this.TotalTimetoReachedCapital ? this.TotalTimetoReachedCapital : 0;
    FmData.SkipReason = this.SkipReason;
    FmData.CreatedBy = parseInt(sessionStorage.getItem("UID") || "0");
    // FmData.IsSkip = this.IsSkip;

    if (!this.IsEdit) {
      FmData.ReservoirDischargeEntryID = 0;
      FmData.IsActive = true;
    } else {  
      FmData.ReservoirDischargeEntryID = this.ReservoirDischargeEntryID;
      FmData.IsActive = this.IsActive;
    }
    console.log("FmData", FmData);
    this.anotherSubscription = this._MasterService.AddReservoirDischargeEntry(FmData).subscribe((res: any) => {
      console.log(res);
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}
interface DialogData {
  IsEdit: boolean;
  ID: number;
  ReservoirID: number;
}
