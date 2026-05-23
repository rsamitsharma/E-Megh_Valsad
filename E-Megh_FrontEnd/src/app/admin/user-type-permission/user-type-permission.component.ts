import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { UserTypePermissionDialogComponent } from "./user-type-permission-dialog/user-type-permission-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: "app-user-type-permission",
  templateUrl: "./user-type-permission.component.html",
  styleUrls: ["./user-type-permission.component.scss"],
})
export class UserTypePermissionComponent implements OnInit {
  constructor(private _MasterService: MasterService, public _GlobalService: GlobalService, private dialog: MatDialog) {}

  ngOnInit() {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.USERTYPEMENUPERMISSION, DEFAULT_TABLE_COLUMNS.USERTYPEMENUPERMISSION));
    this.GetUserTypePermissionData();
  }

  // #region Variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  UserType: any[] = [];
  UserTypeId: number = 1;
  // #endregion

  GetUserTypePermissionData() {
    this._MasterService.GetUserTypeMaster(0).subscribe((res: any) => {
      console.log(res);

      const { Table } = res;
      this.UserType = Table;
      this.UserType.reverse();
      this._GlobalService.dynamicInputSelect(this.UserType, "UserTypeId", item => `${item.UserType}`);
    });
    this._MasterService.GetUserTypePermission(this.UserTypeId).subscribe((res: any) => {
      this.dataSource.data = JSON.parse(JSON.stringify(res))["Table"];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  FilterValue() {
    this.GetUserTypePermissionData();
  }

  Add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      Edit: false,
    };
    const dialogRef = this.dialog.open(UserTypePermissionDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.GetUserTypePermissionData();
    });
  }

  View(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      Edit: false,
      data: data,
    };
    const dialogRef = this.dialog.open(UserTypePermissionDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.GetUserTypePermissionData();
    });
  }
}
