import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cls_TableColumns } from '@source/app/_shared/dynamic-table/dynamic-table.component';
import { UnSubscriber } from '@source/app/_shared/UnSubscriber';

@Component({
  selector: 'app-rainfall-reading-location',
  templateUrl: './rainfall-reading-location.component.html',
  styleUrls: ['./rainfall-reading-location.component.scss']
})
export class RainfallReadingLocationComponent extends UnSubscriber implements OnInit  {

  constructor(){
    super();
  }

  ngOnInit(): void {

  }

  // #region variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns:string[]=[];
  // #endregion

}
