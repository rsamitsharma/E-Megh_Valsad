import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ClsTalukaMaster } from "@source/app/_models";
import { MasterService } from "@source/app/_services";
import { ToastrService } from "ngx-toastr";
import { GlobalService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";

@Component({
  selector: "app-taluka-dialog",
  templateUrl: "./taluka-dialog.component.html",
  styleUrls: ["./taluka-dialog.component.scss"],
})
export class TalukaDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<TalukaDialogComponent>) {
    super();
    this.dialoghandler(data);
  }

  ngOnInit() {
    this.GetDistrictMaster();
  }

  // #region Variable
  IsEdit: boolean = false;
  TalukaName: string = "";
  gTalukaName: string = "";
  TalukaID: number = 0;
  Edit: boolean = false;
  IsActive: boolean = false;
  DistrictID?: number;
  DistrictList: any[] = [];
  // #endregion

  dialoghandler(data: Dialogdata) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.TalukaID = data.ID;
      this.GetTalukaData();
    }
  }

  GetDistrictMaster() {
    this.anotherSubscription = this._MasterService.GetDisctrictMaster(0).subscribe((res: any) => {
      console.log(res);

      this.DistrictList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.DistrictList, "DID", item => `${item.DistName}`);
    });
  }

  GetTalukaData() {
    this.anotherSubscription = this._MasterService.GetTalukaMaster(this.TalukaID).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

      const TempModal = Table[0];
      this.TalukaID = TempModal.TID;
      this.TalukaName = TempModal.TalukaName;
      // this.gTalukaName = TempModal.gTalukaName;
      this.DistrictID = TempModal.DistID;
      this.IsActive = TempModal.IsActive;
    });
  }

  GetDistrictData(data: any) {
    this.DistrictID = data.DistrictID;
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.TalukaName.trim()) {
      ErrMsg += "Please Enter User Type";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "error");
      Valid = false;
    }
    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new ClsTalukaMaster();
    FmData.TalukaName = this.TalukaName;
    // FmData.gTalukaName = this.gTalukaName;
    FmData.DistrictID = this.DistrictID;

    if (!this.TalukaID) {
      FmData.IsActive = true;
      FmData.TalukaID = 0;
    } else {
      FmData.TalukaID = this.TalukaID;
      FmData.IsActive = this.IsActive;
    }

    this.anotherSubscription = this._MasterService.AddTalukaMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}

interface Dialogdata {
  IsEdit: boolean;
  ID: number;
}
