import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ClsContactMaster } from "@source/app/_models/master";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-contacts-dialog",
  templateUrl: "./contacts-dialog.component.html",
  styleUrls: ["./contacts-dialog.component.scss"],
})
export class ContactsDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<ContactsDialogComponent>) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {
    this.GetVillageMaster();
  }

  // #region Variable
  IsEdit: boolean = false;
  IsActive?: boolean = false;
  ContactID: number = 0;
  ContactName: string = "";
  // gContactName: string = "";
  Designation: string = "";
  Mobile: string = "";
  Email: string = "";
  Remarks: string = "";
  DistrictList: any[] = [];
  VillageID?: number;
  FilteredList: any[] = [];
  VillageList: any[] = [];
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.ContactID = data.ID;
      this.GetContactData();
    }
  }

  GetContactData() {
    this.anotherSubscription = this._MasterService.GetContactMaster(false, this.ContactID).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

      const TempModal = Table[0];
      this.ContactID = TempModal.CID;
      this.ContactName = TempModal.ContactName;
      this.Designation = TempModal.Designation;
      this.Mobile = TempModal.MobileNo.toString();
      this.Email = TempModal.EMail;
      this.Remarks = TempModal.Remarks;
      this.VillageID = TempModal.VillageID;
      this.IsActive = TempModal.IsActive;
    });
  }
  GetVillageMaster() {
    this.anotherSubscription = this._MasterService.GetVillageMaster(true, 0).subscribe((res: any) => {
      console.log(res);
      this.VillageList = JSON.parse(JSON.stringify(res["Table"]));
      this.FilteredList = this.VillageList;
      this._GlobalService.dynamicInputSelect(this.VillageList, "VID", item => `${item.VillageName}`);
    });
  }

  GetDistrictMaster() {
    this.anotherSubscription = this._MasterService.GetDisctrictMaster(0).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

      this.DistrictList = Table;
      this._GlobalService.dynamicInputSelect(this.DistrictList, "DID", item => `${item.DistName}`);
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.ContactName?.trim()) {
      ErrMsg += "Contact Name ";
    }

    if (!this.Designation?.trim()) {
      ErrMsg += "Designation ";
    }

    // if (!this.Mobile) {
    //   ErrMsg += "Mobile Number ";
    // }

    // if (!this.Email.trim()) {
    //   ErrMsg += "Email ";
    // } else if (!this._GlobalService.validateEmail(this.Email)) {
    //   ErrMsg += "Enter Valid Email ";
    // }

    // if (!this.VillageID) {
    //   ErrMsg += "Select District";
    // }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "error");
      Valid = false;
    }
    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new ClsContactMaster();
    FmData.ContactName = this.ContactName;
    // FmData.gContactName = this.gContactName;
    FmData.Designation = this.Designation;
    FmData.MobileNo = this.Mobile.toString();
    FmData.EMail = this.Email;
    FmData.Remarks = this.Remarks;
    FmData.VillageID = this.VillageID;

    if (!this.IsEdit) {
      FmData.IsActive = true;
      FmData.ContactID = 0;
    } else {
      FmData.IsActive = this.IsActive;
      FmData.ContactID = this.ContactID;
    }

    this.anotherSubscription = this._MasterService.AddContactMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}
interface DialogData {
  IsEdit: boolean;
  ID: number;
}
