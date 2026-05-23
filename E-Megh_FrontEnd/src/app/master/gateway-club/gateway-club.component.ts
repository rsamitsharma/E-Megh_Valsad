import { Component, OnInit, ViewChild } from "@angular/core";
import { GatewayClubDialogComponent } from "./gateway-club-dialog/gateway-club-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models";
import { MasterService, GlobalService } from "@source/app/_services";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";

@Component({
  selector: "app-gateway-club",
  templateUrl: "./gateway-club.component.html",
  styleUrls: ["./gateway-club.component.scss"],
})
export class GatewayClubComponent extends UnSubscriber implements OnInit {
  constructor(private dialog: MatDialog, private _MasterService: MasterService, public _GlobalService: GlobalService) {
    super();
  }

  ngOnInit() {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.GATEWAYNDEVICECLUB, DEFAULT_TABLE_COLUMNS.GATEWAYNDEVICECLUB));
    this.GetGatewayClubMaster();
  }

  // #region Variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  RID: number = 0;
  // #endregion

  GetGatewayClubMaster() {
    this.anotherSubscription = this._MasterService.GetGatewaynDeviceClubMaster(true).subscribe((res: any) => {
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
    const dialogRef = this.dialog.open(GatewayClubDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.GetGatewayClubMaster();
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
