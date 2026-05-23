import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { UserComponent } from "./user/user.component";
import { UserReadingLocationComponent } from "./user-reading-location/user-reading-location.component";
import { UserTypeComponent } from "./user-type/user-type.component";
import { UserTypePermissionComponent } from "./user-type-permission/user-type-permission.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../_shared/shared.module";
import { UserDialogComponent } from "./user/user-dialog/user-dialog.component";
import { UserReadingLocationDialogComponent } from "./user-reading-location/user-reading-location-dialog/user-reading-location-dialog.component";
import { UserTypeDialogComponent } from "./user-type/user-type-dialog/user-type-dialog.component";
import { UserTypePermissionDialogComponent } from "./user-type-permission/user-type-permission-dialog/user-type-permission-dialog.component";

@NgModule({
  declarations: [UserComponent, UserReadingLocationComponent, UserTypeComponent, UserTypePermissionComponent, UserDialogComponent, UserReadingLocationDialogComponent, UserTypeDialogComponent, UserTypePermissionDialogComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule, SharedModule],
})
export class AdminModule {}
