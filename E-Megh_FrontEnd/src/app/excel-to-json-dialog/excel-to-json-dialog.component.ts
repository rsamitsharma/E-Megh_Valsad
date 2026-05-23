import { Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { GlobalService } from "../_services";
import { animate, state, style, transition, trigger } from "@angular/animations";


@Component({
  selector: "lib-excel-to-json-dialog",
  templateUrl: "./excel-to-json-dialog.component.html",
  styleUrls: ["./excel-to-json-dialog.component.css"],
  animations: [trigger("indicatorRotate", [state("collapsed", style({ transform: "rotate(0deg)" })), state("expanded", style({ transform: "rotate(180deg)" })), transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4,0.0,0.2,1)"))])],
})
export class ExcelToJsonDialogComponent {
  constructor(private dialogRef: MatDialogRef<ExcelToJsonDialogComponent>, private toastr: ToastrService,public _GlobalService: GlobalService, @Inject(MAT_DIALOG_DATA) data: any) {
    this.dialogData = data;
  }

  @ViewChild("OpenFileUpload") OpenFileUpload!: ElementRef;
  ExcelFile!: string;
  dialogData: any;

  ChooseFile(type: number, event: any) {

    if (type === 1) {
      this.OpenFileUpload?.nativeElement.click();
    } else if (type === 2) {
      const fileFormats: string[] = ["xls", "xlsx", "csv"];
      const Type = event.target.files[0].name?.split(".")?.at(-1);
      if (fileFormats.find(item => item === Type)) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          reader.readAsBinaryString(file);
          reader.onload = () => {
            this.ExcelFile = reader.result as string;
            const tempList = this._GlobalService.convertBase64ExcelToJSON(this.ExcelFile);
            this.dialogRef.close(tempList);
          };
        }
      } else {
        this.toastr.error("Invalid File Format", "Oops");
      }
    }
  }
}
