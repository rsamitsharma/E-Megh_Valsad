import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UserReadingLocationDialogComponent } from "./user-reading-location-dialog/user-reading-location-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { GlobalService, MasterService } from "@source/app/_services";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";

@Component({
  selector: "app-user-reading-location",
  templateUrl: "./user-reading-location.component.html",
  styleUrls: ["./user-reading-location.component.scss"],
})
export class UserReadingLocationComponent implements OnInit {
  constructor(private dialog: MatDialog, private _MasterService: MasterService, private _GlobalService: GlobalService) {}

  ngOnInit() {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.READINGLOCATION, DEFAULT_TABLE_COLUMNS.READINGLOCATION));
    this.GetUserReadingLocationData();
  }

  // #region Variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  // #endregion

  GetUserReadingLocationData() {
    this._MasterService.GetReadingLocationMaster(true, 0).subscribe((res: any) => {
      console.log(res);
      const { Table } = res;
      this.dataSource.data = Table;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // ValidateData() {
  //   let Valid = true;
  //   let ErrMsg = "";

  //   if (!this.ReadingLocationID) {
  //     ErrMsg += "Please Select Location ";
  //   }

  //   if (ErrMsg.length) {
  //     this.toastr.error(ErrMsg, "Oops");
  //     Valid = false;
  //   }
  //   return Valid;
  // }

  // Submit() {
  //   if (!this.ValidateData()) return;
  //   let FmData = new ClsUserMasterReadingLocations();
  //   FmData.ReadingLocationID = this.ReadingLocationID;

  //   let api: any;
  //   if (!this.RID) {
  //     FmData.IsActive = true;
  //     console.log(FmData);
  //     // api = this.GlobalService.AddUserRemoteLocation(FmData);
  //   } else {
  //     FmData.IsActive = this.IsActive;
  //     FmData.RID = this.RID;
  //     FmData.UserID = this.UserID;
  //     FmData.IsDefault = this.IsDefault;
  //     console.log(FmData);
  //     // api = this.GlobalService.UpdateUserRemoteLocation(FmData);
  //   }
  // }

  Add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      Edit: false,
    };
    const dialogRef = this.dialog.open(UserReadingLocationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.GetUserReadingLocationData();
    });
  }

  View(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      Edit: true,
      data: data,
    };
    const dialogRef = this.dialog.open(UserReadingLocationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.GetUserReadingLocationData();
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
