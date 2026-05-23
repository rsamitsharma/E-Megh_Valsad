import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactsComponent } from "./contacts/contacts.component";
import { DangerCategoryComponent } from "./danger-category/danger-category.component";
import { DistrictComponent } from "./district/district.component";
import { EmailAdminComponent } from "./email-admin/email-admin.component";
import { MenuComponent } from "./menu/menu.component";
import { RaingaugeStationComponent } from "./raingauge-station/raingauge-station.component";
import { ReadingLocationComponent } from "./reading-location/reading-location.component";
import { RefreshTimeComponent } from "./refresh-time/refresh-time.component";
import { SimComponent } from "./sim/sim.component";
import { SirenSensorComponent } from "./siren-sensor/siren-sensor.component";
import { StateComponent } from "./state/state.component";
import { TalukaComponent } from "./taluka/taluka.component";
import { VillageComponent } from "./village/village.component";
import { WarningRuleComponent } from "./warning-rule/warning-rule.component";
import { TypeComponent } from "./type/type.component";
import { GatewayComponent } from "./gateway/gateway.component";
import { GatewayClubComponent } from "./gateway-club/gateway-club.component";
import { DeviceMasterComponent } from "./device-master/device-master.component";
import { ReservoirComponent } from "./reservoir/reservoir.component";
import { LevelMasterComponent } from "./level-master/level-master.component";
import { RainfallReadingLocationComponent } from './rainfall-reading-location/rainfall-reading-location.component';

const routes: Routes = [
  { path: "contacts", component: ContactsComponent },
  { path: "danger-category", component: DangerCategoryComponent },
  { path: "district", component: DistrictComponent },
  { path: "email-admin", component: EmailAdminComponent },
  { path: "gateway", component: GatewayComponent },
  { path: "gateway-club", component: GatewayClubComponent },
  { path: "menu", component: MenuComponent },
  { path: "raingauge-station", component: RaingaugeStationComponent },
  { path: "reading-location", component: ReadingLocationComponent },
  { path: "rainfall-reading-location", component:RainfallReadingLocationComponent},
  { path: "refresh-time", component: RefreshTimeComponent },
  { path: "sim", component: SimComponent },
  { path: "siren-sensor", component: SirenSensorComponent },
  { path: "state", component: StateComponent },
  { path: "taluka", component: TalukaComponent },
  { path: "village", component: VillageComponent },
  { path: "warning-rule", component: WarningRuleComponent },
  { path: "type", component: TypeComponent },
  { path: "device", component: DeviceMasterComponent },
  { path: "reservoir", component: ReservoirComponent },
  { path: "level", component: LevelMasterComponent },
  { path: "", redirectTo: "village", pathMatch: "full" },
  { path: "**", redirectTo: "village" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})
export class MasterRoutingModule {}
