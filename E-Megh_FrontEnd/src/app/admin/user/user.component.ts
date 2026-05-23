import { Component, OnInit, ViewChild } from "@angular/core";
import { UserDialogComponent } from "./user-dialog/user-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MasterService } from "@source/app/_services/master.service";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { GlobalService } from "@source/app/_services/global.service";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models/constants";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent extends UnSubscriber implements OnInit {
  constructor(private dialog: MatDialog, private _MasterService: MasterService, public _GlobalService: GlobalService) {
    super();
  }

  ngOnInit(): void {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.USER, DEFAULT_TABLE_COLUMNS.USER));
    this.GetUserdata();
  }

  // #region Variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  // #endregion

  GetUserdata() {
    this.dataSource.data = [];
    this.anotherSubscription = this._MasterService.GetUserMaster(true, 0).subscribe((res: any) => {
      const { Table } = res;
      console.log(Table);
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
    const dialogRef = this.dialog.open(UserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);

      if (data) {
        this.GetUserdata();
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
