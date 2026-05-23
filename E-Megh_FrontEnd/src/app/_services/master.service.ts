import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "@source/environments/environment";
import { ClsContactClubMaster, ClsContactMaster, ClsDangerCategoryMaster, ClsEMailAdminMaster, ClsGatewayMaster, cls_RaingaugeLocationMaster, ClsReadingLocationMaster, ClsRefreshTimeMaster, cls_GatewaynDeviceClubMaster, ClsSIMMaster, ClsSirenLocationMaster, ClsTypeMaster, ClsVillageMaster, ClsTalukaMaster, ClsStateMaster, cls_DistrictMaster, ClsUserTypeMaster, cls_DeviceMaster, ClsUserMasterReadingLocations, cls_GatewayRaingaugeData, cls_TidalData, cls_GatewaySirenData, cls_GatewaySensorData, cls_UserMenuPermission, cls_UserMaster, Cls_WarningRuleFinalData, cls_ReservoirMaster, cls_DailyReadingRecord, cls_ReservoirDischargeEntry, cls_levelMaster } from "../_models/master";

@Injectable({
  providedIn: "root",
})
export class MasterService {
  // Subject for sidebar toggle events
  private sidebarToggledSource = new Subject<void>();
  sidebarToggled$ = this.sidebarToggledSource.asObservable();

  constructor(private http: HttpClient) {}

  // Method to trigger sidebar toggle
  toggleSidebar() {
    this.sidebarToggledSource.next();
  }

  readonly rootUrl = environment.url;
  private API = "/weather?lat=21.700739&lon=72.991613&appid=3d6fb206398e0036ee2ae85337940672";

  GetWhetherData() {
    return this.http.get(this.API);
  }

  //#region  Get

  GetMenuMaster() {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetMenuMaster`);
  }

  GetVillageMaster(IsAll: boolean, VillageID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetVillageMaster?IsAll=${IsAll}&VillageID=${VillageID}`);
  }

  GetTalukaMaster(TalukaID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetTalukaMaster?TID=${TalukaID}`);
  }

  GetContactMaster(IsAll: boolean, ContactID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetContactMaster?IsAll=${IsAll}&ContactID=${ContactID}`);
  }

  GetContactClubMaster(IsAll: boolean, ContactClubID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetContactClubMaster?IsAll=${IsAll}&ContactClubID=${ContactClubID}`);
  }

  GetDangerCategoryMaster(IsAll: boolean, DangerCategoryID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetDangerCategoryMaster?IsAll=${IsAll}&DangerCategoryID=${DangerCategoryID}`);
  }

  GetGatewayMaster(IsAll: boolean, FoxID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetGatewayMaster?IsAll=${IsAll}&GatewayMasterID=${FoxID}`);
  }

  GetSirenLocationMaster(IsAll: boolean, SirenID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetSirenLocationMaster?IsAll=${IsAll}&SirenLocationID=${SirenID}`);
  }

  GetWarningRuleMaster(IsAll: boolean, WarningID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetWarningRuleMaster?IsAll=${IsAll}&WarningRuleMasterID=${WarningID}`);
  }

  GetRaingaugeStationMaster(IsAll: boolean, RainGuageID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetRaingaugeLocationMaster?IsAll=${IsAll}&RaingaugeLocationID=${RainGuageID}`);
  }

  GetDisctrictMaster(DisctrictID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetDistrictMaster?DID=${DisctrictID}`);
  }

  GetTypeMaster(IsAll: boolean, TypeID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetTypeMaster?IsAll=${IsAll}&TypeID=${TypeID}`);
  }

  GetSimMaster(IsAll: boolean, SimID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetSimMaster?IsAll=${IsAll}&SIMID=${SimID}`);
  }

  GetRefreshTimeMaster(RefreshTimeID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetRefreshTimeMaster?RID=${RefreshTimeID}`);
  }

  GetReadingLocationMaster(IsAll: boolean, ReadingLocationID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetReadingLocationMaster?IsAll=${IsAll}&ReadingLocationID=${ReadingLocationID}`);
  }

  GetEmailAdminMaster(IsAll: boolean, RID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetEMailAdminMaster?IsAll=${IsAll}&RID=${RID}`);
  }

  GetUserMaster(IsAll: boolean, UserID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetUserMaster?IsAll=${IsAll}&RID=${UserID}`);
  }

  GetGatewaynDeviceClubMaster(IsAll: boolean) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetGatewaynDeviceClubMaster?IsAll=${IsAll}`);
  }

  GetStateMaster(SID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetStateMaster?SID=${SID}`);
  }

  GetUserTypeMaster(UserTypeID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetUserTypeMaster?UserTypeID=${UserTypeID}`);
  }

  GetDeviceMaster(IsAll: boolean, DeviceId: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetDeviceMaster?IsAll=${IsAll}&DeviceMasterID=${DeviceId}`);
  }

  GetGatewayRaingaugeData(GRID: number, FromDate: string, ToDate: string) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetGatewayRaingaugeData?GatewayRaingaugeDataID=${GRID}&FromDate=${FromDate}&ToDate=${ToDate}`);
  }

  GetTidalData(ReadingLocationID: number , TopRowNumber: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetTidalData?ReadingLocationID=${ReadingLocationID}&TopRowNumber=${TopRowNumber}`);
  }

  GetTidalData_Report(ReadingLocationID: number, TidalDataId: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetTidalData_Report?ReadingLocationID=${ReadingLocationID}&TidalDataId=${TidalDataId}`);
  }

  GetTidalDataDashboard(ReadingLocationID: number, FromDate: Date, ToDate: Date) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetTidalDataDashboard?ReadingLocationID=${ReadingLocationID}&FromDate=${FromDate}&ToDate=${ToDate}`);
  }

  GetGatewaySirenData(GatewaySirenDataID: number, FromDate: string, ToDate: string) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetGatewaySirenData?GatewaySirenDataID=${GatewaySirenDataID}&FromDate=${FromDate}&ToDate=${ToDate}`);
  }

  GetGatewaySensorData(ReadingLocationID: number, FromDate: string, ToDate: string) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetGatewaySensorData?ReadingLocationID=${ReadingLocationID}&FromDate=${FromDate}&ToDate=${ToDate}`);
  }

  GetUserTypePermission(UserTypeID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetUserTypePermission?UserTypeID=${UserTypeID}`);
  }

  GetUserMenuPermission(UserMenuID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetUserMenuPermission?UerMenuID=${UserMenuID}`);
  }

  GetReservoirMaster(IsAll: boolean, ReservoirID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetReservoirMaster?IsAll=${IsAll}&ReservoirID=${ReservoirID}`);
  }

  GetReservoirDischargeEntry(ReservoirID: number, ReservoirDischargeEntryID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetReservoirDischarge?ReservoirID=${ReservoirID}&ReservoirDischargeEntryID=${ReservoirDischargeEntryID}`);
  }

  GetDailyReadingRecord(ReadingLocationID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetDailyReadingData?ReadingLocationID=${ReadingLocationID}`);
  }
  GetDailyReadingDataReport(ReadingLocationID: number, DailyReadingId: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetDailyReadingDataReport?ReadingLocationID=${ReadingLocationID}&DailyReadingId=${DailyReadingId}`);
  }
  GetUserMenuMaster(UserID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetUserMenuMaster?UserID=${UserID}`);
  }

  GetLevelMaster(IsAll: boolean, LevelID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetLevelMaster?IsAll=${IsAll}&LevelID=${LevelID}`);
  }

  GetAffectedVillages(ReadingLocationID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetAffectedVillage?ReadingLocationID=${ReadingLocationID}`);
  }

  GetDashboardSensorData() {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetDashboardSensorData`);
  }

  GetDashboardSirenData() {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetDashboardSirenData`);
  }

  GetPredictionReport(StartDateTime: string, EndDateTime: string) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetPredictionReport?StartDateTime=${StartDateTime}&EndDateTime=${EndDateTime}`);
  }

  // GetDailyReadingData(ReadingLocationID: number) {
  //   return this.http.get(`${this.rootUrl}/api/MasterController/GetDailyReadingData?ReadingLocationID=${ReadingLocationID}`);
  // }
  GetDailyReadingData(ReadingLocationID: number, TopRowNumber: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetDailyReadingData`, {
      params: {
        ReadingLocationID: ReadingLocationID.toString(),
        TopRowNumber: TopRowNumber.toString(),
      },
    });
  }

  GetData(ReadingLocationID: number, Days: string) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetData?ReadingLocationID=${ReadingLocationID}&Days=${Days}`);
  }

  GetPredictionData() {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetPredictionData`);
  }
  GetPredictionDataWithVillages(ReadingLocationID: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetPredictionDataWithVillages?ReadingLocationID=${ReadingLocationID}`);
  }

  GetRainFallReadingDataHourly() {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetRainFallReadingDataHourly`);
  }

  GetPredictionWihtoutDamOutFlow_NODE() {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetPredictionWihtoutDamOutFlow_NODE`);
  }

  GetTopRowNumber(ReadingLocationID: number, Days: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetTopRowNumber?ReadingLocationID=${ReadingLocationID}&Days=${Days}`);
  }

  GetTopRowNumberTidal(ReadingLocationID: number, Days: number) {
    return this.http.get(`${this.rootUrl}/api/MasterController/GetTopRowNumberTidal?ReadingLocationID=${ReadingLocationID}&Days=${Days}`);
  }

  GetUserByMobileNo(mobileno: string) {
    return this.http.get(`${this.rootUrl}/api/AccountController/UserLoginByMobileNo?mobileno=${mobileno}`);
  }

  sendOTP(mobileno: string) {
    return this.http.get(`${this.rootUrl}/api/AccountController/sendOTP?mobileno=${mobileno}`);
  }

  //#endregion

  //#region Post

  AddMenuMaster(body: any) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddMenuMaster`, body);
  }

  AddVillageMaster(data: ClsVillageMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddVillageMaster`, data);
  }

  AddContactMaster(data: ClsContactMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddContactMaster`, data);
  }

  AddContactClubMaster(data: ClsContactClubMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddContactClubMaster`, data);
  }

  AddDangerCategoryMaster(data: ClsDangerCategoryMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddDangerCategoryMaster`, data);
  }

  AddGatewayMaster(data: ClsGatewayMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddGatewayMaster`, data);
  }

  AddSirenSensorLocationMaster(data: ClsSirenLocationMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddSirenLocationMaster`, data);
  }

  AddWarningRuleMaster(data: Cls_WarningRuleFinalData) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddWarningRuleMaster`, data);
  }

  AddRaingaugeStationMaster(data: cls_RaingaugeLocationMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddRaingaugeLocationMaster`, data);
  }

  AddTypeMaster(data: ClsTypeMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddTypeMaster`, data);
  }

  AddSimMaster(data: ClsSIMMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddSIMMaster`, data);
  }

  AddRefreshTimeMaster(data: ClsRefreshTimeMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddRefreshTimeMaster`, data);
  }

  AddReadingLocationMaster(data: ClsReadingLocationMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddReadingLocationMaster`, data);
  }

  AddEmailAdminMaster(data: ClsEMailAdminMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddEmailAdminMaster`, data);
  }

  AddGatewaynDeviceClubMaster(data: cls_GatewaynDeviceClubMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddGatewaynDeviceClubMaster`, data);
  }

  AddTalukaMaster(data: ClsTalukaMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddTalukaMaster`, data);
  }

  AddStateMaster(data: ClsStateMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddStateMaster`, data);
  }

  AddDistrictMaster(data: cls_DistrictMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddDistrictMaster`, data);
  }

  AddUserTypeMaster(data: ClsUserTypeMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddUsertypeMaster`, data);
  }

  AddDeviceMaster(data: cls_DeviceMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddDeviceMaster`, data);
  }

  AddUserMasterReadingLocation(data: ClsUserMasterReadingLocations) {
    return this.http.put(`${this.rootUrl}/api/MasterController/AddReadingLocation_Admin`, data);
  }

  AddGatewayRainGaugeData(data: cls_GatewayRaingaugeData) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddGatewayRaingaugeData`, data);
  }

  AddTidalData(data: cls_TidalData) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddTidalData`, data);
  }

  AddGatewaySirenData(data: cls_GatewaySirenData) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddGatewaySirenData`, data);
  }

  AddGatewaySensorData(data: cls_GatewaySensorData) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddGatewaySensorData`, data);
  }

  AddUserMenuMaster(data: cls_UserMenuPermission) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddUserMenuMaster`, data);
  }

  AddUserMaster(data: cls_UserMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddUserMaster`, data);
  }

  AddUserMenuPermission(data: cls_UserMenuPermission) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddUserMenuPermission`, data);
  }

  AddReservoirMaster(data: cls_ReservoirMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddReservoirMaster`, data);
  }

  AddReservoirDischargeEntry(data: cls_ReservoirDischargeEntry) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddReservoirDischargeEntry`, data);
  }

  AddDailyReading(data: cls_DailyReadingRecord) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddDailyReading`, data);
  }

  AddLevelMaster(data: cls_levelMaster) {
    return this.http.post(`${this.rootUrl}/api/MasterController/AddLevelMaster`, data);
  }
  //#endregion
}
