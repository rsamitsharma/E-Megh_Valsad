import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ClsStateMaster } from "@source/app/_models";
import { MasterService } from "@source/app/_services";
import { ToastrService } from "ngx-toastr";
import { GlobalService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";

@Component({
  selector: "app-state-dialog",
  templateUrl: "./state-dialog.component.html",
  styleUrls: ["./state-dialog.component.scss"],
})
export class StateDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<StateDialogComponent>) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {}

  // #region Variable
  IsEdit: boolean = false;
  StateName: string = "";
  // gStateName: string = "";
  StateID: number = 0;
  Edit: boolean = false;
  IsActive: boolean = false;
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.StateID = data.ID;
      this.GetStateData();
    }
  }

  GetStateData() {
    this.anotherSubscription = this._MasterService.GetStateMaster(this.StateID).subscribe((res: any) => {
      const { Table } = res;
      const TempModal = Table[0];
      this.StateID = TempModal.SID;
      this.StateName = TempModal.StateName;
      this.IsActive = TempModal.IsActive;
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.StateName.trim()) {
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
    let FmData = new ClsStateMaster();
    FmData.StateName = this.StateName;
    // FmData.GStateName = this.gStateName;

    if (!this.IsEdit) {
      FmData.IsActive = true;
      FmData.StateID = 0;
    } else {
      FmData.StateID = this.StateID;
      FmData.IsActive = this.IsActive;
    }

    this.anotherSubscription = this._MasterService.AddStateMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Suucess");
      this._dialogRef.close(true);
    });
  }
}
interface DialogData {
  IsEdit: boolean;
  ID: number;
}
