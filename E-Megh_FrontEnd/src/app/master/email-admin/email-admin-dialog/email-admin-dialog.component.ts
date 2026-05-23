import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ClsEMailAdminMaster } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-email-admin-dialog",
  templateUrl: "./email-admin-dialog.component.html",
  styleUrls: ["./email-admin-dialog.component.scss"],
})
export class EmailAdminDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<EmailAdminDialogComponent>) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {}

  // #region Variable
  IsEdit: boolean = false;
  IsActive: boolean = false;
  RID: number = 0;
  MName: string = "";
  mShortName: string = "";
  EmailID: string = "";
  CommEmailID: string = "";
  HostName: string = "";
  PortNumber?: number;
  SSN?: boolean;
  Password: string = "";
  IsEmailActive?: boolean;
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.RID = data.ID;
      if (this.RID) {
        this.GetEmailAdminData();
      }
    }
  }

  GetEmailAdminData() {
    this.anotherSubscription = this._MasterService.GetEmailAdminMaster(false, this.RID).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

      const TempModal = Table[0][0];
      this.RID = TempModal.RID;
      this.MName = TempModal.MName;
      this.mShortName = TempModal.mShortName;
      this.EmailID = TempModal.EmailID;
      this.CommEmailID = TempModal.CommEmailID;
      this.HostName = TempModal.HostName;
      this.PortNumber = TempModal.PortNumber;
      this.SSN = TempModal.SSN;
      this.Password = TempModal.Password;
      this.IsEmailActive = TempModal.IsEmailActive;
      this.IsActive = TempModal.IsActive;
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.MName.trim()) {
      ErrMsg += "Name ";
    }

    if (!this.mShortName.trim()) {
      ErrMsg += "Short Name  ";
    }

    if (!this.EmailID.trim()) {
      ErrMsg += "Email ";
    } else if (!this._GlobalService.validateEmail(this.EmailID)) {
      ErrMsg += "Enter Valid Email ";
    }

    if (!this.CommEmailID.trim()) {
      ErrMsg += "Common EmailID";
    }

    if (!this.HostName.trim()) {
      ErrMsg += "HostName ";
    }

    if (!this.PortNumber) {
      ErrMsg += "PortNumber ";
    }

    if (!this.Password) {
      ErrMsg += "Password ";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "error");
      Valid = false;
    }
    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new ClsEMailAdminMaster();
    FmData.RID = 0;
    FmData.MName = this.MName;
    FmData.mShortName = this.mShortName;
    FmData.CommEmailID = this.CommEmailID;
    FmData.EmailID = this.EmailID;
    FmData.HostName = this.HostName;
    FmData.PortNumber = this.PortNumber?.toString();
    FmData.SSN = this.SSN;
    FmData.Password = this.Password;
    FmData.IsEmailActive = this.IsEmailActive;

    if (!this.IsEdit) {
      this.RID = 0;
      FmData.IsActive = true;
    } else {
      FmData.RID = this.RID;
      FmData.IsActive = this.IsActive;
    }
    console.log(FmData);

    this.anotherSubscription = this._MasterService.AddEmailAdminMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}
interface DialogData {
  IsEdit: boolean;
  ID: number;
}
