import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReservoirDischargeEntryComponent } from "./reservoir-discharge-entry/reservoir-discharge-entry.component";
import { DailyReadingComponent } from "./daily-reading/daily-reading.component";
import { TidalDataComponent } from "./tidal-data/tidal-data.component";

const routes: Routes = [
  { path: "reservoir-discharge-entry", component: ReservoirDischargeEntryComponent },
  { path: "daily-reading", component: DailyReadingComponent },
  { path: "tidal-data", component: TidalDataComponent },
  { path: "**", redirectTo: "daily-reading" },
  { path: "", redirectTo: "daily-reading", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule { }
