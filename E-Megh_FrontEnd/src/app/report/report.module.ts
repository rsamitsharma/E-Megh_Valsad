import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReportRoutingModule } from "./report-routing.module";
import { GatewayRaingaugeDataComponent } from "./gateway-raingauge-data/gateway-raingauge-data.component";
import { GatewaySensorDataComponent } from "./gateway-sensor-data/gateway-sensor-data.component";
import { GatewaySironDataComponent } from "./gateway-siron-data/gateway-siron-data.component";
import { AffectedVillageComponent } from "./affected-village/affected-village.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../_shared/shared.module";
import { GatewayRaingaugeDataDialogComponent } from "./gateway-raingauge-data/gateway-raingauge-data-dialog/gateway-raingauge-data-dialog.component";
import { GatewaySironDataDialogComponent } from "./gateway-siron-data/gateway-siron-data-dialog/gateway-siron-data-dialog.component";
import { GatewaySensorDataDialogComponent } from "./gateway-sensor-data/gateway-sensor-data-dialog/gateway-sensor-data-dialog.component";
import { AgmCoreModule } from "@agm/core";
import { environment } from "@source/environments/environment";
import { PredictionReportComponent } from "./prediction-report/prediction-report.component";
import { MatIconModule } from "@angular/material/icon";
import { DailyReadingReportComponent } from './daily-reading-report/daily-reading-report/daily-reading-report.component';
import { DailyReadingReportDailogComponent } from './daily-reading-report/daily-reading-report/daily-reading-report-dialog/daily-reading-report-dailog/daily-reading-report-dailog.component';

@NgModule({
  declarations: [GatewayRaingaugeDataComponent, GatewaySensorDataComponent, GatewaySironDataComponent, AffectedVillageComponent, GatewayRaingaugeDataDialogComponent, GatewaySironDataDialogComponent, GatewaySensorDataDialogComponent, PredictionReportComponent, DailyReadingReportComponent, DailyReadingReportDailogComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    SharedModule,
    MatIconModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAP_KEY,
      libraries: ["places", "drawing"],
    }),
  ],
})
export class ReportModule { }
