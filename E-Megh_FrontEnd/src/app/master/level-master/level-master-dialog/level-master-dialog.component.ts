import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { cls_LevelContactList, cls_levelMaster } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-level-master-dialog",
  templateUrl: "./level-master-dialog.component.html",
  styleUrls: ["./level-master-dialog.component.scss"],
})
export class LevelMasterDialogComponent extends UnSubscriber {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _MasterService: MasterService, public _GlobalService: GlobalService, private toastr: ToastrService, private _dialogRef: MatDialogRef<LevelMasterDialogComponent>) {
    super();

    this.dialogHandler(data);
  }

  LevelID: number = 0;
  LevelName: string = "";
  LevelHeightFrom: number = 0;
  LevelHeightTo: number = 0;
  ReadingLocationID: number = 0;
  IsSMS: boolean = false;
  SMSPeriod: number = 60; // Default to 60 minutes
  Remarks: string = "";
  IsActive: boolean = false;
  IsEdit: boolean = false;
  ReadingLocationList: any[] = [];
  ContactList: any[] = [];
  FilteredContactList: any[] = [];
  DesignationList: any[] = [];
  SelectedDesignation: string = "";
  ContactID: number = 0;
  ContactIDs: number[] = [];

  async dialogHandler(data: DialogData) {
    await this.GetReadingLocationMaster();
    await this.GetContactMaster();
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.LevelID = data.ID;
      await this.GetLevelViewData();
    }
  }

  async GetContactMaster() {
    try {
      const response = await this._MasterService.GetContactMaster(true, 0).toPromise();
      console.log("Raw API Response:", response);

      this.ContactList = JSON.parse(JSON.stringify(response))["Table"];
      console.log("Contact List:", this.ContactList);

      this.FilteredContactList = [...this.ContactList];

      // Extract unique designations
      const allDesignations = this.ContactList.map(item => item.Designation);
      console.log("All Designations:", allDesignations);

      this.DesignationList = [...new Set(allDesignations)]
        .filter(designation => designation) // Remove any empty/null designations
        .sort(); // Sort alphabetically

      console.log("Unique Designations:", this.DesignationList);

      this._GlobalService.dynamicInputSelect(this.FilteredContactList, "CID", item => `${item.ContactName} - ${item.Designation}`);
    } catch (error) {
      console.error("Error in GetContactMaster:", error);
    }
  }

  onDesignationChange() {
    if (this.SelectedDesignation) {
      this.FilteredContactList = this.ContactList.filter(contact => contact.Designation === this.SelectedDesignation);
    } else {
      this.FilteredContactList = [...this.ContactList];
    }
    // Reset contact selection when changing designation
    this.ContactID = 0;
  }

  GetReadingLocationMaster() {
    this.anotherSubscription = this._MasterService.GetReadingLocationMaster(true, 0).subscribe((res: any) => {
      this.ReadingLocationList = JSON.parse(JSON.stringify(res))["Table"];
      this._GlobalService.dynamicInputSelect(this.ReadingLocationList, "RLID", item => `${item.Name}`);
    });
  }

  GetLevelViewData() {
    this.anotherSubscription = this._MasterService.GetLevelMaster(false, this.LevelID).subscribe((res: any) => {
      const { Table } = res;
      const TempModal = Table[0][0];
      const LevelContactModel = Table[1] || [];
      const parseNumber = (value: any): number => {
        const num = value !== null && value !== undefined && !isNaN(+value) ? +value : null;
        return num !== null ? num : 0;
      };

      this.LevelName = TempModal.LevelName;
      this.LevelHeightFrom = parseNumber(TempModal.LevelHeightFrom);
      this.LevelHeightTo = parseNumber(TempModal.LevelHeightTo);
      this.IsSMS = TempModal.IsSMS;
      this.SMSPeriod = parseNumber(TempModal.SMSPeriod) || 60; // Set SMSPeriod from API or default to 60
      this.Remarks = TempModal.Remarks;
      this.ReadingLocationID = parseNumber(TempModal.ReadingLocationID);
      this.IsActive = TempModal.IsActive;
      this.ContactID = TempModal.ContactID;
      if (LevelContactModel && LevelContactModel.length) {
        LevelContactModel.forEach((element: any) => {
          this.ContactList.forEach(item => {
            if (item.CID === element.ContactID) {
              item.IsChipSelected = true;
            }
          });
        });
      }
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.LevelName) {
      ErrMsg += "Level Name is required";
    }

    if (this.LevelHeightFrom === null || this.LevelHeightFrom === undefined || this.LevelHeightFrom.toString() === "") {
      ErrMsg += "Level Height From is required";
    }

    if (this.LevelHeightTo === null || this.LevelHeightTo === undefined || this.LevelHeightTo.toString() === "") {
      ErrMsg += "Level Height To is required";
    }

    if (!this.ReadingLocationID) {
      ErrMsg += "Please select Reading Location ";
    }

    if (this.IsSMS && (!this.SMSPeriod || this.SMSPeriod < 1 || this.SMSPeriod > 1440)) {
      ErrMsg += "Please enter a valid SMS period between 1 and 1440 minutes.";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "Oops");
      Valid = false;
    }

    return Valid;
  }

  Submit() {
    let TempObject: any[] = [];

    if (!this.ValidateData()) return;
    const TempModal = new cls_levelMaster();
    TempModal.LevelID = this.LevelID;
    TempModal.LevelName = this.LevelName;
    TempModal.LevelHeightFrom = this.LevelHeightFrom;
    TempModal.LevelHeightTo = this.LevelHeightTo;
    TempModal.ReadingLocationID = this.ReadingLocationID;
    TempModal.IsSMS = this.IsSMS;
    TempModal.SMSPeriod = this.IsSMS ? this.SMSPeriod : undefined;
    TempModal.Remarks = this.Remarks;
    TempModal.IsActive = this.IsEdit ? this.IsActive : true;
    TempModal.CreatedBy = parseInt(sessionStorage.getItem("UID") || "0");
    TempModal.UpdatedBy = parseInt(sessionStorage.getItem("UID") || "0");
    TempModal.ContactID = this.ContactID;

    this.ContactList.forEach(element => {
      if (element.IsChipSelected) {
        const ContactModal = new cls_LevelContactList();
        ContactModal.ContactID = element.CID;
        TempObject.push(ContactModal);
      }
    });

    TempModal.LevelContactList = TempObject;
    this.anotherSubscription = this._MasterService.AddLevelMaster(TempModal).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}

interface DialogData {
  IsEdit: boolean;
  ID: number;
}
