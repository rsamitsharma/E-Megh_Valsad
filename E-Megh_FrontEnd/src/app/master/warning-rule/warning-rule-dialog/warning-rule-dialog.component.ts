import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { GlobalService, MasterService } from "@source/app/_services";
import { ClsWarningRuleMaster, Cls_WarningRuleFinalData } from "@source/app/_models/master";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";

@Component({
  selector: "app-warning-rule-dialog",
  templateUrl: "./warning-rule-dialog.component.html",
  styleUrls: ["./warning-rule-dialog.component.scss"],
})
export class WarningRuleDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<WarningRuleDialogComponent>) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {
    this.GetVillageMaster();
    this.GetReadingLocationMaster();
    this.GetDangerCategoryMaster();
  }

  // #region Variable
  IsEdit: boolean = false;
  IsActive: boolean = false;
  WarningRuleMasterID: number = 0;
  ReadingLocationID?: number;
  LocationList: any[] = [];
  VillageID: number = 0;
  VillageList: any[] = [];
  DangerCategoryID: number = 0;
  DangercategoryList: any[] = [];
  WaterLowerLevel?: number;
  WaterHigherLevel?: number;
  AutoSMS?: boolean;
  AutoEMail?: boolean;
  FilteredList: any[] = [];
  Color?: string;
  DangerCategoryName?: string;
  WarningRuleData: any[] = [];
  visible: boolean = false;
  FinalData: any[] = [];
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.WarningRuleMasterID = data.ID;
      this.GetWarningRuleMasterData();
    }
  }

  GetVillageMaster() {
    this.anotherSubscription = this._MasterService.GetVillageMaster(true, 0).subscribe((res: any) => {
      console.log(res);

      this.VillageList = JSON.parse(JSON.stringify(res["Table"]));
      this.FilteredList = this.VillageList;
      this._GlobalService.dynamicInputSelect(this.VillageList, "VID", item => `${item.VillageName}`);
    });
  }

  GetReadingLocationMaster() {
    this.anotherSubscription = this._MasterService.GetReadingLocationMaster(true, 0).subscribe((res: any) => {
      this.LocationList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.LocationList, "RLID", item => `${item.Name}`);
    });
  }

  GetDangerCategoryMaster() {
    this.anotherSubscription = this._MasterService.GetDangerCategoryMaster(true, 0).subscribe((res: any) => {
      this.DangercategoryList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.DangercategoryList, "DID", item => `${item.DangerCategoryName}`);
      this.DangercategoryList.map(items => {
        items.lowerWaterLevel = 0;
        items.higherWaterLevel = 0;
        items.autoSMS = false;
        items.autoEmail = false;
        return items;
      });
    });
  }

  GetWarningRuleMasterData() {
    this.anotherSubscription = this._MasterService.GetWarningRuleMaster(false, this.WarningRuleMasterID).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

      const TempModal = Table[0];
      this.WarningRuleMasterID = TempModal.WID;
      this.ReadingLocationID = TempModal.ReadingLocationID;
      this.VillageID = TempModal.VID;
      this.DangerCategoryID = TempModal.DID;
      this.WaterLowerLevel = TempModal.WaterLowerLevel;
      this.WaterHigherLevel = TempModal.WaterHigerLevel;
      this.AutoSMS = TempModal.AutoSMS;
      this.AutoEMail = TempModal.AutoEMail;
      this.IsActive = TempModal.IsActive;
    });
  }

  GetWarningRuleData() {
    this.visible = true;
    this.WarningRuleData.push(this.DangercategoryList);
  }

  GetVillage() {
    this.VillageList = this.FilteredList.filter(items => items.ReadingLocationID == this.ReadingLocationID);
    this.FilteredList.reverse();
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.ReadingLocationID) {
      ErrMsg += "Select Location";
    }

    if (!this.VillageID) {
      ErrMsg += "Select Village";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "error");
      Valid = false;
    }
    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new ClsWarningRuleMaster();
    if (!this.IsEdit) {
      this.WarningRuleData[0].forEach((element: any) => {
        let FmData = new ClsWarningRuleMaster();
        FmData.ReadingLocationID = this.ReadingLocationID;
        FmData.VillageID = this.VillageID;
        FmData.DangerCategoryID = element.DID;
        FmData.WaterLowerLevel = element.lowerWaterLevel;
        FmData.WaterHigerLevel = element.higherWaterLevel;
        FmData.AutoSMS = element.autoSMS;
        FmData.AutoEMail = element.autoEmail;
        this.WarningRuleMasterID = 0;
        FmData.IsActive = true;
        this.FinalData.push(FmData);
      });
    } else {
      FmData.WarningRuleMasterID = this.WarningRuleMasterID;
      FmData.ReadingLocationID = this.ReadingLocationID;
      FmData.VillageID = this.VillageID;
      FmData.DangerCategoryID = this.DangerCategoryID;
      FmData.WaterLowerLevel = this.WaterLowerLevel;
      FmData.WaterHigerLevel = this.WaterHigherLevel;
      FmData.AutoSMS = this.AutoSMS;
      FmData.AutoEMail = this.AutoEMail;
      FmData.IsActive = this.IsActive;
      this.FinalData.push(FmData);
    }
    const FinalData = new Cls_WarningRuleFinalData();
    FinalData.Details = this.FinalData;
    console.log(this.FinalData);

    this._MasterService.AddWarningRuleMaster(FinalData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}

interface DialogData {
  IsEdit: boolean;
  ID: number;
}
