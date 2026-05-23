import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.scss"],
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) data: ConfirmationDialogData) {
    this.message = data.message;
    this.title = data.title;
    this.okButton = data.okButton;
    this.cancelButton = data.cancelButton;
  }

  ngOnInit(): void {}

  message: string = '';
  title: string = "";
  okButton: string = "Confirm";
  cancelButton: string = "Cancel";
}

interface ConfirmationDialogData {
  message: string;
  title: string;
  okButton: string;
  cancelButton: string;
}
