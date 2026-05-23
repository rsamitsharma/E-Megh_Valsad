import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";

const MAT_MODULES = [MatTooltipModule, MatRippleModule, MatDialogModule];
@Component({
  selector: "app-dynamic-dialog",
  templateUrl: "./dynamic-dialog.component.html",
  styleUrls: ["./dynamic-dialog.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, MAT_MODULES],
})
export class DynamicDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DynamicDialogComponent>, @Inject(MAT_DIALOG_DATA) data: DynamicDialogModal) {
    this.data = data;
  }

  ngOnInit(): void {}
  data = new DynamicDialogModal();
}

export class DynamicDialogModal {
  innerContent?: any;
  Title?: string;
  okButton?: string;
  cancelButton?: string;
  width: string = "99%";
}
