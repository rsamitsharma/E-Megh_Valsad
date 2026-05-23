import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { SirenSensorDialogComponent } from "./siren-sensor-dialog/siren-sensor-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { GlobalService, MasterService } from "@source/app/_services";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models/constants";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";

@Component({
  selector: "app-siren-sensor",
  templateUrl: "./siren-sensor.component.html",
  styleUrls: ["./siren-sensor.component.scss"],
})
export class SirenSensorComponent extends UnSubscriber implements OnInit {
  constructor(private dialog: MatDialog, private _MasterService: MasterService, public _GlobalService: GlobalService) {
    super();
  }

  ngOnInit() {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.SIRENLOCATION, DEFAULT_TABLE_COLUMNS.SIRENLOCATION));
    this.GetSirenSensorData();
  }

  // #region Variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  // #endregion

  GetSirenSensorData() {
    this.anotherSubscription = this._MasterService.GetSirenLocationMaster(true, 0).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

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
    const dialogRef = this.dialog.open(SirenSensorDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.GetSirenSensorData();
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
