import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ClsSIMMaster } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sim-dialog",
  templateUrl: "./sim-dialog.component.html",
  styleUrls: ["./sim-dialog.component.scss"],
})
export class SimDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<SimDialogComponent>, private datepipe: DatePipe) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {}

  // #region Variable
  IsEdit: boolean = false;
  IsActive: boolean = false;
  SIMID: number = 0;
  CompanyName: string = "";
  PhoneNo: string = "";
  TariffPlan: string = "";
  BillCycle: string = "";
  SIMNo: string = "";
  LastDate: string = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  isPrepaid?: boolean;
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.SIMID = data.ID;
      this.GetSimData();
    }
  }

  GetSimData() {
    this.anotherSubscription = this._MasterService.GetSimMaster(false, this.SIMID).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

      const TempModal = Table[0];
      this.SIMID = TempModal.SID;
      this.CompanyName = TempModal.CompanyName;
      this.PhoneNo = TempModal.PhoneNo;
      this.TariffPlan = TempModal.TariffPlan;
      this.BillCycle = TempModal.BillCycle;
      this.SIMNo = TempModal.SIMNo;
      this.LastDate = this.datepipe.transform(TempModal.LastDate, "yyyy-MM-dd")!;
      this.isPrepaid = TempModal.isPrepaid;
      this.IsActive = TempModal.IsActive;
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.PhoneNo) {
      ErrMsg += "Phone no. ";
    }

    if (!this.CompanyName.trim()) {
      ErrMsg += "Company Name ";
    }

    if (!this.TariffPlan.trim()) {
      ErrMsg += "TariffPlan ";
    }

    if (!this.BillCycle.trim()) {
      ErrMsg += "BillCycle ";
    }

    if (!this.SIMNo.trim()) {
      ErrMsg += "SIM no. ";
    }

    if (!this.LastDate) {
      ErrMsg += "LastDate ";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "Oops");
      Valid = false;
    }
    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new ClsSIMMaster();
    FmData.PhoneNo = this.PhoneNo.toString();
    FmData.CompanyName = this.CompanyName;
    FmData.TariffPlan = this.TariffPlan;
    FmData.BillCycle = this.BillCycle;
    FmData.SIMNo = this.SIMNo;
    FmData.LastDate = this.LastDate;
    FmData.isPrepaid = this.isPrepaid;
    FmData.CreatedBy = parseInt(sessionStorage.getItem("UID") || "0");

    if (!this.IsEdit) {
      FmData.IsActive = true;
      FmData.SIMID = 0;
    } else {
      FmData.IsActive = this.IsActive;
      FmData.SIMID = this.SIMID;
    }

    this.anotherSubscription = this._MasterService.AddSimMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.messge, "Success");
      this._dialogRef.close(true);
    });
  }
}
interface DialogData {
  IsEdit: boolean;
  ID: number;
}
