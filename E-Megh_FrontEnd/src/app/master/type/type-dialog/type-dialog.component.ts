import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { GlobalService, MasterService } from "@source/app/_services";
import { ClsTypeMaster } from "@source/app/_models/master";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";

@Component({
  selector: "app-type-dialog",
  templateUrl: "./type-dialog.component.html",
  styleUrls: ["./type-dialog.component.scss"],
})
export class TypeDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<TypeDialogComponent>) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {}

  // #region Variable
  IsEdit: boolean = false;
  TypeID: number = 0;
  TypeName: string = "";
  // gTypeName: string = "";
  IsActive: boolean = false;
  // #endregion

  dialogHandler(data: Dialogdata) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.TypeID = data.ID;
      this.GetTypeData();
    }
  }

  GetTypeData() {
    this.anotherSubscription = this._MasterService.GetTypeMaster(false, this.TypeID).subscribe((res: any) => {
      const { Table } = res;
      const TempModal = Table[0];
      this.TypeID = TempModal.TypeID;
      this.TypeName = TempModal.TypeName;
      // this.gTypeName = TempModal.gTypeName;
      this.IsActive = TempModal.IsActive;
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.TypeName.trim()) {
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
    let FmData = new ClsTypeMaster();
    FmData.TypeName = this.TypeName;
    // FmData.gTypeName = this.gTypeName;

    if (!this.TypeID) {
      FmData.IsActive = true;
      FmData.TypeID = 0;
    } else {
      FmData.TypeID = this.TypeID;
      FmData.IsActive = this.IsActive;
    }

    this.anotherSubscription = this._MasterService.AddTypeMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}
interface Dialogdata {
  IsEdit: boolean;
  ID: number;
}
