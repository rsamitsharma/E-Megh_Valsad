import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, Inject, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { cls_UserMaster, cls_UserMenuPermission, cls_UserReadingLocation } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { MatStepper, StepperOrientation } from "@angular/material/stepper";
import { ToastrService } from "ngx-toastr";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";

@Component({
  selector: "app-user-dialog",
  templateUrl: "./user-dialog.component.html",
  styleUrls: ["./user-dialog.component.scss"],
  animations: [trigger("indicatorRotate", [state("collapsed", style({ transform: "rotate(0deg)" })), state("expanded", style({ transform: "rotate(180deg)" })), transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4,0.0,0.2,1)"))])],
})
export class UserDialogComponent extends UnSubscriber {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private _MasterService: MasterService, public _GlobalService: GlobalService, private _dialogRef: MatDialogRef<UserDialogComponent>, breakpointObserver: BreakpointObserver) {
    super();
    this.stepperOrientation = breakpointObserver.observe("(min-width: 800px)").pipe(map(({ matches }) => (matches ? "horizontal" : "vertical")));
    this.dialogHandler(data);
  }

  // #region Variable
  @ViewChild("stepper") stepper!: MatStepper;
  IsEdit: boolean = false;
  UID: number = 0;
  UserID: string = "";
  Password: string = "";
  FirstName: string = "";
  LastName: string = "";
  Name: string = "";
  Email: string = "";
  MobileNo?: number;
  UserTypeID: number = 0;
  UserType: string = "";
  IsAdmin: boolean = false;
  IsAccept: boolean = false;
  IsMasterUser: boolean = false;
  IsActive: boolean = false;
  UserList: any[] = [];
  DistrictList: any[] = [];
  DistrictID?: number;
  ReadingLocationList: any[] = [];
  ReadinLocationIDs: number[] = [];
  ReadingLocationID?: number;
  UserReadingLocation: any[] = [];
  stepperOrientation: Observable<StepperOrientation>;
  enable: boolean = false;
  enableedit: boolean = true;
  enable1: boolean = false;
  enableedit1: boolean = true;
  enable2: boolean = false;
  enableedit2: boolean = true;
  masterMenuList: any[] = [];
  masterMenuUserPermissionList: any[] = [];
  FinalMenuData: any[] = [];
  AllMenu: any[] = [];
  userMenuList: any[] = [];
  selectAllAdd = false;
  selectAllEdit = false;
  selectAllDelete = false;
  selectAllView = false;
  CanAdd: boolean = false;
  CanEdit: boolean = false;
  CanDelete: boolean = false;
  CanView: boolean = false;

  IsMenuSelected: boolean = false;
  allComplete: boolean = false;
  // #endregion

  async dialogHandler(data: DialogData) {
    this.GetReadingLocation();
    this.GetAllMenuMaster();
    this.GetUserType();
    this.IsEdit = data.IsEdit;
    if (this.IsEdit) {
      this.UID = data.ID;
      await this.GetUserData();
    }
  }

  async GetUserData() {
    const res: any = await this._MasterService.GetUserMaster(false, this.UID).toPromise();
    const { Table } = res;
    console.log(Table);
    const TempModal = Table[0][0];
    this.UID = TempModal.RID;
    this.UserID = TempModal.UserID;
    this.Password = TempModal.Pwd;
    this.FirstName = TempModal.FirstName;
    this.LastName = TempModal.LastName;
    this.Name = TempModal.Name;
    this.Email = TempModal.EMail;
    this.MobileNo = TempModal.MobileNo;
    this.UserTypeID = TempModal.UserType;
    this.IsAdmin = TempModal.isAdmin;
    this.IsActive = TempModal.IsActive;
    this.IsMasterUser = TempModal.IsMasterUser;
    // this.DistrictID = TempModal.DistrictID;
    // this.UserTypeID = TempModal.UserType;

    this.ReadingLocationList.forEach(items => {
      Table[1].forEach((element: any) => {
        if (element.ReadingLocationID == items.RLID) items.IsChipSelected = true;
      });
    });

    setTimeout(async () => {
      if (!this.masterMenuList.length) await this.GetAllMenuMaster();
      this.masterMenuList.forEach((parentelement: any) => {
        const parentfound = Table[2].find((element: any) => element.ParentMenuID === parentelement.MenuID);
        if (parentfound) {
          parentelement.IsSelected = true;
        }
        parentelement.ChildList.forEach((childelement: any) => {
          const childfound = Table[2].find((element1: any) => element1.MenuID === childelement.MenuID);
          if (childfound) {
            childelement.IsSelected = true;
          }
        });
      });
      console.log(this.masterMenuList);

      this.masterMenuUserPermissionList = this.masterMenuList.filter(items => items.IsSelected);
      console.log(this.masterMenuUserPermissionList);

      this.masterMenuUserPermissionList.forEach((parentpermission: any) => {
        parentpermission.ChildList.map((item: any) => {
          const menupermission = Table[2].find((data: any) => data.MenuID === item.MenuID);
          if (menupermission) {
            item.canAdd = menupermission.canAdd;
            item.canEdit = menupermission.canEdit;
            item.canDelete = menupermission.canDelete;
            item.canView = menupermission.canView;
          }
        });
      });
    }, 0);

    console.log(this.masterMenuUserPermissionList);
  }

  async GetAllMenuMaster() {
    this.masterMenuList = [];
    // this._MasterService.GetMenuMaster().subscribe((res: any) => {
    //   console.log(res);

    //   const { Table } = res;
    //   if (Table?.length) {
    //     this.AllMenu = Table;
    //     this.masterMenuList = this._GlobalService.menuSetter(Table);
    //   }
    // });
    const response: any = await this._MasterService.GetMenuMaster().toPromise();
    const { Table } = response;
    this.AllMenu = Table;
    this.masterMenuList = await this._GlobalService.menuSetter(Table);
  }

  GetUserType() {
    this._MasterService.GetUserTypeMaster(0).subscribe((res: any) => {
      const { Table } = res;
      this.UserList = Table[0];
      this._GlobalService.dynamicInputSelect(this.UserList, "UserTypeId", item => `${item.UserType}`);
    });
  }

  GetDistrict() {
    this._MasterService.GetDisctrictMaster(0).subscribe((res: any) => {
      const { Table } = res;
      this.DistrictList = Table;
      this._GlobalService.dynamicInputSelect(this.DistrictList, "DID", item => `${item.DistName}`);
    });
  }

  async GetReadingLocation() {
    const response: any = await this._MasterService.GetReadingLocationMaster(true, 0).toPromise();
    const { Table } = response;
    this.ReadingLocationList = Table;
    this._GlobalService.dynamicInputSelect(this.ReadingLocationList, "RLID", item => `${item.Name}`);
  }

  ValidateForm(): boolean {
    let IsValid: boolean = true;
    let mess: string = "";

    if (!this.UserID) {
      mess += "User ID is required . ";
    }
    if (!this.Password) {
      mess += "Password is required . ";
    }
    // if (!this.Email) {
    //   mess += "Emai ID is required . ";
    // }
    if (!this.MobileNo) {
      mess += "Mobile No is required . ";
    }

    if (!this.UserTypeID) {
      mess += "User Type ID is required . ";
    }

    if (mess) {
      IsValid = false;
      this.toastr.error(mess, "Oops");
    } else {
      IsValid = true;
    }

    return IsValid;
  }

  GoToNext() {
    if (!this.ValidateForm()) {
      return;
    } else {
      this.enable = true;
      this.enableedit = false;
      setTimeout(() => {
        this.stepper.next();
      }, 0);
    }
  }

  GoToFinal() {
    if (!this.IsEdit) {
      this.masterMenuUserPermissionList = this.masterMenuList.filter(items => items.IsSelected);
      this.masterMenuUserPermissionList.forEach(ele => {
        ele.ChildList.map((items: any) => {
          items.canAdd = true;
          items.canEdit = true;
          items.canDelete = true;
          items.canView = true;
          return items;
        });
      });
    } else {
      this.masterMenuUserPermissionList = this.masterMenuList.filter(items => items.IsSelected);
    }

    if (!this.ValidateForm()) {
      return;
    } else {
      this.enable1 = true;
      this.enableedit1 = false;
      setTimeout(() => {
        this.stepper.next();
      }, 0);
    }
  }

  onClickMenuItem(item: any) {
    if (item.ChildList.length === 0) return;
    item.IsExpanded = !item.IsExpanded;
  }

  GoBack() {
    this.enable = false;
    this.enableedit = true;
    setTimeout(() => {
      this.stepper.previous();
    }, 0);
  }

  GoBackToPermission() {
    this.enable1 = false;
    this.enableedit1 = true;
    setTimeout(() => {
      this.stepper.previous();
    }, 0);
  }

    OnSubmit() {
    // if (!this.ValidateForm()) return;
    console.log(this.masterMenuUserPermissionList);

    this.masterMenuUserPermissionList.forEach(ele => {
      if (!ele.ParentMenuID) {
        ele.ChildList.forEach((element: any) => {
          if (element.IsSelected) {
            const MenuPermissionModel = new cls_UserMenuPermission();
            MenuPermissionModel.MenuID = element.MenuID;
            MenuPermissionModel.UserID = this.UID;
            MenuPermissionModel.canAdd = element.canAdd ? element.canAdd : false;
            MenuPermissionModel.canEdit = element.canEdit ? element.canEdit : false;
            MenuPermissionModel.canDelete = element.canDelete ? element.canDelete : false;
            MenuPermissionModel.canView = element.canView ? element.canView : false;
            this.FinalMenuData.push(MenuPermissionModel);
          }
        });
      }
      if (ele.IsSelected) {
        const MenuPermissionModel = new cls_UserMenuPermission();
        MenuPermissionModel.MenuID = ele.MenuID;
        MenuPermissionModel.UserID = this.UID;
        MenuPermissionModel.canAdd = true;
        MenuPermissionModel.canEdit = true;
        MenuPermissionModel.canDelete = true;
        MenuPermissionModel.canView = true;
        this.FinalMenuData.push(MenuPermissionModel);
      }
    });

    this.ReadinLocationIDs = [];
    const ids = this.ReadingLocationList.map(items => {
      if (items.IsChipSelected) {
        this.ReadinLocationIDs.push(items.RLID);
      }
    });

    this.ReadinLocationIDs.forEach(element => {
      const RLModel = new cls_UserReadingLocation();
      RLModel.UserID = this.UID;
      RLModel.ReadingLocationID = element;
      RLModel.IsActive = true;
      this.UserReadingLocation.push(RLModel);
    });

   let FmData = new cls_UserMaster();
   FmData.UserID = this.UserID;
   FmData.Pword = this.Password;
   FmData.FirstName = this.FirstName;
   FmData.LastName = this.LastName;
   FmData.EMail = this.Email;
   FmData.Mobile = this.MobileNo;
   FmData.UserType = this.UserTypeID;
   FmData.ReadingLocationList = this.UserReadingLocation;
   FmData.MenuDetails = this.FinalMenuData;
   FmData.IsAdmin = this.IsAdmin;
   FmData.IsActive = this.IsActive;

    if (!this.IsEdit) {
      FmData.UID = this.UID;
    } else {
      FmData.UID = this.UID;
    }

    console.log(FmData);

    this.anotherSubscription = this._MasterService.AddUserMaster(FmData).subscribe((res: any) => {
      console.log(res);
      this.toastr.success(res.message, "Success");
      this._dialogRef.close(true);
    });
  }

  setParentMenu(items: any) { 
    items.IsSelected = !items.IsSelected; 
    items.ChildList.forEach((element: any) => {
      element.IsSelected = items.IsSelected;
    });
  }

  setChildMenu(items: any) {

    let ChildMenuSelectedCount: number = 0;
    items.IsSelected = !items.IsSelected;
    this.masterMenuList.map(ele => {
      if (ele.MenuID == items.ParentMenuID) {
        ele.ChildList.forEach((element: any) => {
          if (element.IsSelected) {
            ChildMenuSelectedCount += 1;
          }
        });
        if (ChildMenuSelectedCount == 0) {
          ele.IsSelected = false;
        } else {
          ele.IsSelected = true;
        }
      }
      return ele;
    });
    console.log(this.masterMenuList);
  }

  onAdd(data: any) {
    data.forEach((item: any) => {
      item.ChildList.map((item1: any) => (item1.canAdd = !this.CanAdd));
    });
  }
  onEdit(data: any) {
    data.forEach((item: any) => {
      item.ChildList.map((item1: any) => (item1.canEdit = !this.CanEdit));
    });
  }

  onDelete(data: any) {
    data.forEach((item: any) => {
      item.ChildList.map((item1: any) => (item1.canDelete = !this.CanDelete));
    });
  }

  onView(data: any) {
    data.forEach((item: any) => {
      item.ChildList.map((item1: any) => (item1.canView = !this.CanView));
    });
  }
}
interface DialogData {
  IsEdit: boolean;
  ID: number;
}
