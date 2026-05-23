import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MasterService, GlobalService } from "@source/app/_services";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

@Component({
  selector: "app-prediction-report",
  templateUrl: "./prediction-report.component.html",
  styleUrls: ["./prediction-report.component.scss"],
})
export class PredictionReportComponent extends UnSubscriber implements OnInit {
  constructor(private _MasterService: MasterService, public _GlobalService: GlobalService, private datepipe: DatePipe, private dialog: MatDialog, private _Router: Router) {
    super();
  }

  ngOnInit(): void {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.PREDICTIONREPORT, DEFAULT_TABLE_COLUMNS.PREDICTIONREPORT));
    this.GetPredictionReport();
    const today = new Date();
    this.StartDateTime = this.datepipe.transform(today, "yyyy-MM-dd")!;
    this.EndDateTime = this.datepipe.transform(today, "yyyy-MM-dd")!;
  }

  // #region Variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  displayedColumns: string[] = [];
  StartDateTime: string = `${this.datepipe.transform(new Date(), "yyyy-MM-dd")}T00:00:00`;
  EndDateTime: string = `${this.datepipe.transform(new Date(), "yyyy-MM-dd")}T23:59:59`;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  // #endregion

  GetPredictionReport() {
    this.dataSource.data = [];

    if (this.StartDateTime && this.EndDateTime) {
      const fromDate = new Date(this.StartDateTime);
      const toDateEnd = new Date(this.EndDateTime);
      toDateEnd.setHours(23, 59, 59, 999);

      const formattedStart = this.datepipe.transform(fromDate, "yyyy-MM-ddTHH:mm:ss")!;
      const formattedEnd = this.datepipe.transform(toDateEnd, "yyyy-MM-ddTHH:mm:ss")!;

      this._MasterService.GetPredictionReport(formattedStart, formattedEnd).subscribe((res: any) => {
        const { Table } = res;
        Table.forEach((item: any) => {
          if (item.Prediction1_ForTime) {
            const date = new Date(item.Prediction1_ForTime);

            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();

            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            const seconds = String(date.getSeconds()).padStart(2, "0");

            item.Prediction1_ForTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
          }
        });

        this.dataSource.data = Table;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
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
    this.saveAsExcelFile(excelBuffer, "PredictionReport");
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    FileSaver.saveAs(data, `${fileName}.xlsx`);
  }
  
}
