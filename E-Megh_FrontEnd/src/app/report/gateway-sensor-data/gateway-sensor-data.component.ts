import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { GatewaySensorDataDialogComponent } from "./gateway-sensor-data-dialog/gateway-sensor-data-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";

@Component({
  selector: "app-gateway-sensor-data",
  templateUrl: "./gateway-sensor-data.component.html",
  styleUrls: ["./gateway-sensor-data.component.scss"],
})
export class GatewaySensorDataComponent extends UnSubscriber implements OnInit {
  constructor(private datepipe: DatePipe, public _GlobalService: GlobalService, private dialog: MatDialog, private _MasterService: MasterService, private toastr: ToastrService) {
    super();
  }

  ngOnInit(): void {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.GATEWAYSENSOR, DEFAULT_TABLE_COLUMNS.GATEWAYSENSOR));
    this.LastMonthDate.setDate(this.LastMonthDate.getDate() - 30);
    this.FromDate = this.datepipe.transform(this.LastMonthDate, "yyyy-MM-dd")!;
    // this.GetGatewaySensorData();
    this.GetReadingLocationList();
  }

  // #region variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  ReadingLocationID: number = 0;
  LocationList: any[] = [];
  LastMonthDate = new Date();
  FromDate: string = "";
  ToDate: string = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  // #endregion

  GetGatewaySensorData() {
    this.dataSource.data = [];
    this.anotherSubscription = this._MasterService.GetGatewaySensorData(this.ReadingLocationID, this.FromDate, this.ToDate).subscribe((res: any) => {
      const { Table } = res;

      this.dataSource.data = Table;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  GetReadingLocationList() {
    this.anotherSubscription = this._MasterService.GetReadingLocationMaster(true, 0).subscribe((res: any) => {

      this.LocationList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.LocationList, "RLID", item => `${item.Name}`);
    });
  }

  ValidateFilterForm() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.ReadingLocationID) {
      ErrMsg += "Select Reading Location . ";
    }

    if (!this.FromDate.trim()) {
      ErrMsg += "Select From Date . ";
    }

    if (!this.ToDate) {
      ErrMsg += "Select To Date . ";
    }

    if (ErrMsg.length) {
      this.toastr.error(ErrMsg, "Oops");
      Valid = false;
    }
    return Valid;
  }

  openDialog(data: any) {
    const dialogConfig = new MatDialogConfig();
    this._GlobalService.matDialogDefaultConfig(dialogConfig);
    dialogConfig.data = {
      // IsEdit: id ? true : false,
      // ID: id,
      // ReadingLocationID: this.ReadingLocationID,
      // FromDate: this.FromDate,
      // ToDate: this.ToDate,
      SensorData: data,
    };
    const dialogRef = this.dialog.open(GatewaySensorDataDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.GetGatewaySensorData();
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
