import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { GlobalService, MasterService } from "@source/app/_services";
import { ClsUserTypeMaster } from "@source/app/_models";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";

@Component({
  selector: "app-user-type-dialog",
  templateUrl: "./user-type-dialog.component.html",
  styleUrls: ["./user-type-dialog.component.scss"],
})
export class UserTypeDialogComponent extends UnSubscriber {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<UserTypeDialogComponent>) {
    super();
    this.dialogHandler(data);
  }

  // #region Variable
  IsEdit: boolean = false;
  UserTypeId: number = 0;
  UserType: string = "";
  MunID?: number;
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.UserTypeId = data.ID;
      this.GetUserTypeData();
    }
  }

  GetUserTypeData() {
    this.anotherSubscription = this._MasterService.GetUserTypeMaster(this.UserTypeId).subscribe((res: any) => {
      const { Table } = res;
      const TempModal = Table[0][0];
      this.UserTypeId = TempModal.UserTypeId;
      this.UserType = TempModal.UserType;
      this.MunID = TempModal.MunID;
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.UserType.trim()) {
      ErrMsg += "Please Enter User Type";
    }

    if (ErrMsg) {
      this.toastr.error(ErrMsg, "Oops");
      Valid = false;
    }

    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new ClsUserTypeMaster();
    FmData.UserType = this.UserType;
    FmData.MunID = this.MunID;

    if (!this.UserTypeId) {
      FmData.UserTypeID = 0;
    } else {
      FmData.UserTypeID = this.UserTypeId;
    }

    this.anotherSubscription = this._MasterService.AddUserTypeMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}

interface DialogData {
  IsEdit: boolean;
  ID: number;
}
