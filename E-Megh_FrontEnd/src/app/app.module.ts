import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "./_shared/shared.module";
import { ToastrModule } from "ngx-toastr";
import { DatePipe, Location } from "@angular/common";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LogInComponent } from "./account/log-in/log-in.component";
import { AgmCoreModule } from "@agm/core";
import { environment } from "@source/environments/environment";
import { ExcelToJsonDialogComponent } from "./excel-to-json-dialog/excel-to-json-dialog.component";
import { PredictionComponent } from "./prediction/prediction.component";
import { GoogleChartsModule } from "angular-google-charts";
import { GraphdashboardComponent } from "./graphdashboard/graphdashboard.component";
import { MatIconModule } from "@angular/material/icon";
import { GoogleMapsModule } from "@angular/google-maps";
import { MatPaginatorModule } from "@angular/material/paginator";
import { AffectedVillageChartComponent } from './affected-village-chart/affected-village-chart.component';
import { PredictionTidalchartComponent } from './prediction-tidalchart/prediction-tidalchart.component';
import { FulldashboardComponent } from './fulldashboard/fulldashboard.component';
import { GuestUserComponent } from './account/log-in/guest-user/guest-user.component';
import { UnifiedDashboardComponent } from './unified-dashboard/unified-dashboard.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, LogInComponent, ExcelToJsonDialogComponent, PredictionComponent, GraphdashboardComponent, AffectedVillageChartComponent, PredictionTidalchartComponent, FulldashboardComponent, GuestUserComponent, UnifiedDashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    MatIconModule,
    GoogleChartsModule,
    MatPaginatorModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-right",
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: "increasing",
    }),
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAP_KEY,
      libraries: ["places", "drawing"],
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe, Location],
  bootstrap: [AppComponent],
})
export class AppModule {}
