import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GatewayRaingaugeDataComponent } from "./gateway-raingauge-data/gateway-raingauge-data.component";
import { GatewaySensorDataComponent } from "./gateway-sensor-data/gateway-sensor-data.component";
import { GatewaySironDataComponent } from "./gateway-siron-data/gateway-siron-data.component"; 
import { AffectedVillageComponent } from "./affected-village/affected-village.component";
import { PredictionReportComponent } from "./prediction-report/prediction-report.component";
import { DailyReadingComponent } from "../transaction/daily-reading/daily-reading.component";
import { DailyReadingReportComponent } from "./daily-reading-report/daily-reading-report/daily-reading-report.component";

const routes: Routes = [
  { path: "rainguagedata", component: GatewayRaingaugeDataComponent },  
  { path: "gateway-sensor-data", component: GatewaySensorDataComponent },
  { path: "gateway-siren-data", component: GatewaySironDataComponent },
  { path: "affected-village", component: AffectedVillageComponent },
  { path: "prediction-report", component: PredictionReportComponent },
  { path: "daily-reading-report", component: DailyReadingReportComponent },
  { path: "", redirectTo: "daily-reading-report", pathMatch: "full" },
  { path: "**", redirectTo: "daily-reading-report" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
