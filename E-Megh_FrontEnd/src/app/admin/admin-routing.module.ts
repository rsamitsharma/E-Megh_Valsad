import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { UserReadingLocationComponent } from "./user-reading-location/user-reading-location.component";
import { UserTypeComponent } from "./user-type/user-type.component";
import { UserTypePermissionComponent } from "./user-type-permission/user-type-permission.component";

const routes: Routes = [
  { path: "user", component: UserComponent },
  { path: "user-reading-location", component: UserReadingLocationComponent },
  { path: "user-type", component: UserTypeComponent },
  { path: "user-type-permission", component: UserTypePermissionComponent },
  { path: "", redirectTo: "user", pathMatch: "full" },
  { path: "**", redirectTo: "user" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
