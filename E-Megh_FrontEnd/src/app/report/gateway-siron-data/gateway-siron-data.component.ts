import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { GatewaySironDataDialogComponent } from "./gateway-siron-data-dialog/gateway-siron-data-dialog.component";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-gateway-siron-data",
  templateUrl: "./gateway-siron-data.component.html",
  styleUrls: ["./gateway-siron-data.component.scss"],
})
export class GatewaySironDataComponent implements OnInit {
  constructor(public _GlobalService: GlobalService, private dialog: MatDialog, private _masterService: MasterService, private datepipe: DatePipe, private toastr: ToastrService) {}

  ngOnInit(): void {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.GATEWAYSIREN, DEFAULT_TABLE_COLUMNS.GATEWAYSIREN));
    this.LastMonthDate.setDate(this.LastMonthDate.getDate() - 30);
    this.FromDate = this.datepipe.transform(this.LastMonthDate, "yyyy-MM-dd")!;
    this.GetGatewaySirenData();
  }

  // #region variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  LastMonthDate = new Date();
  FromDate: string = "";
  ToDate: string = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  GatewaySirenDataID: number = 0;
  GatewaySirenDataList: any[] = [];
  // #endregion

  GetGatewaySirenData() {
    this._masterService.GetGatewaySirenData(this.GatewaySirenDataID, this.FromDate, this.ToDate).subscribe((res: any) => {
      const { Table } = res;
      this.GatewaySirenDataList = Table;
      this._GlobalService.dynamicInputSelect(this.GatewaySirenDataList, "GatewaySirenDataID", item => `${item.SirenLocationName}`);
      this.dataSource.data = Table;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ValidateFilterForm() {
    let Valid = true;
    let ErrMsg = "";

    if (!this.GatewaySirenDataID) {
      ErrMsg += "Select Gateway Siren Data . ";
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
    dialogConfig.data = {
      IsEdit: id ? true : false,
      ID: id,
      GatewaySirenDataID: this.GatewaySirenDataID,
      FromDate: this.FromDate,
      ToDate: this.ToDate,
    };
    const dialogRef = this.dialog.open(GatewaySironDataDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.GetGatewaySirenData();
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
