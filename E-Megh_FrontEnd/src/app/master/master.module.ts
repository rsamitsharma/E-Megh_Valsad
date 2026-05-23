import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MasterRoutingModule } from "./master-routing.module";
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
import { TypeComponent } from "./type/type.component";
import { VillageComponent } from "./village/village.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../_shared/shared.module";
import { ContactsDialogComponent } from "./contacts/contacts-dialog/contacts-dialog.component";
import { DistrictDialogComponent } from "./district/district-dialog/district-dialog.component";
import { EmailAdminDialogComponent } from "./email-admin/email-admin-dialog/email-admin-dialog.component";
import { MenuDialogComponent } from "./menu/menu-dialog/menu-dialog.component";
import { RaingaugeStationDialogComponent } from "./raingauge-station/raingauge-station-dialog/raingauge-station-dialog.component";
import { ReadingLocationDialogComponent } from "./reading-location/reading-location-dialog/reading-location-dialog.component";
import { RefreshTimeDialogComponent } from "./refresh-time/refresh-time-dialog/refresh-time-dialog.component";
import { SimDialogComponent } from "./sim/sim-dialog/sim-dialog.component";
import { SirenSensorDialogComponent } from "./siren-sensor/siren-sensor-dialog/siren-sensor-dialog.component";
import { StateDialogComponent } from "./state/state-dialog/state-dialog.component";
import { TalukaDialogComponent } from "./taluka/taluka-dialog/taluka-dialog.component";
import { TypeDialogComponent } from "./type/type-dialog/type-dialog.component";
import { VillageDialogComponent } from "./village/village-dialog/village-dialog.component";
import { DangerCategoryDialogComponent } from "./danger-category/danger-category-dialog/danger-category-dialog.component";
import { WarningRuleComponent } from "./warning-rule/warning-rule.component";
import { WarningRuleDialogComponent } from "./warning-rule/warning-rule-dialog/warning-rule-dialog.component";
import { GatewayComponent } from "./gateway/gateway.component";
import { GatewayDialogComponent } from "./gateway/gateway-dialog/gateway-dialog.component";
import { GatewayClubComponent } from "./gateway-club/gateway-club.component";
import { GatewayClubDialogComponent } from "./gateway-club/gateway-club-dialog/gateway-club-dialog.component";
import { DeviceMasterComponent } from "./device-master/device-master.component";
import { DeviceMasterDialogComponent } from "./device-master/device-master-dialog/device-master-dialog.component";
import { ReservoirComponent } from "./reservoir/reservoir.component";
import { ReservoirDialogComponent } from "./reservoir/reservoir-dialog/reservoir-dialog.component";
import { LevelMasterComponent } from "./level-master/level-master.component";
import { LevelMasterDialogComponent } from "./level-master/level-master-dialog/level-master-dialog.component";
import { RainfallReadingLocationComponent } from './rainfall-reading-location/rainfall-reading-location.component';

@NgModule({
  declarations: [ContactsComponent, DangerCategoryComponent, DistrictComponent, EmailAdminComponent, MenuComponent, RaingaugeStationComponent, ReadingLocationComponent, RefreshTimeComponent, SimComponent, SirenSensorComponent, StateComponent, TalukaComponent, TypeComponent, VillageComponent, ContactsDialogComponent, DistrictDialogComponent, EmailAdminDialogComponent, MenuDialogComponent, RaingaugeStationDialogComponent, ReadingLocationDialogComponent, RefreshTimeDialogComponent, SimDialogComponent, SirenSensorDialogComponent, StateDialogComponent, TalukaDialogComponent, TypeDialogComponent, VillageDialogComponent, DangerCategoryDialogComponent, WarningRuleComponent, WarningRuleDialogComponent, GatewayComponent, GatewayDialogComponent, GatewayClubComponent, GatewayClubDialogComponent, DeviceMasterComponent, DeviceMasterDialogComponent, ReservoirComponent, ReservoirDialogComponent, LevelMasterComponent, LevelMasterDialogComponent, RainfallReadingLocationComponent],
  imports: [CommonModule, MasterRoutingModule, FormsModule, SharedModule],
})
export class MasterModule {}
