import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { GatewayRaingaugeDataDialogComponent } from "./gateway-raingauge-data-dialog/gateway-raingauge-data-dialog.component";
import { Router } from "@angular/router";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

@Component({
  selector: "app-gateway-raingauge-data",
  templateUrl: "./gateway-raingauge-data.component.html",
  styleUrls: ["./gateway-raingauge-data.component.scss"],
})
export class GatewayRaingaugeDataComponent extends UnSubscriber implements OnInit {
  constructor(private _MasterService: MasterService, public _GlobalService: GlobalService, private datepipe: DatePipe, private dialog: MatDialog, private _Router: Router) {
    super();
  }

  ngOnInit(): void {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.GATEWAYRAINGAUGE, DEFAULT_TABLE_COLUMNS.GATEWAYRAINGAUGE));
    this.LastMonthDate.setDate(this.LastMonthDate.getDate() - 30);
    this.FromDate = this.datepipe.transform(this.LastMonthDate, "yyyy-MM-dd")!;
    // this.GetAllGatewayRaingaugeData();
    this.GetGatewayRaingaugeData();
  }

  // #region Variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  FromDate: string = "";
  ToDate: string = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  LastMonthDate = new Date();
  RainGaugeDataID: number = 0;
  GatewayRainGaugeDataID: number = 0;
  RaingaugeDataList: any[] = [];
  MenuUrlList: string[] = [];
  canAdd: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  canView: boolean = false;
  // #endregion

  GetGatewayRaingaugeData() {
    this.dataSource.data = [];
    this._MasterService.GetRainFallReadingDataHourly().subscribe((res: any) => {
      const { Table } = res;
      this.dataSource.data = Table;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // GetAllGatewayRaingaugeData() {
  //   this.anotherSubscription = this._MasterService.GetRaingaugeStationMaster(true, 0).subscribe((res: any) => {
  //     this.RaingaugeDataList = JSON.parse(JSON.stringify(res["Table"]));
  //     this._GlobalService.dynamicInputSelect(this.RaingaugeDataList, "GatewayRaingaugeDataID", item => `${item.GatewayName}`);
  //   });
  // }

  // GetGatewayRaingaugeData() {
  //   this.anotherSubscription = this._MasterService.GetGatewayRaingaugeData(this.RainGaugeDataID, this.FromDate, this.ToDate).subscribe((res: any) => {
  //     const { Table } = res;

  //     this.dataSource.data = Table;
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   });
  // }

  openDialog(id?: number) {
    const dialogConfig = new MatDialogConfig();
    this._GlobalService.matDialogDefaultConfig(dialogConfig);
    dialogConfig.data = {
      IsEdit: id ? true : false,
      ID: id,
      GateWayraingaugeDataID: this.RainGaugeDataID,
      FromDate: this.FromDate,
      ToDate: this.ToDate,
    };
    const dialogRef = this.dialog.open(GatewayRaingaugeDataDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.GetGatewayRaingaugeData();
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

    exportToExcel(): void {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
      const workbook: XLSX.WorkBook = {
        Sheets: { "Prediction Data": worksheet },
        SheetNames: ["Prediction Data"],
      };
      const excelBuffer: any = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      this.saveAsExcelFile(excelBuffer, "RainGaugeReport");
    }

     private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });
        FileSaver.saveAs(data, `${fileName}.xlsx`);
      }
}
