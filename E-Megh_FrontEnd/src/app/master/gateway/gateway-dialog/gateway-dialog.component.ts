import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ClsGatewayMaster } from "@source/app/_models/master";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-gateway-dialog",
  templateUrl: "./gateway-dialog.component.html",
  styleUrls: ["./gateway-dialog.component.scss"],
})
export class GatewayDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private datepipe: DatePipe, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<GatewayDialogComponent>) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {}

  // #region Variable
  IsEdit: boolean = false;
  IsActive: boolean = false;
  GatewayMasterID: number = 0;
  GatewayName: string = "";
  CompanyName: string = "";
  GatewayIMEI: string = "";
  Type: string = "";
  Warrenty: string = "";
  Remarks: string = "";
  PurchasedDate: string = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  InvoiceNo: string = "";
  Comments: string = "";
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.GatewayMasterID = data.ID;
      this.GetGatewayData();
    }
  }

  GetGatewayData() {
    this.anotherSubscription = this._MasterService.GetGatewayMaster(false, this.GatewayMasterID).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

      const TempModal = Table[0];
      this.GatewayMasterID = TempModal.FID;
      this.GatewayName = TempModal.FName;
      this.CompanyName = TempModal.CompanyName;
      this.GatewayIMEI = TempModal.GatewayIMEI;
      this.Type = TempModal.Type;
      this.Warrenty = TempModal.Warrenty;
      this.Remarks = TempModal.Remarks;
      this.PurchasedDate = this.datepipe.transform(TempModal.PurchasedDate, "yyyy-MM-dd")!;
      this.InvoiceNo = TempModal.InvoiceNo;
      this.Comments = TempModal.Comments;
      this.IsActive = TempModal.IsActive;
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.GatewayName.trim()) {
      ErrMsg += "Name ";
    }

    if (!this.CompanyName.trim()) {
      ErrMsg += "Company Name ";
    }

    // if (!this.GatewayIMEI.trim()) {
    //   ErrMsg += "GatewayIMEI ";
    // }

    if (!this.Type.trim()) {
      ErrMsg += "Type ";
    }

    if (!this.Warrenty.trim()) {
      ErrMsg += "Warrenty ";
    }

    if (!this.Remarks.trim()) {
      ErrMsg += "Remarks ";
    }

    if (!this.Comments.trim()) {
      ErrMsg += "Comments ";
    }

    if (!this.InvoiceNo) {
      ErrMsg += "Invoice no. ";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "Oops");
      Valid = false;
    }

    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new ClsGatewayMaster();
    FmData.GatewayName = this.GatewayName;
    FmData.CompanyName = this.CompanyName;
    // FmData.GatewayIMEI = this.GatewayIMEI;
    FmData.Type = this.Type;
    FmData.Warrenty = this.Warrenty;
    FmData.Remarks = this.Remarks;
    FmData.PurchasedDate = this.PurchasedDate;
    FmData.Comments = this.Comments;
    FmData.InvoiceNo = this.InvoiceNo;

    if (!this.IsEdit) {
      FmData.IsActive = true;
      FmData.GatewayMasterID = 0;
    } else {
      FmData.IsActive = this.IsActive;
      FmData.GatewayMasterID = this.GatewayMasterID;
    }

    this.anotherSubscription = this._MasterService.AddGatewayMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}

interface DialogData {
  IsEdit: boolean;
  ID: number;
}
