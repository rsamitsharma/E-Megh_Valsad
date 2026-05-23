import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { RaingaugeStationDialogComponent } from "./raingauge-station-dialog/raingauge-station-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { GlobalService, MasterService } from "@source/app/_services";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models/constants";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";

@Component({
  selector: "app-raingauge-station",
  templateUrl: "./raingauge-station.component.html",
  styleUrls: ["./raingauge-station.component.scss"],
})
export class RaingaugeStationComponent extends UnSubscriber implements OnInit {
  constructor(private dialog: MatDialog, private _MasterService: MasterService, public _GlobalService: GlobalService) {
    super();
  }

  ngOnInit() {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.RAINGAUGELOCATION, DEFAULT_TABLE_COLUMNS.RAINGAUGELOCATION));
    this.GetRainGaugeStationData();
  }

  // #region Variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  // #endregion

  GetRainGaugeStationData() {
    this.anotherSubscription = this._MasterService.GetRaingaugeStationMaster(true, 0).subscribe((res: any) => {
      const { Table } = res;
      this.dataSource.data = Table;
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
    const dialogRef = this.dialog.open(RaingaugeStationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.GetRainGaugeStationData();
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
