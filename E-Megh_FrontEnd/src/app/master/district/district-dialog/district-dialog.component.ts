import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { cls_DistrictMaster } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-district-dialog",
  templateUrl: "./district-dialog.component.html",
  styleUrls: ["./district-dialog.component.scss"],
})
export class DistrictDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<DistrictDialogComponent>) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {
    this.GetStateMaster();
  }

  // #region Variable
  IsEdit: boolean = false;
  DistrictName: string = "";
  // GDistrictName: string = "";
  DistrictID: number = 0;
  Edit: boolean = false;
  IsActive: boolean = false;
  StateID?: number;
  StateList: any[] = [];
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.DistrictID = data.ID;
      this.GetDistrictData();
    }
  }

  GetStateMaster() {
    this.anotherSubscription = this._MasterService.GetStateMaster(0).subscribe((res: any) => {
      console.log(res);

      this.StateList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.StateList, "SID", item => `${item.StateName}`);
    });
  }

  GetDistrictData() {
    this.anotherSubscription = this._MasterService.GetDisctrictMaster(this.DistrictID).subscribe((res: any) => {
      const { Table } = res;
      const TempModal = Table[0];
      this.DistrictID = TempModal.DID;
      this.DistrictName = TempModal.DistName;
      // this.GDistrictName = TempModal.GDistrictName;
      this.StateID = TempModal.StateID;
      this.IsActive = TempModal.IsActive;
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.DistrictName.trim()) {
      ErrMsg += "Please Enter District";
    }

    if (!this.StateID) {
      ErrMsg += "Please select State";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "error");
      Valid = false;
    }
    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new cls_DistrictMaster();
    FmData.DistrictName = this.DistrictName;
    // FmData.GDistrictName = this.GDistrictName;
    FmData.StateID = this.StateID;
    FmData.IsActive = this.IsActive;

    if (!this.DistrictID) {
      FmData.DistrictID = 0;
    } else {
      FmData.DistrictID = this.DistrictID;
    }

    this.anotherSubscription = this._MasterService.AddDistrictMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}
interface DialogData {
  IsEdit: boolean;
  ID: number;
}
