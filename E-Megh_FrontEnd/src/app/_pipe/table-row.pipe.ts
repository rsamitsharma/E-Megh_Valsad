import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "TableRow",
  standalone: true,
})
export class TableRowPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    const row = value;
    if (!row || !args?.length) return "";
    const rowFunction: any = args[0];
    let funValue: string = eval(rowFunction);
    return funValue?.replace(/undefined|null/g, "-");
  }
}
