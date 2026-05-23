import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models";
import { GlobalService, MasterService } from "@source/app/_services";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { LevelMasterDialogComponent } from "./level-master-dialog/level-master-dialog.component";

@Component({
  selector: "app-level-master",
  templateUrl: "./level-master.component.html",
  styleUrls: ["./level-master.component.scss"],
})
export class LevelMasterComponent implements OnInit {
  constructor(private dialog: MatDialog, private _MasterService: MasterService, public _GlobalService: GlobalService) {}

  ngOnInit() {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.LEVEL, DEFAULT_TABLE_COLUMNS.LEVEL));
    this.GetLevelData();
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

  GetLevelData() {
    this._MasterService.GetLevelMaster(true, 0).subscribe((res: any) => {
      const { Table } = res;
      console.log(res);

      this.dataSource.data = Table[0];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  OpenDialog(id?: any) {
    const dialogconfig = new MatDialogConfig();
    this._GlobalService.matDialogDefaultConfig(dialogconfig);
    dialogconfig.width = '100%';
    dialogconfig.maxWidth = '800px';
    dialogconfig.panelClass = 'responsive-dialog';
    dialogconfig.data = {
      IsEdit: id ? true : false,
      ID: id,
    };
    const dialogref = this.dialog.open(LevelMasterDialogComponent, dialogconfig);
    dialogref.afterClosed().subscribe((data: any) => {
      if (data) {
        this.GetLevelData();
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
