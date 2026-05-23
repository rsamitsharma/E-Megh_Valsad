import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ClsMenuMaster } from "@source/app/_models/master";
import { GlobalService, MasterService } from "@source/app/_services";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-menu-dialog",
  templateUrl: "./menu-dialog.component.html",
  styleUrls: ["./menu-dialog.component.scss"],
})
export class MenuDialogComponent extends UnSubscriber implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _MasterService: MasterService, private toastr: ToastrService, private _dialogRef: MatDialogRef<MenuDialogComponent>, public _GlobalService: GlobalService) {
    super();
    this.dialogHandler(data);
  }

  ngOnInit() {}

  // #region Variable
  IsEdit: boolean = false;
  MenuID: number = 0;
  ParentMenuID?: number;
  MenuName?: string = "";
  MenuCaption: string = "";
  RouterPath?: string;
  iOrder?: number;
  IsActive?: boolean;
  MenuList: any[] = [];
  // #endregion

  dialogHandler(data: DialogData) {
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.MenuID = data.ID;
      this.GetMenuData();
    }
  }

  GetMenuData() {
    this.anotherSubscription = this._MasterService.GetMenuMaster().subscribe((res: any) => {
      const { Table } = res;
      this.MenuList = Table;
      const TempModal: any = this.MenuList.filter(item => item.MenuID === this.MenuID);
      this.MenuID = TempModal[0].MenuID || 0;
      this.ParentMenuID = TempModal[0].ParentMenuID || 0;
      this.MenuName = TempModal[0].MenuName || "";
      this.MenuCaption = TempModal[0].MenuCaption || "";
      this.RouterPath = TempModal[0].RouterPath;
      this.iOrder = TempModal[0].iOrder || 0;
      this.IsActive = TempModal[0].IsActive;
    });
  }

  ValidateForm() {
    let ErrMsg: string = "";
    let isValid: boolean = true;

    if (!this.ParentMenuID) {
      ErrMsg += "Parent Menu ID is required . ";
    }

    if (!this.MenuName) {
      ErrMsg += "Menu Name is required . ";
    }

    if (!this.RouterPath) {
      ErrMsg += "Router Path is required . ";
    }

    if (!this.iOrder) {
      ErrMsg += "iOrder is required . ";
    }

    if (ErrMsg) {
      this.toastr.error(ErrMsg, "Oops");
      isValid = false;
    }

    return isValid;
  }

  Submit() {
    if (!this.ValidateForm()) return;
    const TempModal = new ClsMenuMaster();
    TempModal.ParentMenuID = this.ParentMenuID;
    TempModal.MenuCaption = this.MenuCaption;
    TempModal.MenuName = this.MenuName;
    TempModal.RouterPath = this.RouterPath;
    TempModal.iOrder = this.iOrder;
    if (!this.IsEdit) {
      TempModal.MenuID = 0;
      TempModal.IsActive = true;
    } else {
      TempModal.MenuID = this.MenuID;
      TempModal.IsActive = this.IsActive;
    }

    this.anotherSubscription = this._MasterService.AddMenuMaster(TempModal).subscribe((res: any) => {
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }
}
interface DialogData {
  IsEdit: boolean;
  ID: number;
}
