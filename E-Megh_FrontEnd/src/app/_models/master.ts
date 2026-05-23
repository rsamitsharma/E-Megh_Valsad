export class ClsContactClubMaster {
  CCID?: number;
  TypeID?: number;
  ContactID?: number;
  MasterID?: number;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class Cls_ContactList {
  ContactList?: ClsContactClubMaster[];
}

export class ClsContactMaster {
  ContactID?: number;
  ContactName?: string;
  gContactName?: string;
  Designation?: string;
  MobileNo?: string;
  EMail?: string;
  Remarks?: string;
  VillageID?: number;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class cls_DailyReadingEffectedVillages {
  EVID?: number;
  DRID?: number;
  VillageID?: number;
  WarningRuleID?: number;
  IsSMS?: boolean;
  ISEMail?: boolean;
}

export class cls_DailyReadingRecord {
  DRID?: number;
  // DistrictID?: number;
  EDATE?: string;
  ETIME?: string;
  WATERLEVEL?: number;
  // WaterLevel_mA?: number;
  READINGLID?: number;
  READBY?: string;
  REMARKS?: string;
  TREND?: string;
  DANGERWATERLEVEL?: number;
  MINWATERLEVEL?: number;
  MAXWATERLEVEL?: number;
  // EDateTime?: Date;
  // ErrorData?: boolean;
  // BetteryLevel?: number;
  // SingleLevel?: number;
  // IsSkip?: boolean;
  // SkipReason?: string;
}

export class ClsDangerCategoryMaster {
  DangerCategoryID?: number;
  DangerCategoryName?: string;
  gDangerCategoryName?: string;
  ColorCode?: string;
  Remarks?: string;
  OrderNo?: number;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class cls_DeviceLog {
  RID?: number;
  SirenStartDate?: string;
  SirenStartUserID?: number;
  SirenStartMobileNo?: string;
  VillageID?: number;
  Category?: string;
}

export class cls_DeviceMaster {
  DeviceMasterID?: number;
  DeviceName?: string;
  DeviceType?: number;
  CompanyName?: string;
  SerialNo?: string;
  Type?: string;
  Warrenty?: string;
  Remarks?: string;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class cls_DistrictMaster {
  DistrictID?: number;
  DistrictName?: string;
  GDistrictName?: string;
  StateID?: number;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class ClsEMailAdminMaster {
  RID?: number;
  MName?: string;
  mShortName?: string;
  CommEmailID?: string;
  IsActive?: boolean;
  EmailID?: string;
  HostName?: string;
  PortNumber?: string;
  SSN?: boolean;
  Password?: string;
  IsEmailActive?: boolean;
}

export class cls_ErrorMessage {
  ErrorID?: number;
  ErrorMessage?: string;
}

export class ClsGatewayMaster {
  GatewayMasterID?: number;
  GatewayName?: string;
  CompanyName?: string;
  GatewayIMEI?: string;
  Type?: string;
  Warrenty?: string;
  Remarks?: string;
  PurchasedDate?: string;
  InvoiceNo?: string;
  Comments?: string;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class cls_GatewayRaingaugeData {
  GatewayRaingaugeDataID?: number;
  RDatetime?: string;
  RaingaugeLocationID?: number;
  GatewayMasterID?: number;
  GatewayIMEI?: number;
  Reading?: number;
  CurrentIP?: string;
  IsPowerOn?: boolean;
  BetteryLevel?: number;
  SingleLevel?: number;
  IsReal?: boolean;
  PowerLevel?: number;
}

export class cls_RaingaugeLocationMaster {
  RaingaugeLocationID?: number;
  RaingaugeLocationName?: string;
  DisctrictID?: number;
  SAddress?: string;
  Latitude?: number;
  Longitude?: number;
  GatewayMasterID?: number;
  GatewayIMEI?: number;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class cls_GatewaySensorData {
  GatewaySensorDataID?: number;
  // GatewayMasterID?: number;
  GatewayIMEI?: number;
  Reading?: number;
  // Reading_mA?: number;
  RDateTime?: string;
  CurrentIP?: string;
  IsPowerOn?: boolean;
  BetteryLevel?: number;
  SingleLevel?: number;
  // IsReal?: boolean;
  PowerLevel?: number;
}

export class ClsReadingLocationMaster {
  ReadingLocationID?: number;
  DisctrictID?: number;
  ReadingLocationName?: string;
  // gLocationName?: string;
  RiverName?: string;
  // gRiverName?: string;
  Location?: string;
  // gLocation?: string;
  Latitude?: number;
  Longitude?: number;
  Altitude?: number;
  // GatewayMasterID?: number;
  // GatewayIMEI?: number;
  // Resistance?: number;
  // MilliAmpsMin?: number;
  // MilliAmpsMax?: number;
  RangeHeightMin?: number;
  RangeHeightMax?: number;
  // DangerHeight?: number;
  WarningLevel?: number;
  DangerWaterLevel?: number;
  // WarningLevel?: number;
  // VoltagePerMeter?: number;
  // ActualVoltagePerMeter?: number;
  // ZeroLevelVotage?: number;
  // AdjustMeter?: number;
  // DataRefreshMin?: number;
  MaxTimeDuration?: number;
  IsManualEntry?: boolean;
  Remarks?: string;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class cls_ReadingNotificationLog {
  RID?: number;
  RType?: string;
  RDate?: string;
  SStatus?: string;
}

export class ClsRefreshTimeMaster {
  RID?: number;
  ChartRefreshTime?: number;
  AlertSMSRefreshTime?: number;
  CurrentReadingRefreshTime?: number;
  SirenRefreshTime?: number;
}

export class cls_SentSMS {
  RID?: number;
  SDateTime?: string;
  DangerCategoryName?: string;
  VillageName?: string;
  WaterLevel?: number;
  ContactName?: string;
  CMobileNo?: string;
  SMessage?: string;
}

export class cls_GatewaynDeviceClubMaster {
  GatewaynDeviceClubMasterID?: number;
  GatewaynDeviceClubName?: string;
  DeviceMasterID?: number;
  GatewayMasterID?: number;
  SIMID?: number;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class ClsSIMMaster {
  SIMID?: number;
  CompanyName?: string;
  PhoneNo?: string;
  isPrepaid?: boolean;
  TariffPlan?: string;
  BillCycle?: string;
  SIMNo?: string;
  LastDate?: string;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class ClsSirenLocationMaster {
  SirenLocationID?: number;
  SirenLocationName?: string;
  DisctrictID?: number;
  GatewayMasterID?: number;
  GatewayIMEI?: number;
  SAddress?: string;
  Latitude?: number;
  Longitude?: number;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class cls_SMSCounter {
  RID?: number;
  CDate?: string;
  MobileNo?: string;
  Messages?: string;
  STypes?: string;
  MStatus?: boolean;
  SentSMSCounter?: number;
}

export class cls_SMSUtility {
  RID?: number;
  BaseURL?: string;
  UserID?: string;
  Pwd?: string;
  SenderID?: string;
  isActive?: boolean;
  MunID?: number;
  EntityID?: string;
  SMSCredit?: number;
  SMSCounter?: number;
  SMSRemains?: number;
}

export class ClsStateMaster {
  StateID?: number;
  StateName?: string;
  GStateName?: string;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class ClsTalukaMaster {
  TalukaID?: number;
  TalukaName?: string;
  gTalukaName?: string;
  DistrictID?: number;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class cls_TidalData {
  TidalDataID?: number;
  ReadingLocationID?: number;
  TDate?: string;
  TTime?: string;
  TType?: number;
  Height?: number;
  CreatedBy?: number;
  CreatedDate?: Date;
}

export class ClsTypeMaster {
  TypeID?: number;
  TypeName?: string;
  gTypeName?: string;
  IsActive?: boolean;
}

export class cls_UserReadingLocation {
  RID?: number;
  UserID?: number;
  ReadingLocationID?: number;
  IsActive?: boolean;
  IsDefault?: boolean;
}

export class cls_UserMaster {
  UID?: number;
  UserID?: string;
  Pword?: string;
  FirstName?: string;
  LastName?: string;
  EMail?: string;
  Mobile?: number;
  UserType?: number;
  DistrictID?: number;
  IsAdmin?: boolean;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
  ReadingLocationList?: cls_UserReadingLocation[];
  MenuDetails?: cls_UserMenuPermission[];
}

export class ClsUserMasterReadingLocations {
  ReadingLocationID?: number;
  GatewayMasterID?: number;
  GatewayIMEI?: number;
  Resistance?: number;
  MilliAmpsMin?: number;
  MilliAmpsMax?: number;
  AdjustMeter?: number;
  DataRefreshMin?: number;
  IsActive?: Boolean;
  CreatedBy?: number;
}

export class cls_UserMenuPermission {
  RID?: number;
  ParentMenuID?: number;
  MenuID?: number;
  UserID?: number;
  canAdd?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  canView?: boolean;
}

export class ClsUserTypeMaster {
  UserTypeID?: number;
  UserType?: string;
  MunID?: number;
}

export class cls_UserTypeMenuPermission {
  RID?: number;
  MenuID?: number;
  UserTypeID?: number;
  canADD?: boolean;
  canEDIT?: boolean;
  canDELETE?: boolean;
  canVIEW?: boolean;
}

export class ClsVillageMaster {
  VillageID?: number;
  TalukaID?: number;
  VillageName?: string;
  gVillageName?: string;
  Latitude?: number;
  Longitude?: number;
  Altitude?: number;
  Remarks?: string;
  ReadingLocationID?: number;
  KMFromRLID?: number;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
  TotalPopulation?: number;
  TotalHouseHold?: number;
  ShelterCapacity?: number;
}

export class ClsWarningRuleMaster {
  WarningRuleMasterID?: number;
  DangerCategoryID?: number;
  VillageID?: number;
  ReadingLocationID?: number;
  WaterLowerLevel?: number;
  WaterHigerLevel?: number;
  AutoSMS?: boolean;
  AutoEMail?: boolean;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class Cls_WarningRuleFinalData {
  Details?: ClsWarningRuleMaster[];
}

// export class ClsWMenuMaster {
//   RID?: number;
//   MenuID?: number;
//   MenuName?: string;
//   MenuCaption?: string;
//   Possition?: number;
//   URL?: string;
//   Description?: string;
//   UserId?: number;
//   SysDate?: Date;
//   IsVisible?: boolean;
// }

export class ClsMenuMaster {
  MenuID?: number;
  ParentMenuID?: number;
  MenuName?: string;
  MenuCaption?: string;
  RouterPath?: string;
  iOrder?: number;
  IsActive?: boolean;
}

export class cls_GatewaySirenData {
  GatewaySirenDataID?: number;
  SirenLocationID?: number;
  // GatewayMasterID?: number;
  GatewayIMEI?: number;
  RDateTime?: string;
  CurrentIP?: string;
  IsPowerOn?: boolean;
  BetteryLevel?: number;
  SingleLevel?: number;
  // IsReal?: boolean;
  PowerLevel?: number;
}

export class cls_ReservoirMaster {
  ReservoirID?: number;
  ReservoirName?: string;
  ReservoirLocation?: string;
  ReservoirLatitude?: number;
  ReservoirLongitude?: number;
  KMFromCapital?: number;
  TotalLevelHeight?: number;
  DangerLevelHeight?: number;
  WarningLevelHeight?: number;
  NormalDischarge?: number;
  MaxDischarge?: number;
  MaxTimeDuration?: number;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class cls_ReservoirDischargeEntry {
  ReservoirDischargeEntryID?: number;
  ReservoirDischargeEntryDate?: string;
  ReservoirDischargeEntryTime?: string;
  ReservoirID?: number;
  TotalDischarge?: number;
  TotalTimetoReachedCapital?: number;
  CurrentHeight?: number;
  IsSkip?: boolean;
  TotalInflow?: number;
  SkipReason?: string;
  Remarks?: string;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
  GrossStorage?: number;
}

export class cls_levelMaster {
  LevelID?: number;
  LevelName?: string;
  LevelHeightFrom?: number;
  LevelHeightTo?: number;
  ReadingLocationID?: number;
  IsSMS?: boolean;
  SMSPeriod?: number;
  ContactID?: number;
  Remarks?: string;
  LevelContactList?: cls_LevelContactList[];
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class cls_LevelContactList {
  LevelContactID?: number;
  ContactID?: number;
  IsActive?: boolean;
}
