import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable, Subject, Subscription, take, takeUntil } from "rxjs";
import { ConfirmationDialogComponent } from "../_shared/confirmation-dialog/confirmation-dialog.component";
import { DynamicDialogComponent, DynamicDialogModal } from "../_shared/dynamic-dialog/dynamic-dialog.component";
import { UnSubscriber } from "../_shared/UnSubscriber";
import { Cls_TableColumns } from "../_shared/dynamic-table/dynamic-table.component";
import { NavigationStart, Router } from "@angular/router";
import { right } from "@popperjs/core";
import * as XLSX from "xlsx";

interface Int_TableColumn {
  DEFAULT_COLUMNS: string[];
  DEFAULT_TABLE_COLUMNS: Cls_TableColumns[];
}
@Injectable({
  providedIn: "root",
})
export class GlobalService extends UnSubscriber {
  constructor(private toastr: ToastrService, private dialog: MatDialog, private _Router: Router) {
    super();
  }

  readonly errorMessage: string = "Please fill all required fields";

  IsAdminLoggedIn = new BehaviorSubject<boolean>(false);
  IsOperatorLoggedIn = new BehaviorSubject<boolean>(false);
  private sidebarToggled = new Subject<void>();
  sidebarToggle$ = this.sidebarToggled.asObservable();
  IsSidebarOpen = new BehaviorSubject<boolean>(true);  

  get AdminLoggedIn() {
    return sessionStorage.getItem("Token") !== null ? true : false;
  }

  matDialogDefaultConfig(config: MatDialogConfig) {
    config.hasBackdrop = true;
    config.disableClose = true;
    config.autoFocus = false;
    config.closeOnNavigation = true;
    config.panelClass = ["Full-screen-modal"];
  }

  // Notify components that the sidebar has been toggled
  notifySidebarToggle() {
    this.sidebarToggled.next();
  }

  //#region Spinner

  private count = 0;
  private spinner$ = new BehaviorSubject<string>("");
  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
  }

  requestStarted() {
    if (++this.count === 1) {
      this.spinner$.next("start");
    }
  }

  requestEnded() {
    if (this.count === 0 || --this.count === 0) {
      this.spinner$.next("stop");
    }
  }

  IsAuth():boolean {
    return sessionStorage.getItem("Token") !== null ? true : false;
  }

  resetSpinner() {
    this.count = 0;
    this.spinner$.next("stop");
  }

  //#endregion

  //#region Default column

  tableColumnReformater(defaultColumns: any[], defaultTableColumns: any[]): Int_TableColumn {
    const tempColumns: Int_TableColumn = {
      DEFAULT_COLUMNS: [],
      DEFAULT_TABLE_COLUMNS: defaultTableColumns,
    };

    if (!defaultColumns?.length || !defaultTableColumns?.length) return tempColumns;
    for (let index = 0; index < defaultColumns.length; index++) {
      const element = defaultColumns[index];
      const { columnName, column } = element;

      const isActionColumn = !!!columnName?.trim(); // check action column
      if (isActionColumn) {
        tempColumns.DEFAULT_COLUMNS.push(column);
        continue;
      }

      const isColumnExist = !!defaultTableColumns.find(el => el.headingName === columnName);
      if (isColumnExist) {
        tempColumns.DEFAULT_COLUMNS.push(column);
        continue;
      }
    }

    return tempColumns;
  }

  //#endregion

  //#region Navigation Menu Sorting

  SetDefaultMenuCondition(menuList: any[]) {
    menuList.map(data => {
      data.canAdd = false;
      data.canEdit = false;
      data.canDelete = false;
      return data;
    });
  }

  menuSetter(menuList: any[]) {
    menuList = menuList.sort((a: any, b: any) => a.MenuID - b.MenuID);
    menuList = menuList.map((item: any) => {
      if (item.ParentMenuID === null || item.ParentMenuID === 0) item.ParentMenuID = null;
      return item;
    });
    menuList.map(data => {
      data.ChildList = [];
      data.IsExpanded = false;
      data.IsSelected = false;
      return data;
    });
    var selectedMenu = [];
    (function sortMenu(Child: any[], parent: any) {
      if (Child.length > 0) {
        for (let i = 0; i < Child.length; i++) {
          const { IsSelected, MenuID } = Child[i];
          if (!IsSelected) {
            const _findChild = menuList.filter(data => data.ParentMenuID === MenuID);
            if (_findChild?.length > 0) {
              if (parent === null) {
                selectedMenu.push(Child[i]);
              } else {
                parent?.ChildList.push(Child[i]);
              }
              sortMenu(_findChild, Child[i]);
              // Child[i].IsSelected = true;
            } else {
              if (parent !== null) {
                parent.ChildList.push(Child[i]);
                // Child[i].IsSelected = true;
              } else {
                if (selectedMenu.filter(data => data.MenuID === MenuID && data.ParentMenuID === null).length === 0 && Child[i].ParentMenuID === null) {
                  selectedMenu.push(Child[i]);
                  // Child[i].IsSelected = true;
                }
              }
            }
          }
        }
      }
    })(menuList, null);
    this.sortMenuByOrder(selectedMenu);
    return selectedMenu;
  }

  sortMenuByOrder(menuList: any[]) {
    if (menuList.length > 0) {
      menuList.sort((a: any, b: any) => {
        return a.iOrder - b.iOrder;
      });
      for (let i = 0; i < menuList.length; i++) {
        const { ChildList } = menuList[i];
        this.sortMenuByOrder(ChildList);
      }
    }
  }

  reformatMenu(menuList: any[]) {
    const menuMaster = JSON.parse(JSON.stringify(menuList));
    const selectedMenu = [];
    (function reFormat(ChildList: any[]) {
      for (let index = 0; index < ChildList.length; index++) {
        const element = ChildList[index];
        selectedMenu.push(element);
        if (element.ChildList?.length) {
          reFormat(element.ChildList);
        }
      }
    })(menuMaster);

    // Delete ChildList
    for (let i = 0; i < selectedMenu.length; i++) {
      const element = selectedMenu[i];
      delete element["ChildList"];
    }
    return selectedMenu;
  }

  //#endregion

  //#region Dialogs

  // Confirmation Dialog
  confirmationDialog(message: string, title: string, okButton: string, cancelButton: string, okCallback: () => void, cancelCallback: () => void) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: { message, title, okButton, cancelButton },
      disableClose: true,
      closeOnNavigation: true,
    });
    this.anotherSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        okCallback();
      } else {
        cancelCallback();
      }
    });
  }

  dynamicDialog(dialogData: DynamicDialogModal, okCallback: (data: any) => void, cancelCallback: () => void) {
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      width: dialogData.width,
      data: dialogData,
      disableClose: true,
      closeOnNavigation: true,
      autoFocus: false,
    });
    this.anotherSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        okCallback(result);
      } else {
        cancelCallback();
      }
    });
  }

  //#endregion

  //#region Validation

  validateEmail(email: string) {
    var re = /^\S+@\S+$/;
    return re.test(email?.toString()?.trim());
  }

  validatePhoneNumber(phoneNumber: string) {
    var re = /^\d{10}$/;
    return re.test(phoneNumber?.toString()?.trim());
  }

  validatePassword(password: string) {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return re.test(password?.toString()?.trim());
  }

  //#endregion

  //#region Global Calculation

  randomValue(isNumber: boolean, isString: boolean, length: number): string {
    const numbers: string = "0123456789";
    const alphabets: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var s = "";
    if (isNumber && isString) s = `${numbers}${alphabets}`;
    else if (isString) s = alphabets;
    else s = numbers;
    return Array(length)
      .join()
      .split(",")
      .map(function () {
        return s.charAt(Math.floor(Math.random() * s.length));
      })
      .join("");
  }

  //#endregion

  //#region Global Functions

  get rightsControl(): rightsControl {
    const rights: rightsControl = {
      canEdit: false,
      canDelete: false,
      canAdd: false,
      canView: false,
    };
    // rights.canEdit = !!(sessionStorage.getItem("canEdit") || "0");
    // rights.canDelete = !!(sessionStorage.getItem("canDelete") || "0");
    // rights.canAdd = !!(sessionStorage.getItem("canAdd") || "0");
    // rights.canView = !!(sessionStorage.getItem("canView") || "0");
    rights.canView = Boolean(JSON.parse(sessionStorage.getItem("canView") || "false"));
    rights.canAdd = Boolean(JSON.parse(sessionStorage.getItem("canAdd") || "false"));
    rights.canEdit = Boolean(JSON.parse(sessionStorage.getItem("canEdit") || "false"));
    rights.canDelete = Boolean(JSON.parse(sessionStorage.getItem("canDelete") || "false"));
    return rights;
  }

  dynamicInputSelect(_list: any[], columnID: string, columnName: (data: any) => void) {
    _list.map((item: any) => {
      item.id = item[columnID];
      item.name = columnName(item);
      item.IsChipSelected = false;
      item.IsFound = true;
      return item;
    });
  }

  convertToTime(time: any) {
    let hour = time.split(":")[0];
    let min = time.split(":")[1];
    let part = hour >= 12 ? "PM" : "AM";
    if (parseInt(hour) == 0) hour = 12;
    min = (min + "").length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour + "").length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`;
  }

  convertToTimeString(timeString: string): string {
    // Assuming timeString is in "HH:mm" format
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    return date.toISOString().split("T")[1].split(".")[0]; // "HH:mm:ss" format
  }

  convertBase64ExcelToJSON(base64: string) {
    const workBook = XLSX.read(base64, { type: "binary", cellDates: true, dateNF: "dd/mm/yyyy;@" });
    const { SheetNames } = workBook;
    const jsonData = XLSX.utils.sheet_to_json(workBook.Sheets[SheetNames[0]]);
    return jsonData;
  }

  //#endregion
}

interface rightsControl {
  canEdit: boolean;
  canDelete: boolean;
  canAdd: boolean;
  canView: boolean;
}

export interface Int_parameterCalculation {
  StoneValue?: number;
  RapPrice?: number;
  RapValue?: number;
  Discount?: number;
  Carat?: number;
  tempStoneValue?: number;
  tempDiscount?: number;
}
