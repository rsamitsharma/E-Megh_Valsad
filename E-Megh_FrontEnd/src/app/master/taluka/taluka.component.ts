import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { TalukaDialogComponent } from "./taluka-dialog/taluka-dialog.component";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { LogInComponent } from "@source/app/account/log-in/log-in.component";

@Component({
  selector: "app-taluka",
  templateUrl: "./taluka.component.html",
  styleUrls: ["./taluka.component.scss"],
})
export class TalukaComponent extends UnSubscriber implements OnInit {
  constructor(private dialog: MatDialog, public _GlobalService: GlobalService, private _MasterService: MasterService) {
    super();
  }

  ngOnInit() {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.TALUKA, DEFAULT_TABLE_COLUMNS.TALUKA));
    this.GetTalukaData();
  }

  // #region Variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];

  // #endregion

  GetTalukaData() {
    this.anotherSubscription = this._MasterService.GetTalukaMaster(0).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

      this.dataSource.data = Table;
      // this.dataSource.data.reverse();
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
    const dialogRef = this.dialog.open(TalukaDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.GetTalukaData();
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
