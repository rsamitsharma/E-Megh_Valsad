import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { GlobalService, MasterService } from "@source/app/_services";
import { ClsVillageMaster } from "@source/app/_models/master";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { MapDialogComponent } from "@source/app/_shared/map-dialog/map-dialog.component";

@Component({
  selector: "app-village-dialog",
  templateUrl: "./village-dialog.component.html",
  styleUrls: ["./village-dialog.component.scss"],
})
export class VillageDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _GlobalService: GlobalService, private toastr: ToastrService, private _MasterService: MasterService, private _dialogRef: MatDialogRef<VillageDialogComponent>, private dialog: MatDialog) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {
    this.GetReadingLocationList();
    this.GetTalukaList();
  }

  // #region Variable
  IsEdit: boolean = false;
  IsActive: boolean = false;
  VillageID: number = 0;
  VillageName: string = "";
  Remarks: string = "";
  ReadingLocationID?: number;
  ReadingLocationList: any[] = [];
  TalukaID?: number;
  TalukaList: any[] = [];
  Latitude?: number;
  Longitude?: number;
  Altitude?: number;
  SFNo?: number;
  Location: string = "";
  VillageMapData: any[] = [];
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.VillageID = data.ID;
      this.GetVillageData();
    }
  }

  GetVillageData() {
    this.anotherSubscription = this._MasterService.GetVillageMaster(false, this.VillageID).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

      const TempModal = Table[0];
      this.ReadingLocationID = TempModal.ReadingLocationID;
      this.TalukaID = TempModal.TID;
      this.VillageName = TempModal.VillageName;
      this.Latitude = TempModal.Latitude;
      this.Longitude = TempModal.Longitude;
      this.Altitude = TempModal.Altitude;
      this.Remarks = TempModal.Remarks;
      this.IsActive = TempModal.IsActive;
      this.VillageMapData = TempModal;
    });
  }

  GetReadingLocationList() {
    this.anotherSubscription = this._MasterService.GetReadingLocationMaster(true, 0).subscribe((res: any) => {
      const { Table } = res;
      this.ReadingLocationList = Table;
      this._GlobalService.dynamicInputSelect(this.ReadingLocationList, "RLID", items => items.Name);
    });
  }

  GetTalukaList() {
    this.anotherSubscription = this._MasterService.GetTalukaMaster(0).subscribe((res: any) => {
      const { Table } = res;
      this.TalukaList = Table;
      this._GlobalService.dynamicInputSelect(this.TalukaList, "TID", items => items.TalukaName);
    });
  }

  OpenMap() {
    const dialogconfig = new MatDialogConfig();
    this._GlobalService.matDialogDefaultConfig(dialogconfig);
    dialogconfig.width = "100%";
    dialogconfig.data = {
      IsDashboard: false,
      arrayForDialog: this.VillageMapData,
    };
    
    
    const dialogref = this.dialog.open(MapDialogComponent, dialogconfig);
    dialogref.afterClosed().subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.Location = res.address;
        this.Longitude = res.lng;
        this.Latitude = res.lat;
        this.Altitude = res.altitude;
      }
    });
  }

  ValidateData() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.ReadingLocationID) {
      ErrMsg += "Select Location ";
    }

    if (!this.TalukaID) {
      ErrMsg += "Select Taluka ";
    }

    if (!this.VillageName?.trim()) {
      ErrMsg += "VillageName ";
    }

    if (!this.Latitude) {
      ErrMsg += "Latitude ";
    }

    if (!this.Longitude) {
      ErrMsg += "Longitude ";
    }

    if (!this.Altitude) {
      ErrMsg += "Altitude ";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "error");
      Valid = false;
    }
    return Valid;
  }

  Submit() {
    if (!this.ValidateData()) return;
    let FmData = new ClsVillageMaster();
    FmData.ReadingLocationID = this.ReadingLocationID;
    FmData.TalukaID = this.TalukaID;
    FmData.VillageName = this.VillageName;
    FmData.Latitude = this.Latitude;
    FmData.Longitude = this.Longitude;
    FmData.Altitude = this.Altitude;
    FmData.Remarks = this.Remarks;
    FmData.CreatedBy = parseInt(sessionStorage.getItem("UID") || "0");
    if (!this.IsEdit) {
      FmData.VillageID = this.VillageID;
      FmData.IsActive = true;
    } else {
      FmData.VillageID = this.VillageID;
      FmData.IsActive = this.IsActive;
    }
    this.anotherSubscription = this._MasterService.AddVillageMaster(FmData).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}
interface DialogData {
  IsEdit: boolean;
  ID: number;
}
