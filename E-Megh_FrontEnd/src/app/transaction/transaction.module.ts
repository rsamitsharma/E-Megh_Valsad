import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TransactionRoutingModule } from "./transaction-routing.module";
import { ReservoirDischargeEntryComponent } from "./reservoir-discharge-entry/reservoir-discharge-entry.component";
import { ReservoirDischargeEntryDialogComponent } from "./reservoir-discharge-entry/reservoir-discharge-entry-dialog/reservoir-discharge-entry-dialog.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../_shared/shared.module";
import { DailyReadingComponent } from "./daily-reading/daily-reading.component";
import { DailyReadingDialogComponent } from "./daily-reading/daily-reading-dialog/daily-reading-dialog.component";
import { TidalDataComponent } from "./tidal-data/tidal-data.component";
import { TidalDataDialogComponent } from "./tidal-data/tidal-data-dialog/tidal-data-dialog.component";

@NgModule({
  declarations: [TidalDataComponent,TidalDataDialogComponent, ReservoirDischargeEntryComponent, ReservoirDischargeEntryDialogComponent, DailyReadingComponent, DailyReadingDialogComponent],
  imports: [CommonModule, TransactionRoutingModule, FormsModule, SharedModule],
})
export class TransactionModule {}
