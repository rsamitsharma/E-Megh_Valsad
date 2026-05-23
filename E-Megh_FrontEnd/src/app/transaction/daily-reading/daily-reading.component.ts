import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { DailyReadingDialogComponent } from "./daily-reading-dialog/daily-reading-dialog.component";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

@Component({
  selector: "app-daily-reading",
  templateUrl: "./daily-reading.component.html",
  styleUrls: ["./daily-reading.component.scss"],
})
export class DailyReadingComponent extends UnSubscriber implements OnInit {
  constructor(public _GlobalService: GlobalService, private dialog: MatDialog, private _MasterService: MasterService, private datepipe: DatePipe, private toastr: ToastrService) {
    super();
  }

  ngOnInit() {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.DAILYREADINGRECORD, DEFAULT_TABLE_COLUMNS.DAILYREADINGRECORD));
    this.LastMonthDate.setDate(this.LastMonthDate.getDate() - 30);
    this.FromDate = this.datepipe.transform(this.LastMonthDate, "yyyy-MM-dd")!;
    this.GetReadingLocationList();
    this.GetDailyReadingRecord();
  }

  // #region Variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  ReadingLocationID: number = 1;
  LocationList: any[] = [];
  LastMonthDate = new Date();
  FromDate: string = "";
  ToDate: string = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  // #endregion

  GetReadingLocationList() {
    this.anotherSubscription = this._MasterService.GetReadingLocationMaster(true, 0).subscribe((res: any) => {
      this.LocationList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.LocationList, "RLID", item => `${item.Name}`);
    });
  }

  GetDailyReadingRecord() {
    this.anotherSubscription = this._MasterService.GetDailyReadingDataReport(this.ReadingLocationID, 0).subscribe((res: any) => {
      const { Table } = res;
      console.log(Table);
      this.dataSource.data = Table;
      // this.dataSource.data.reverse();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  openDialog(id?: number) {
    const dialogConfig = new MatDialogConfig();
    this._GlobalService.matDialogDefaultConfig(dialogConfig);
    dialogConfig.width = "30%";
    dialogConfig.data = {
      IsEdit: id ? true : false,
      ID: id,
      ReadingLocationID: this.ReadingLocationID,
      FromDate: this.FromDate,
      ToDate: this.ToDate,
    };
    const dialogRef = this.dialog.open(DailyReadingDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.GetDailyReadingRecord();
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
    this.saveAsExcelFile(excelBuffer, "WaterLevelPrediction");
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    FileSaver.saveAs(data, `${fileName}.xlsx`);
  }
}
