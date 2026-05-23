import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UserTypeDialogComponent } from "./user-type-dialog/user-type-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { GlobalService, MasterService } from "@source/app/_services";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";

@Component({
  selector: "app-user-type",
  templateUrl: "./user-type.component.html",
  styleUrls: ["./user-type.component.scss"],
})
export class UserTypeComponent extends UnSubscriber implements OnInit {
  constructor(private dialog: MatDialog, public _GlobalService: GlobalService, private _MasterService: MasterService) {
    super();
  }

  ngOnInit() {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.USERTYPE, DEFAULT_TABLE_COLUMNS.USERTYPE));
    this.GetUserTypeData();
  }

  // #region Variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  // #endregion

  GetUserTypeData() {
    this.anotherSubscription = this._MasterService.GetUserTypeMaster(0).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

      this.dataSource.data = Table[0];
      this.dataSource.data.reverse();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(id?: number) {
    const dialogConfig = new MatDialogConfig();
    this._GlobalService.matDialogDefaultConfig(dialogConfig);
    dialogConfig.data = {
      IsEdit: id ? true : false,
      ID: id,
    };
    const dialogRef = this.dialog.open(UserTypeDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.GetUserTypeData();
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
