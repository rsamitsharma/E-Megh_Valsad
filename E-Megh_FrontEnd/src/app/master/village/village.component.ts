import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { VillageDialogComponent } from "./village-dialog/village-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { GlobalService, MasterService } from "@source/app/_services";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models/constants";

@Component({
  selector: "app-village",
  templateUrl: "./village.component.html",
  styleUrls: ["./village.component.scss"],
})
export class VillageComponent implements OnInit {
  constructor(private dialog: MatDialog, private _MasterService: MasterService, public _GlobalService: GlobalService) {}

  ngOnInit() {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.VILLAGE, DEFAULT_TABLE_COLUMNS.VILLAGE));
    this.GetVillageData();
    this.GetReadingLocationData();
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
  VillageList: any[] = [];
  // #endregion

  GetVillageData() {
    this._MasterService.GetVillageMaster(true, 0).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

      this.VillageList = Table;
      this.dataSource.data = Table;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  GetReadingLocationData() {
    this._MasterService.GetReadingLocationMaster(true, 0).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

      this.LocationList = Table;
      this._GlobalService.dynamicInputSelect(this.LocationList, "RLID", item => `${item.Name}`);
    });
  }

  FilterDataSource() {
    this.dataSource.data = this.VillageList.filter(items => items.ReadingLocationID === this.ReadingLocationID);
  }

  openDialog(id?: any) {
    const dialogConfig = new MatDialogConfig();
    this._GlobalService.matDialogDefaultConfig(dialogConfig);
    dialogConfig.width = "25%";
    dialogConfig.data = {
      IsEdit: id ? true : false,
      ID: id,
    };
    const dialogRef = this.dialog.open(VillageDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.GetVillageData();
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
