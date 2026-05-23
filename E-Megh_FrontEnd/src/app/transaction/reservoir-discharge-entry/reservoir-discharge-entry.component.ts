import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { ReservoirDischargeEntryDialogComponent } from "./reservoir-discharge-entry-dialog/reservoir-discharge-entry-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";

@Component({
  selector: "app-reservoir-discharge-entry",
  templateUrl: "./reservoir-discharge-entry.component.html",
  styleUrls: ["./reservoir-discharge-entry.component.scss"],
})
export class ReservoirDischargeEntryComponent extends UnSubscriber implements OnInit {
  constructor(public _GlobalService: GlobalService, private dialog: MatDialog, private _MasterService: MasterService) {
    super();
  }

  ngOnInit() {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.RESERVOIRDISCHARGEENTRY, DEFAULT_TABLE_COLUMNS.RESERVOIRDISCHARGEENTRY));
    this.GetReservoirData();
    this.GetReservoirDischargeEntryData();
  }

  // #region Variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  ReservoirList: any[] = [];
  ReservoirID: number = 1;
  // #endregion

  GetReservoirData() {
    this.anotherSubscription = this._MasterService.GetReservoirMaster(true, 0).subscribe((res: any) => {
      const { Table } = res;

      this.ReservoirList = Table;

      this._GlobalService.dynamicInputSelect(this.ReservoirList, "ReservoirID", item => `${item.ReservoirName}`);
    });
  }

  GetReservoirDischargeEntryData() {
    this.anotherSubscription = this._MasterService.GetReservoirDischargeEntry(this.ReservoirID, 0).subscribe((res: any) => {
      const { Table } = res;
      // Format numbers with Indian numbering system (lakhs and crores)
      const formattedData = Table.map((item: any) => ({
        ...item,
        TotalInflow: item.TotalInflow != null 
          ? Number(item.TotalInflow).toLocaleString('en-IN', { maximumFractionDigits: 0, useGrouping: true })
          : null,
        TotalDischarge: item.TotalDischarge != null 
          ? Number(item.TotalDischarge).toLocaleString('en-IN', { maximumFractionDigits: 0, useGrouping: true })
          : null
      }));
      this.dataSource.data = formattedData;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(id?: number, reservoirid?: number) {
    const dialogConfig = new MatDialogConfig();
    this._GlobalService.matDialogDefaultConfig(dialogConfig);
    dialogConfig.width = "30%";
    dialogConfig.data = {
      IsEdit: id ? true : false,
      ID: id,
      ReservoirID: reservoirid,
    };
    const dialogRef = this.dialog.open(ReservoirDischargeEntryDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.GetReservoirDischargeEntryData();
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
