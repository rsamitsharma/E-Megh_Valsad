import { CommonModule } from "@angular/common";
import { Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { TableRowPipe } from "@source/app/_pipe/table-row.pipe";
import { DynamicMatColumnsComponent } from "../dynamic-mat-columns/dynamic-mat-columns.component";

type ColumnType = "NUMBER" | "DATE" | "STRING" | "CHECK_BOX" | "FUNCTION" | "TIME";
export class Cls_TableColumns {
  columnKey: string = "";
  headingName: string = "";
  valueKey: string = "";
  className: string = "";
  columnType: ColumnType = "STRING";
}

@Component({
  selector: "app-dynamic-table",
  templateUrl: "./dynamic-table.component.html",
  styleUrls: ["./dynamic-table.component.scss"],
  standalone: true,
  imports: [CommonModule, TableRowPipe, DynamicMatColumnsComponent],
})
export class DynamicTableComponent {
  constructor() {}

  @Input() headerList: Cls_TableColumns[] = [];
  @Input() masterList: any[] = [];
  @ContentChild("header", { static: false }) headerTemplateRef!: TemplateRef<any>;
  @ContentChild("body", { static: false }) bodyTemplateRef!: TemplateRef<any>;
}
