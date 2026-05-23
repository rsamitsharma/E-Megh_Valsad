import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LogInComponent } from "./account/log-in/log-in.component";
import { AuthGuard } from "./_guards/auth.guard";
import { UnAuthGuard } from "./_guards/un-auth.guard";
import { PredictionComponent } from "./prediction/prediction.component";
import { GraphdashboardComponent } from "./graphdashboard/graphdashboard.component";
import { AffectedVillageChartComponent } from "./affected-village-chart/affected-village-chart.component";
import { PredictionTidalchartComponent } from "./prediction-tidalchart/prediction-tidalchart.component";
import { FulldashboardComponent } from "./fulldashboard/fulldashboard.component";
import { GuestUserComponent } from "./account/log-in/guest-user/guest-user.component";
import { UnifiedDashboardComponent } from "./unified-dashboard/unified-dashboard.component";
const routes: Routes = [
  { path: "login", component: LogInComponent, canActivate: [UnAuthGuard] },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "graphdashboard", component: GraphdashboardComponent, canActivate: [AuthGuard] },
  { path: "unified-dashboard", component: UnifiedDashboardComponent, canActivate: [AuthGuard] },
  { path: "master", loadChildren: () => import("./Master/master.module").then(m => m.MasterModule), canActivate: [AuthGuard] },
  { path: "admin", loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule), canActivate: [AuthGuard] },
  { path: "transaction", loadChildren: () => import("./transaction/transaction.module").then(m => m.TransactionModule), canActivate: [AuthGuard] },
  { path: "report", loadChildren: () => import("./report/report.module").then(m => m.ReportModule), canActivate: [AuthGuard] },
  { path: "", redirectTo: "unified-dashboard", pathMatch: "full" },
  { path: "guest-user", component: GuestUserComponent, canActivate: [UnAuthGuard] },
  { path: "**", redirectTo: "page-not-found" },
  { path: "prediction", component: PredictionComponent, canActivate: [AuthGuard] },
  { path: "affected-village-chart", component: AffectedVillageChartComponent, canActivate: [AuthGuard] },
  { path: "prediction-tidalchart", component: PredictionTidalchartComponent, canActivate: [AuthGuard] },
  { path: "fulldashboard", component: FulldashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
