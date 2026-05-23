import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { TableRowPipe } from "@source/app/_pipe/table-row.pipe";
import { MatCheckboxModule } from "@angular/material/checkbox";

@Component({
  selector: "dynamic-mat-columns",
  templateUrl: "./dynamic-mat-columns.component.html",
  styleUrls: ["./dynamic-mat-columns.component.scss"],
  imports: [CommonModule, MatTableModule, TableRowPipe, MatSortModule, MatCheckboxModule],
  standalone: true,
})
export class DynamicMatColumnsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() row!: any;
  @Input() item!: any;
}
