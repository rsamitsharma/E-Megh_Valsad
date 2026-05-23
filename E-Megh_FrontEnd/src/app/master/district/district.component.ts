import { Component, OnInit, ViewChild } from "@angular/core";
import { DistrictDialogComponent } from "./district-dialog/district-dialog.component";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { GlobalService, MasterService } from "@source/app/_services";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";

@Component({
  selector: "app-district",
  templateUrl: "./district.component.html",
  styleUrls: ["./district.component.scss"],
})
export class DistrictComponent extends UnSubscriber implements OnInit {
  constructor(private dialog: MatDialog, public _GlobalService: GlobalService, private _MasterService: MasterService) {
    super();
  }

  ngOnInit() {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.DISTRICT, DEFAULT_TABLE_COLUMNS.DISTRICT));
    this.GetDistrictData();
  }

  // #region Variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];

  // #endregion

  GetDistrictData() {
    this.anotherSubscription = this._MasterService.GetDisctrictMaster(0).subscribe((res: any) => {
      console.log(res);

      const { Table } = res;
      this.dataSource.data = Table;
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
    const dialogRef = this.dialog.open(DistrictDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.GetDistrictData();
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
