import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { MaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AsteriskMessageDirective } from "../_directive/asterisk-message.directive";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { OnlyNumberDirective } from "../_directive/OnlyNumber.directive";
import { InputSelectComponent } from "./input-select/input-select.component";
import { InputFieldDirective } from "../_directive/Input/input-field.directive";
import { ReadOnlyDirective } from "../_directive/Input/read-only.directive";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AsteriskDirective } from "../_directive/asterisk.directive";
import { CustomIfDirective } from "../_directive/customIf.directive";
import { DynamicTableComponent } from "./dynamic-table/dynamic-table.component";
import { TableRowPipe } from "../_pipe/table-row.pipe";
import { FilterListPipe } from "../_pipe/filter-list.pipe";
import { ReqResInterceptor } from "../_interceptors/req-res.interceptor";
import { DynamicMatColumnsComponent } from "./dynamic-mat-columns/dynamic-mat-columns.component";
import { MapDialogComponent } from "./map-dialog/map-dialog.component";
import { AgmCoreModule } from "@agm/core";
import { environment } from "@source/environments/environment";
import { GoogleChartsModule } from "angular-google-charts";

const COMMON_COMPONENTS = [ConfirmationDialogComponent, InputSelectComponent, MapDialogComponent];

const STANDALONE_COMPONENTS = [CustomIfDirective, DynamicTableComponent, DynamicMatColumnsComponent];
const STANDALONE_PIPE = [TableRowPipe, FilterListPipe];

const STANDALONE_DIRECTIVES = [AsteriskMessageDirective, AsteriskDirective, OnlyNumberDirective, ReadOnlyDirective, InputFieldDirective];

const PACKAGES = [MaterialModule, NgbModule];
@NgModule({
  declarations: [
    //Common
    [...COMMON_COMPONENTS],
  ],

  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    GoogleChartsModule,
    [...PACKAGES],
    [...STANDALONE_COMPONENTS],
    [...STANDALONE_DIRECTIVES],
    [...STANDALONE_PIPE],
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAP_KEY,
      libraries: ["places", "drawing"],
    }),
  ],
  exports: [RouterModule, CommonModule, GoogleChartsModule, [...PACKAGES], [...COMMON_COMPONENTS], [...STANDALONE_COMPONENTS], [...STANDALONE_DIRECTIVES], [...STANDALONE_PIPE]],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ReqResInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
