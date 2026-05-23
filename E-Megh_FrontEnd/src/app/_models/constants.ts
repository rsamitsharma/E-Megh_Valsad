const DEFAULT_COLUMNS = {
  //Admin
  USER: [
    // {
    //   column: "RID",
    //   columnName: "#ID",
    // },
    {
      column: "UserID",
      columnName: "User ID",
    },
    // {
    //   column: "Pwd",
    //   columnName: "Password",
    // },
    {
      column: "UserTypeName",
      columnName: "User Type",
    },
    // {
    //   column: "LastName",
    //   columnName: "Last Name",
    // },
    {
      column: "Name",
      columnName: "Name",
    },
    {
      column: "EMail",
      columnName: "Email",
    },
    {
      column: "MobileNo",
      columnName: "Mobile No",
    },
    // {
    //   column: "UserType",
    //   columnName: "User Type",
    // },

    {
      column: "isAdmin",
      columnName: "Is Admin",
    },
    // {
    //   column: "IsAccept",
    //   columnName: "Is Accept",
    // },
    // {
    //   column: "IsMasterUser",
    //   columnName: "Is Master User",
    // },
    {
      column: "IsActive",
      columnName: "Is Active",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  //Master
  MENU: [
    {
      column: "MenuID",
      columnName: "#ID",
    },
    {
      column: "ParentMenuID",
      columnName: "Parent Menu",
    },
    {
      column: "MenuName",
      columnName: "Menu Name",
    },
    {
      column: "MenuCaption",
      columnName: "Menu Caption",
    },
    {
      column: "RouterPath",
      columnName: "RouterPath",
    },
    {
      column: "iOrder",
      columnName: "Order",
    },
    {
      column: "IsActive",
      columnName: "IsActive",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  CONTACT: [
    // {
    //   column: "CID",
    //   columnName: "#ID",
    // },
    {
      column: "VillageName",
      columnName: "Village",
    },
    {
      column: "ContactName",
      columnName: "Contact Name",
    },
    // {
    //   column: "gContactName",
    //   columnName: "સંપર્ક નામ",
    // },
    {
      column: "Designation",
      columnName: "Designation",
    },
    {
      column: "MobileNo",
      columnName: "Mobile No",
    },
    {
      column: "EMail",
      columnName: "Email",
    },
    // {
    //   column: "Remarks",
    //   columnName: "Remarks",
    // },

    {
      column: "IsActive",
      columnName: "Is Active",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  DANGERCATEGORY: [
    // {
    //   column: "DID",
    //   columnName: "#ID",
    // },
    {
      column: "DangerCategoryName",
      columnName: "Danger Category",
    },
    // {
    //   column: "gDangerCategoryName",
    //   columnName: "જોખમ શ્રેણી નામ",
    // },
    {
      column: "ColorCode",
      columnName: "Color",
    },
    {
      column: "Remarks",
      columnName: "Remarks",
    },
    {
      column: "OrderNo",
      columnName: "OrderNo",
    },
    {
      column: "IsActive",
      columnName: "Is Active",
    },

    {
      column: "Action",
      columnName: "",
    },
  ],

  EMAILADMIN: [
    {
      column: "RID",
      columnName: "#ID",
    },
    {
      column: "MName",
      columnName: "Name",
    },
    {
      column: "mShortName",
      columnName: "Short Name",
    },
    {
      column: "CommEmailID",
      columnName: "Common Email",
    },
    {
      column: "EmailID",
      columnName: "EmailID",
    },
    {
      column: "HostName",
      columnName: "Host Name",
    },
    {
      column: "PortNumber",
      columnName: "Port no.",
    },
    {
      column: "SSN",
      columnName: "SSN",
    },
    {
      column: "Password",
      columnName: "Password",
    },
    {
      column: "IsEmailActive",
      columnName: "IsEmail Active",
    },
    {
      column: "IsActive",
      columnName: "Is Active",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  GATEWAY: [
    // {
    //   column: "FID",
    //   columnName: "#ID",
    // },
    {
      column: "FName",
      columnName: "Name",
    },
    {
      column: "CompanyName",
      columnName: "Company Name",
    },
    // {
    //   column: "GatewayIMEI",
    //   columnName: "GatewayIMEI",
    // },
    {
      column: "Type",
      columnName: "Type",
    },
    {
      column: "Warrenty",
      columnName: "Warrenty",
    },
    {
      column: "Remarks",
      columnName: "Remarks",
    },
    {
      column: "PurchasedDate",
      columnName: "PurchasedDate",
    },
    {
      column: "InvoiceNo",
      columnName: "Invoice no.",
    },
    {
      column: "Comments",
      columnName: "Comments",
    },
    {
      column: "IsActive",
      columnName: "Is Active",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  GATEWAYRAINGAUGE: [
    // {
    //   column: "GatewayRaingaugeDataID",
    //   columnName: "#ID",
    // },
    // {
    //   column: "RDatetime",
    //   columnName: "Date",
    // },
    {
      column: "HourStart",
      columnName: "Date/Time",
    },
    {
      column: "RainRate_mm_per_hr",
      columnName: "RainRate (mm per hr)",
    },
    {
      column: "DailyRunningTotal",
      columnName: "Total RainFall (MM)",
    },
    // {
    //   column: "GatewayIMEI",
    //   columnName: "GatewayIMEI",
    // },
    // {
    //   column: "RainFall",
    //   columnName: "RainFall",
    // },
    // {
    //   column: "CurrentIP",
    //   columnName: "CurrentIP",
    // },
    // {
    //   column: "BetteryLevel",
    //   columnName: "BetteryLevel",
    // },
    // {
    //   column: "SingleLevel",
    //   columnName: "Single Level",
    // },
    // {
    //   column: "PowerLevel",
    //   columnName: "Power Level",
    // },
    // {
    //   column: "IsPowerOn",
    //   columnName: "IsPowerOn",
    // },
    // {
    //   column: "IsReal",
    //   columnName: "IsReal",
    // },
    // {
    //   column: "Action",
    //   columnName: "",
    // },
  ],

  PREDICTIONREPORT: [
    // {
    //   column: "RID",
    //   columnName: "#ID",
    // },
    {
      column: "ActualWaterLevel",
      columnName: "ActualWaterLevel(ft)",
    },
    {
      column: "Prediction1_ForTime",
      columnName: "PredictionTime",
    },
    {
      column: "Prediction",
      columnName: "Prediction(ft)",
    },
    {
      column: "Differences",
      columnName: "Differences(ft)",
    },
    {
      column: "Percentage_Error",
      columnName: "Percentage_Error",
    },
  ],

  READINGLOCATION: [
    // {
    //   column: "RLID",
    //   columnName: "#ID",
    // },
    // {
    //   column: "DistrictName",
    //   columnName: "Disctrict",
    // },
    {
      column: "Name",
      columnName: "Name",
    },
    // {
    //   column: "gLocationName",
    //   columnName: "સ્થાનનું નામ",
    // },
    {
      column: "RiverName",
      columnName: "River",
    },
    // {
    //   column: "gRiverName",
    //   columnName: "નદીનું નામ",
    // },
    {
      column: "Location",
      columnName: "Location",
    },
    // {
    //   column: "gLocation",
    //   columnName: "સ્થાન",
    // },
    // {
    //   column: "Latitude",
    //   columnName: "Latitude",
    // },
    // {
    //   column: "Longitude",
    //   columnName: "Longitude",
    // },
    // {
    //   column: "Altitude",
    //   columnName: "Altitude",
    // },
    // {
    //   column: "GatewayName",
    //   columnName: "GatewayMaster",
    // },
    // {
    //   column: "GatewayIMEI",
    //   columnName: "Gateway IMEI",
    // },
    {
      column: "WarningWaterLevel",
      columnName: "WarningWaterLevel (mtr)",
    },
    // {
    //   column: "MilliAmpsMin",
    //   columnName: "MilliAmpsMin",
    // },
    // {
    //   column: "MilliAmpsMax",
    //   columnName: "MilliAmpsMax",
    // },
    // {
    //   column: "RangeHeightMin",
    //   columnName: "RangeHeightMin",
    // },
    {
      column: "RangeHeightMax",
      columnName: "MaxWaterLevel (mtr)",
    },
    {
      column: "DangerWaterLevel",
      columnName: "DangerWaterLevel (mtr)",
    },
    // {
    //   column: "WarningLevel",
    //   columnName: "Warning Level",
    // },
    // {
    //   column: "DangerLevel",
    //   columnName: "Danger Level",
    // },
    // {
    //   column: "VoltagePerMeter",
    //   columnName: "VoltagePerMeter",
    // },
    // {
    //   column: "ActualVoltagePerMeter",
    //   columnName: "Actual Voltage / Meter",
    // },
    // {
    //   column: "ZeroLevelVoltage",
    //   columnName: "0 Level Voltage",
    // },
    // {
    //   column: "AdjustMeter",
    //   columnName: "Adjust Meter",
    // },
    // {
    //   column: "DataRefreshMin",
    //   columnName: "DataRefreshMin",
    // },
    // {
    //   column: "MaxTimeDuration",
    //   columnName: "MaxTimeDuration",
    // },
    {
      column: "Remarks",
      columnName: "Remarks",
    },
    // {
    //   column: "IsManualEntry",
    //   columnName: "IsManual Entry",
    // },
    {
      column: "IsActive",
      columnName: "IsActive",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  REFRESHTIME: [
    // {
    //   column: "RID",
    //   columnName: "#ID",
    // },
    {
      column: "ChartRefreshTime",
      columnName: "Chart Refresh Time",
    },
    {
      column: "AlertSMSRefreshTime",
      columnName: "Alert SMS RefreshTime",
    },
    {
      column: "CurrentReadingRefreshTime",
      columnName: "Current Reading RefreshTime",
    },
    {
      column: "SirenRefreshTime",
      columnName: "Siren Refresh Time",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  GATEWAYNDEVICECLUB: [
    {
      column: "GatewaynDeviceClubMasterID",
      columnName: "#ID",
    },
    {
      column: "GatewaynDeviceClubName",
      columnName: "Name",
    },
    {
      column: "DeviceName",
      columnName: "Device",
    },
    {
      column: "GatewayName",
      columnName: "Gateway",
    },
    {
      column: "SirenRefreshTime",
      columnName: "Siren Refresh Time",
    },
    {
      column: "CompanyName",
      columnName: "SIM",
    },
    {
      column: "IsActive",
      columnName: "Is Active",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  SIM: [
    {
      column: "SID",
      columnName: "#ID",
    },
    {
      column: "CompanyName",
      columnName: "Company Name",
    },
    {
      column: "PhoneNo",
      columnName: "Phone no.",
    },
    {
      column: "TariffPlan",
      columnName: "Tariff Plan",
    },
    {
      column: "BillCycle",
      columnName: "Bill Cycle",
    },
    {
      column: "SIMNo",
      columnName: "SIM no.",
    },
    {
      column: "LastDate",
      columnName: "LastDate",
    },
    {
      column: "isPrepaid",
      columnName: "isPrepaid",
    },
    {
      column: "IsActive",
      columnName: "Is Active",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  SIRENLOCATION: [
    {
      column: "SirenLocationID",
      columnName: "#ID",
    },
    {
      column: "SirenLocationName",
      columnName: "Siren Location",
    },
    {
      column: "DistrictName",
      columnName: "Disctrict",
    },
    {
      column: "GatewayMasterID",
      columnName: "GatewayMaster",
    },
    {
      column: "GatewayIMEI",
      columnName: "GatewayIMEI",
    },
    {
      column: "SAddress",
      columnName: "Address",
    },
    {
      column: "Latitude",
      columnName: "Latitude",
    },
    {
      column: "Longitude",
      columnName: "Longitude",
    },
    {
      column: "IsActive",
      columnName: "Is Active",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  STATE: [
    {
      column: "SID",
      columnName: "#ID",
    },
    {
      column: "StateName",
      columnName: "State Name",
    },
    // {
    //   column: "GStateName",
    //   columnName: "રાજ્યનું નામ",
    // },
    {
      column: "IsActive",
      columnName: "Is Active",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  TALUKA: [
    // {
    //   column: "TID",
    //   columnName: "#ID",
    // },
    {
      column: "TalukaName",
      columnName: "Taluka Name",
    },
    // {
    //   column: "gTalukaName",
    //   columnName: "તાલુકાનું નામ",
    // },
    {
      column: "DistName",
      columnName: "District",
    },
    {
      column: "IsActive",
      columnName: "Is Active",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  TYPE: [
    {
      column: "TypeID",
      columnName: "#ID",
    },
    {
      column: "TypeName",
      columnName: "Type Name",
    },
    // {
    //   column: "gTypeName",
    //   columnName: "પ્રકાર નામ",
    // },
    {
      column: "IsActive",
      columnName: "Is Active",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  VILLAGE: [
    // {
    //   column: "VID",
    //   columnName: "#ID",
    // },
    {
      column: "VillageName",
      columnName: "Village Name",
    },
    {
      column: "TalukaName",
      columnName: "Taluka",
    },
    // {
    //   column: "gVillageName",
    //   columnName: "ગામનું નામ",
    // },
    {
      column: "Latitude",
      columnName: "Latitude",
    },
    {
      column: "Longitude",
      columnName: "Longitude",
    },
    {
      column: "Altitude",
      columnName: "Altitude",
    },

    // {
    //   column: "DistName",
    //   columnName: "District",
    // },
    // {
    //   column: "StateName",
    //   columnName: "State Name",
    // },
    // {
    //   column: "Name",
    //   columnName: "Reading Location Name",
    // },
    {
      column: "Remarks",
      columnName: "Remarks",
    },
    {
      column: "IsActive",
      columnName: "Is Active",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  WARNINGRULE: [
    // {
    //   column: "WID",
    //   columnName: "#ID",
    // },
    {
      column: "DangerCategoryName",
      columnName: "Danger Category",
    },
    {
      column: "VillageName",
      columnName: "Village",
    },
    {
      column: "TalukaName",
      columnName: "Taluka",
    },
    {
      column: "Name",
      columnName: "Reading Location",
    },
    {
      column: "WaterLowerLevel",
      columnName: "Water Low Lvl (mtr)",
    },
    {
      column: "WaterHigerLevel",
      columnName: "Water High Lvl (mtr)",
    },
    // {
    //   column: "AutoSMS",
    //   columnName: "Auto SMS",
    // },
    // {
    //   column: "AutoEMail",
    //   columnName: "Auto Email",
    // },
    {
      column: "IsActive",
      columnName: "Is Active",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  CONTACTCLUB: [
    {
      column: "CCID",
      columnName: "#ID",
    },
    {
      column: "TypeID",
      columnName: "Type",
    },
    {
      column: "ContactID",
      columnName: "Contact",
    },
    {
      column: "MasterID",
      columnName: "Master",
    },
    {
      column: "IsActive",
      columnName: "Is Active",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  DAILYREADINGEFFECTEDVILLAGES: [
    {
      column: "EVID",
      columnName: "#ID",
    },
    {
      column: "DRID",
      columnName: "DRID",
    },
    {
      column: "VillageID",
      columnName: "Village",
    },
    {
      column: "WarningRuleID",
      columnName: "Warning Rule",
    },
    {
      column: "IsSMS",
      columnName: "IsSMS",
    },
    {
      column: "ISEMail",
      columnName: "ISEMail",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  DAILYREADINGRECORD: [
    // {
    //   column: "DRID",
    //   columnName: "#ID",
    // },
    // {
    //   column: "DistrictID",
    //   columnName: "District",
    // },
    {
      column: "Name",
      columnName: "Reading Location",
    },
    {
      column: "Edate",
      columnName: "Date",
    },
    {
      column: "Etime_Org",
      columnName: "Time",
    },
    {
      column: "WaterLevel",
      columnName: "Water Level(ft)",
    },
    {
      column: "WaterLevel_MTR",
      columnName: "Water Level(mtr)",
    },
    // {
    //   column: "WaterLevel_mA",
    //   columnName: "WaterLevel_mA",
    // },
   
    // {
    //   column: "DangerWaterLevel",
    //   columnName: "DangerWaterLevel(ft)",
    // },
    // {
    //   column: "MinWaterLevel",
    //   columnName: "MinWaterLevel(ft)",
    // },
    // {
    //   column: "MaxWaterLevel",
    //   columnName: "MaxWaterLevel(ft)",
    // },
    // {
    //   column: "EDateTime",
    //   columnName: "EDateTime",
    // },
    // {
    //   column: "BetteryLevel",
    //   columnName: "BetteryLevel",
    // },
    // {
    //   column: "SingleLevel",
    //   columnName: "SingleLevel",
    // },
    // {
    //   column: "SkipReason",
    //   columnName: "SkipReason",
    // },
    // {
    //   column: "ErrorData",
    //   columnName: "ErrorData",
    // },
    // {
    //   column: "IsSkip",
    //   columnName: "IsSkip",
    // },
    {
      column: "Action",
      columnName: "",
    },
  ],

  DEVICELOG: [
    {
      column: "RID",
      columnName: "#ID",
    },
    {
      column: "SirenStartDate",
      columnName: "Siren StartDate",
    },
    {
      column: "SirenStartUserID",
      columnName: "Siren StartUserID",
    },
    {
      column: "SirenStartMobileNo",
      columnName: "Siren StartMobileNo",
    },
    {
      column: "VillageID",
      columnName: "Village",
    },
    {
      column: "Category",
      columnName: "Category",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  DEVICE: [
    {
      column: "DeviceMasterID",
      columnName: "#ID",
    },
    {
      column: "DeviceName",
      columnName: "Device Name",
    },
    {
      column: "DeviceType",
      columnName: "Device Type",
    },
    {
      column: "CompanyName",
      columnName: "Company Name",
    },
    {
      column: "SerialNo",
      columnName: "Serial no.",
    },
    {
      column: "Type",
      columnName: "Type",
    },
    {
      column: "Warrenty",
      columnName: "Warrenty",
    },
    {
      column: "Remarks",
      columnName: "Remarks",
    },
    {
      column: "IsActive",
      columnName: "IsActive",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  DISTRICT: [
    {
      column: "DID",
      columnName: "#ID",
    },
    {
      column: "DistName",
      columnName: "District Name",
    },
    // {
    //   column: "GDistrictName",
    //   columnName: "જિલ્લાનું નામ",
    // },
    {
      column: "StateID",
      columnName: "State",
    },
    {
      column: "IsActive",
      columnName: "Is Active",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  ERRORMESSAGE: [
    {
      column: "ErrorID",
      columnName: "#ID",
    },
    {
      column: "ErrorMessage",
      columnName: "Error Message",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  TIDAL: [
    // {
    //   column: "TID",
    //   columnName: "#ID",
    // },
    {
      column: "Name",
      columnName: "Reading Location",
    },
    {
      column: "TDate",
      columnName: "Date",
    },
    {
      column: "TTime",
      columnName: "Time",
    },
    {
      column: "TTypeName",
      columnName: "Type",
    },
    {
      column: "Height_MTR",
      columnName: "Height (mtr)",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  RAINGAUGELOCATION: [
    {
      column: "RaingaugeLocationID",
      columnName: "#ID",
    },
    {
      column: "RaingaugeLocationName",
      columnName: "Location",
    },
    {
      column: "DistrictName",
      columnName: "Disctrict",
    },
    {
      column: "SAddress",
      columnName: "Address",
    },
    {
      column: "Latitude",
      columnName: "Latitude",
    },
    {
      column: "Longitude",
      columnName: "Longitude",
    },
    {
      column: "GatewayName",
      columnName: "GatewayMaster",
    },
    {
      column: "GatewayIMEI",
      columnName: "GatewayIMEI",
    },
    {
      column: "IsActive",
      columnName: "Is Active",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  GATEWAYSENSOR: [
    {
      column: "DRID",
      columnName: "#ID",
    },
    // {
    //   column: "GatewayMasterID",
    //   columnName: "GatewayMaster",
    // },
    {
      column: "Name",
      columnName: "Reading Location Name",
    },
    {
      column: "WaterLevel",
      columnName: "WaterLevel",
    },
    // {
    //   column: "Reading_mA",
    //   columnName: "Reading_mA",
    // },
    {
      column: "WaterLevel_FT",
      columnName: "WaterLevel_FT",
    },
    {
      column: "MinWaterLevel",
      columnName: "MinWaterLevel",
    },
    {
      column: "MaxWaterLevel",
      columnName: "MaxWaterLevel",
    },
    {
      column: "Trend",
      columnName: "Trend",
    },
    {
      column: "DangerWaterLevel",
      columnName: "DangerWaterLevel",
    },
    // {
    //   column: "BetteryLevel",
    //   columnName: "Bettery Level",
    // },
    // {
    //   column: "SingleLevel",
    //   columnName: "Single Level",
    // },
    {
      column: "GatewayIMEI",
      columnName: "Gateway IMEI",
    },
    // {
    //   column: "GatewayName",
    //   columnName: "Gateway Name",
    // },
    // {
    //   column: "IsPowerOn",
    //   columnName: "IsPowerOn",
    // },
    // {
    //   column: "IsReal",
    //   columnName: "IsReal",
    // },
    {
      column: "Action",
      columnName: "",
    },
  ],

  READINGNOTIFICATIONLOG: [
    {
      column: "RID",
      columnName: "#ID",
    },
    {
      column: "RType",
      columnName: "Type",
    },
    {
      column: "RDate",
      columnName: "Date",
    },
    {
      column: "SStatus",
      columnName: "Status",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  SENTSMS: [
    {
      column: "RID",
      columnName: "#ID",
    },
    {
      column: "SDateTime",
      columnName: "DateTime",
    },
    {
      column: "DangerCategoryName",
      columnName: "DangerCategory Name",
    },
    {
      column: "VillageName",
      columnName: "Village Name",
    },
    {
      column: "WaterLevel",
      columnName: "Water Level",
    },
    {
      column: "ContactName",
      columnName: "Contact Name",
    },
    {
      column: "CMobileNo",
      columnName: "MobileNo",
    },
    {
      column: "SMessage",
      columnName: "Message",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  SMSCOUNTER: [
    {
      column: "RID",
      columnName: "#ID",
    },
    {
      column: "CDate",
      columnName: "Date",
    },
    {
      column: "MobileNo",
      columnName: "MobileNo",
    },
    {
      column: "STypes",
      columnName: "Types",
    },
    {
      column: "MStatus",
      columnName: "Status",
    },
    {
      column: "SentSMSCounter",
      columnName: "Sent SMSCounter",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  SMSUTILITY: [
    {
      column: "RID",
      columnName: "#ID",
    },
    {
      column: "BaseURL",
      columnName: "BaseURL",
    },
    {
      column: "UserID",
      columnName: "UserID",
    },
    {
      column: "Pwd",
      columnName: "Pwd",
    },
    {
      column: "SenderID",
      columnName: "SenderID",
    },
    {
      column: "MunID",
      columnName: "MunID",
    },
    {
      column: "EntityID",
      columnName: "EntityID",
    },
    {
      column: "SMSCredit",
      columnName: "SMSCredit",
    },
    {
      column: "SMSCounter",
      columnName: "SMSCounter",
    },
    {
      column: "SMSRemains",
      columnName: "SMSRemains",
    },
    {
      column: "isActive",
      columnName: "isActive",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  LEVEL: [
    // {
    //   column: "LevelID",
    //   columnName: "",
    // },
    {
      column: "LevelName",
      columnName: "Level Name",
    },
    {
      column: "LevelHeightFrom",
      columnName: "From Height  (mtr)",
    },
    {
      column: "LevelHeightTo",
      columnName: "To Height  (mtr)",
    },
    {
      column: "ReadingLocationName",
      columnName: "Reading Location",
    },
    {
      column: "TotalContacts",
      columnName: "Total Contact",
    },
    {
      column: "IsActive",
      columnName: "Is Active",
    },
    {
      column: "IsSMS",
      columnName: "Is SMS",
    },

    {
      column: "Action",
      columnName: "",
    },
  ],

  // USERREADINGLOCATION: [
  //   {
  //     column: "ReadingLocationID",
  //     columnName: "#ID",
  //   },
  //   {
  //     column: "GatewayMasterID",
  //     columnName: "Gateway",
  //   },
  //   {
  //     column: "GatewayIMEI",
  //     columnName: "Gateway IMEI",
  //   },
  //   {
  //     column: "Resistance",
  //     columnName: "Resistance",
  //   },
  //   {
  //     column: "MilliAmpsMin",
  //     columnName: "MilliAmpsMin",
  //   },
  //   {
  //     column: "MilliAmpsMax",
  //     columnName: "MilliAmpsMax",
  //   },
  //   {
  //     column: "AdjustMeter",
  //     columnName: "Adjust Meter",
  //   },
  //   {
  //     column: "DataRefreshMin",
  //     columnName: "DataRefreshMin",
  //   },
  //   {
  //     column: "IsActive",
  //     columnName: "IsActive",
  //   },
  //   {
  //     column: "Action",
  //     columnName: "",
  //   },
  // ],

  // USERMENUPERMISSION: [
  //   {
  //     column: "RID",
  //     columnName: "#ID",
  //   },
  //   {
  //     column: "MenuID",
  //     columnName: "MenuID",
  //   },
  //   {
  //     column: "UserID",
  //     columnName: "UserID",
  //   },
  //   {
  //     column: "canADD",
  //     columnName: "canADD",
  //   },
  //   {
  //     column: "canEDIT",
  //     columnName: "canEDIT",
  //   },
  //   {
  //     column: "canDELETE",
  //     columnName: "canDELETE",
  //   },
  //   {
  //     column: "canVIEW",
  //     columnName: "canVIEW",
  //   },
  //   {
  //     column: "Action",
  //     columnName: "",
  //   },
  // ],

  USERTYPE: [
    {
      column: "UserTypeId",
      columnName: "#ID",
    },
    {
      column: "UserType",
      columnName: "UserType",
    },
    {
      column: "MunID",
      columnName: "MunID",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  USERTYPEMENUPERMISSION: [
    {
      column: "RID",
      columnName: "#ID",
    },
    {
      column: "MenuID",
      columnName: "MenuID",
    },
    {
      column: "UserTypeID",
      columnName: "UserTypeID",
    },
    {
      column: "canADD",
      columnName: "canADD",
    },
    {
      column: "canEDIT",
      columnName: "canEDIT",
    },
    {
      column: "canDELETE",
      columnName: "canDELETE",
    },
    {
      column: "canVIEW",
      columnName: "canVIEW",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  GATEWAYSIREN: [
    // {
    //   column: "GatewaySirenDataID",
    //   columnName: "#ID",
    // },
    // {
    //   column: "SirenLocationID",
    //   columnName: "Siren Location",
    // },
    // {
    //   column: "GatewayMasterID",
    //   columnName: "Gateway",
    // },
    {
      column: "GatewayIMEI",
      columnName: "GatewayIMEI",
    },
    {
      column: "RDateTime",
      columnName: "Date",
    },
    {
      column: "CurrentIP",
      columnName: "CurrentIP",
    },
    {
      column: "BetteryLevel",
      columnName: "BetteryLevel",
    },
    {
      column: "SingleLevel",
      columnName: "SingleLevel",
    },
    {
      column: "PowerLevel",
      columnName: "PowerLevel",
    },
    // {
    //   column: "IsReal",
    //   columnName: "IsReal",
    // },
    {
      column: "IsPowerOn",
      columnName: "IsPowerOn",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  RESERVOIR: [
    // {
    //   column: "ReservoirID",
    //   columnName: "#ID",
    // },
    {
      column: "ReservoirName",
      columnName: "Reservoir Name",
    },
    {
      column: "ReservoirLocation",
      columnName: "Reservoir Location",
    },
    // {
    //   column: "ReservoirLatitude",
    //   columnName: "Reservoir Latitude",
    // },
    // {
    //   column: "ReservoirLongitude",
    //   columnName: "Reservoir Longitude",
    // },
    // {
    //   column: "KMFromCapital",
    //   columnName: "KMFromCapital",
    // },
    {
      column: "TotalLevelHeight",
      columnName: "Total Level Height (mtr)",
    },
    {
      column: "DangerLevelHeight",
      columnName: "Danger LevelHeight (mtr)",
    },
    {
      column: "WarningLevelHeight",
      columnName: "Warning LevelHeight (mtr)",
    },
    // {
    //   column: "NornalDischarge",
    //   columnName: "Normal Discharge",
    // },
    // {
    //   column: "MaxDischarge",
    //   columnName: "Max Discharge",
    // },
    // {
    //   column: "MaxTimeDuration",
    //   columnName: "Max TimeDuration",
    // },
    {
      column: "IsActive",
      columnName: "IsActive",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],

  RESERVOIRDISCHARGEENTRY: [
    // {
    //   column: "ReservoirDischargeEntryID",
    //   columnName: "#ID",
    // },
    {
      column: "ReservoirDischargeEntryDate",
      columnName: "Entry Date",
    },
    {
      column: "EDateTime",
      columnName: "Entry Time",
    },
    {
      column: "ReservoirName",
      columnName: "Reservoir Name",
    },
    {
      column: "CurrentHeight",
      columnName: "Water level (mtr)",
    },
    {
      column: "TotalInflow",
      columnName: "InFlow (Cusec)",
    },
    {
      column: "TotalDischarge",
      columnName: "OutFlow (Cusec)",
    },
    {
      column: "GrossStorage",
      columnName: "Gross Storage (MCM)",
    },

    // {
    //   column: "TotalDischarge",
    //   columnName: "Total Discharge",
    // },
    {
      column: "SkipReason",
      columnName: "Skip Reason",
    },
    // {
    //   column: "Remarks",
    //   columnName: "Remarks",
    // },
    {
      column: "IsActive",
      columnName: "IsActive",
    },
    {
      column: "Action",
      columnName: "",
    },
  ],
};

const DEFAULT_TABLE_COLUMNS = {
  //Admin
  USER: [
    // {
    //   columnKey: "RID",
    //   headingName: "#ID",
    //   valueKey: "RID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "UserID",
      headingName: "User ID",
      valueKey: "UserID",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "Pwd",
    //   headingName: "Password",
    //   valueKey: "Pwd",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "UserTypeName",
      headingName: "User Type",
      valueKey: "UserTypeName",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "LastName",
    //   headingName: "Last Name",
    //   valueKey: "LastName",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "Name",
      headingName: "Name",
      valueKey: "Name",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "EMail",
      headingName: "Email",
      valueKey: "EMail",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "MobileNo",
      headingName: "Mobile No",
      valueKey: "MobileNo",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "UserType",
    //   headingName: "User Type",
    //   valueKey: "UserType",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "isAdmin",
      headingName: "Is Admin",
      valueKey: "isAdmin",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
    // {
    //   columnKey: "IsAccept",
    //   headingName: "Is Accept",
    //   valueKey: "IsAccept",
    //   className: "--width-5",
    //   columnType: "CHECK_BOX",
    // },
    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
    // {
    //   columnKey: "IsMasterUser",
    //   headingName: "Is Master User",
    //   valueKey: "IsMasterUser",
    //   className: "--width-5",
    //   columnType: "CHECK_BOX",
    // },
  ],

  PREDICTIONREPORT: [
    // {
    //   columnKey: "RID",
    //   headingName: "#ID",
    //   valueKey: "RID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "ActualWaterLevel",
      headingName: "ActualWaterLevel(ft)",
      valueKey: "ActualWaterLevel",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Prediction1_ForTime",
      headingName: "PredictionTime",
      valueKey: "Prediction1_ForTime",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Prediction",
      headingName: "Prediction(ft)",
      valueKey: "Prediction1",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Differences",
      headingName: "Differences(ft)",
      valueKey: "Differences",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Percentage_Error",
      headingName: "Percentage_Error",
      valueKey: "Percentage_Error",
      className: "--width-5",
      columnType: "STRING",
    },
  ],

  //Master
  MENU: [
    {
      columnKey: "MenuID",
      headingName: "#ID",
      valueKey: "MenuID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "ParentMenuID",
      headingName: "Parent Menu",
      valueKey: "ParentMenuID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "MenuName",
      headingName: "Menu Name",
      valueKey: "MenuName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "MenuCaption",
      headingName: "Menu Caption",
      valueKey: "MenuCaption",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "RouterPath",
      headingName: "RouterPath",
      valueKey: "RouterPath",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "iOrder",
      headingName: "Order",
      valueKey: "iOrder",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "IsActive",
      headingName: "IsActive",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  CONTACT: [
    // {
    //   columnKey: "CID",
    //   headingName: "#ID",
    //   valueKey: "CID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "VillageName",
      headingName: "Village",
      valueKey: "VillageName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "ContactName",
      headingName: "Contact Name",
      valueKey: "ContactName",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "gContactName",
    //   headingName: "સંપર્ક નામ",
    //   valueKey: "gContactName",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "Designation",
      headingName: "Designation",
      valueKey: "Designation",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "MobileNo",
      headingName: "Mobile No",
      valueKey: "MobileNo",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "EMail",
      headingName: "Email",
      valueKey: "EMail",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "Remarks",
    //   headingName: "Remarks",
    //   valueKey: "Remarks",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },

    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  DANGERCATEGORY: [
    // {
    //   columnKey: "DID",
    //   headingName: "#ID",
    //   valueKey: "DID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "DangerCategoryName",
      headingName: "Danger Category",
      valueKey: "DangerCategoryName",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "gDangerCategoryName",
    //   headingName: "જોખમ શ્રેણી નામ",
    //   valueKey: "gDangerCategoryName",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "ColorCode",
      headingName: "Color",
      valueKey: "ColorCode",
      className: "--width-5",
      columnType: "COLOR",
    },
    {
      columnKey: "Remarks",
      headingName: "Remarks",
      valueKey: "Remarks",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "OrderNo",
      headingName: "OrderNo",
      valueKey: "OrderNo",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  EMAILADMIN: [
    {
      columnKey: "RID",
      headingName: "#ID",
      valueKey: "RID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "MName",
      headingName: "Name",
      valueKey: "MName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "mShortName",
      headingName: "Short Name",
      valueKey: "mShortName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "CommEmailID",
      headingName: "Common Email",
      valueKey: "CommEmailID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "EmailID",
      headingName: "Email",
      valueKey: "EmailID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "HostName",
      headingName: "Host Name",
      valueKey: "HostName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "PortNumber",
      headingName: "Port no.",
      valueKey: "PortNumber",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "SSN",
      headingName: "SSN",
      valueKey: "SSN",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
    {
      columnKey: "Password",
      headingName: "Password",
      valueKey: "Password",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "IsEmailActive",
      headingName: "IsEmail Active",
      valueKey: "IsEmailActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  GATEWAY: [
    // {
    //   columnKey: "FID",
    //   headingName: "#ID",
    //   valueKey: "FID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "FName",
      headingName: "Name",
      valueKey: "FName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "CompanyName",
      headingName: "Company Name",
      valueKey: "CompanyName",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "GatewayIMEI",
    //   headingName: "GatewayIMEI",
    //   valueKey: "GatewayIMEI",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "Type",
      headingName: "Type",
      valueKey: "Type",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Warrenty",
      headingName: "Warrenty",
      valueKey: "Warrenty",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Remarks",
      headingName: "Remarks",
      valueKey: "Remarks",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "PurchasedDate",
      headingName: "PurchasedDate",
      valueKey: "PurchasedDate",
      className: "--width-5",
      columnType: "DATE",
    },
    {
      columnKey: "InvoiceNo",
      headingName: "Invoice no.",
      valueKey: "InvoiceNo",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Comments",
      headingName: "Comments",
      valueKey: "Comments",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  GATEWAYRAINGAUGE: [
    // {
    //   columnKey: "GatewayRaingaugeDataID",
    //   headingName: "#ID",
    //   valueKey: "GatewayRaingaugeDataID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "RDatetime",
    //   headingName: "Date",
    //   valueKey: "RDatetime",
    //   className: "--width-5",
    //   columnType: "DATE",
    // },
    {
      columnKey: "HourStart",
      headingName: "Date/Time",
      valueKey: "HourStart",
      className: "--width-3",
      columnType: "STRING",
    },
    {
      columnKey: "RainRate_mm_per_hr",
      headingName: "RainRate (mm per hr)",
      valueKey: "RainRate_mm_per_hr",
      className: "--width-3",
      columnType: "STRING",
    },
    {
      columnKey: "DailyRunningTotal",
      headingName: "Total RainFall (MM)",
      valueKey: "DailyRunningTotal",
      className: "--width-3",
      columnType: "STRING",
    },
    // {
    //   columnKey: "GatewayIMEI",
    //   headingName: "GatewayIMEI",
    //   valueKey: "GatewayIMEI",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "RainFall",
    //   headingName: "RainFall",
    //   valueKey: "RainFall",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "CurrentIP",
    //   headingName: "CurrentIP",
    //   valueKey: "CurrentIP",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "BetteryLevel",
    //   headingName: "BetteryLevel",
    //   valueKey: "BetteryLevel",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "SingleLevel",
    //   headingName: "Single Level",
    //   valueKey: "SingleLevel",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "PowerLevel",
    //   headingName: "Power Level",
    //   valueKey: "PowerLevel",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "IsPowerOn",
    //   headingName: "IsPowerOn",
    //   valueKey: "IsPowerOn",
    //   className: "--width-5",
    //   columnType: "CHECK_BOX",
    // },
    // {
    //   columnKey: "IsReal",
    //   headingName: "IsReal",
    //   valueKey: "IsReal",
    //   className: "--width-5",
    //   columnType: "CHECK_BOX",
    // },
  ],

  READINGLOCATION: [
    // {
    //   columnKey: "RLID",
    //   headingName: "#ID",
    //   valueKey: "RLID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "DistrictName",
    //   headingName: "Disctrict",
    //   valueKey: "DistrictName",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "Name",
      headingName: "Name",
      valueKey: "Name",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "gLocationName",
    //   headingName: "સ્થાનનું નામ",
    //   valueKey: "gLocationName",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "RiverName",
      headingName: "River",
      valueKey: "RiverName",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "gRiverName",
    //   headingName: "નદીનું નામ",
    //   valueKey: "gRiverName",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "Location",
      headingName: "Location",
      valueKey: "Location",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "gLocation",
    //   headingName: "સ્થાન",
    //   valueKey: "gLocation",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "Latitude",
    //   headingName: "Latitude",
    //   valueKey: "Latitude",
    //   className: "--width-5",
    //   columnType: "NUMBER",
    // },
    // {
    //   columnKey: "Longitude",
    //   headingName: "Longitude",
    //   valueKey: "Longitude",
    //   className: "--width-5",
    //   columnType: "NUMBER",
    // },
    // {
    //   columnKey: "Altitude",
    //   headingName: "Altitude",
    //   valueKey: "Altitude",
    //   className: "--width-5",
    //   columnType: "NUMBER",
    // },
    // {
    //   columnKey: "GatewayName",
    //   headingName: "GatewayMaster",
    //   valueKey: "GatewayName",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "GatewayIMEI",
    //   headingName: "Gateway IMEI",
    //   valueKey: "GatewayIMEI",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "WarningWaterLevel",
      headingName: "WarningWaterLevel (mtr)",
      valueKey: "WarningWaterLevel",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "MilliAmpsMin",
    //   headingName: "MilliAmpsMin",
    //   valueKey: "MilliAmpsMin",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "MilliAmpsMax",
    //   headingName: "MilliAmpsMax",
    //   valueKey: "MilliAmpsMax",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "RangeHeightMin",
    //   headingName: "RangeHeightMin",
    //   valueKey: "RangeHeightMin",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "RangeHeightMax",
      headingName: "MaxWaterLevel (mtr)",
      valueKey: "RangeHeightMax",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "DangerWaterLevel",
      headingName: "DangerWaterLevel (mtr)",
      valueKey: "DangerWaterLevel",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "WarningLevel",
    //   headingName: "Warning Level",
    //   valueKey: "WarningLevel",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "VoltagePerMeter",
    //   headingName: "VoltagePerMeter",
    //   valueKey: "VoltagePerMeter",
    //   className: "--width-5",
    //   columnType: "NUMBER",
    // },
    // {
    //   columnKey: "ActualVoltagePerMeter",
    //   headingName: "Actual Voltage / Meter",
    //   valueKey: "ActualVoltagePerMeter",
    //   className: "--width-5",
    //   columnType: "NUMBER",
    // },
    // {
    //   columnKey: "ZeroLevelVotage",
    //   headingName: "0 Level Votage",
    //   valueKey: "ZeroLevelVotage",
    //   className: "--width-5",
    //   columnType: "NUMBER",
    // },
    // {
    //   columnKey: "AdjustMeter",
    //   headingName: "Adjust Meter",
    //   valueKey: "AdjustMeter",
    //   className: "--width-5",
    //   columnType: "NUMBER",
    // },
    // {
    //   columnKey: "DataRefreshMin",
    //   headingName: "Data RefreshMin",
    //   valueKey: "DataRefreshMin",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "MaxTimeDuration",
    //   headingName: "MaxTimeDuration",
    //   valueKey: "MaxTimeDuration",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "Remarks",
      headingName: "Remarks",
      valueKey: "Remarks",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "IsManualEntry",
    //   headingName: "IsManual Entry",
    //   valueKey: "IsManualEntry",
    //   className: "--width-5",
    //   columnType: "CHECK_BOX",
    // },
    {
      columnKey: "IsActive",
      headingName: "IsActive",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  REFRESHTIME: [
    // {
    //   columnKey: "RID",
    //   headingName: "#ID",
    //   valueKey: "RID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "ChartRefreshTime",
      headingName: "Chart Refresh Time",
      valueKey: "ChartRefreshTime",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "AlertSMSRefreshTime",
      headingName: "Alert SMS RefreshTime",
      valueKey: "AlertSMSRefreshTime",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "CurrentReadingRefreshTime",
      headingName: "Current Reading RefreshTime",
      valueKey: "CurrentReadingRefreshTime",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "SirenRefreshTime",
      headingName: "Siren Refresh Time",
      valueKey: "SirenRefreshTime",
      className: "--width-5",
      columnType: "STRING",
    },
  ],

  GATEWAYNDEVICECLUB: [
    {
      columnKey: "GatewaynDeviceClubMasterID",
      headingName: "#ID",
      valueKey: "GatewaynDeviceClubMasterID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "GatewaynDeviceClubName",
      headingName: "Name",
      valueKey: "GatewaynDeviceClubName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "DeviceName",
      headingName: "Device",
      valueKey: "DeviceName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "GatewayName",
      headingName: "Gateway",
      valueKey: "GatewayName",
      className: "--width-5",
      columnType: "STRING",
    },

    {
      columnKey: "CompanyName",
      headingName: "SIM",
      valueKey: "CompanyName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  SIM: [
    {
      columnKey: "SID",
      headingName: "#ID",
      valueKey: "SID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "CompanyName",
      headingName: "Company Name",
      valueKey: "CompanyName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "PhoneNo",
      headingName: "Phone no.",
      valueKey: "PhoneNo",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "TariffPlan",
      headingName: "Tariff Plan",
      valueKey: "TariffPlan",
      className: "--width-5",
      columnType: "STRING",
    },

    {
      columnKey: "BillCycle",
      headingName: "Bill Cycle",
      valueKey: "BillCycle",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "SIMNo",
      headingName: "SIM no.",
      valueKey: "SIMNo",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "LastDate",
      headingName: "LastDate",
      valueKey: "LastDate",
      className: "--width-5",
      columnType: "DATE",
    },
    {
      columnKey: "isPrepaid",
      headingName: "isPrepaid",
      valueKey: "isPrepaid",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  SIRENLOCATION: [
    {
      columnKey: "SirenLocationID",
      headingName: "#ID",
      valueKey: "SirenLocationID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "SirenLocationName",
      headingName: "Siren Location",
      valueKey: "SirenLocationName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "DistrictName",
      headingName: "Disctrict",
      valueKey: "DistrictName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "GatewayMasterID",
      headingName: "GatewayMasterID",
      valueKey: "GatewayMasterID",
      className: "--width-5",
      columnType: "STRING",
    },

    {
      columnKey: "GatewayIMEI",
      headingName: "GatewayIMEI",
      valueKey: "GatewayIMEI",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "SAddress",
      headingName: "Address",
      valueKey: "SAddress",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Latitude",
      headingName: "Latitude",
      valueKey: "Latitude",
      className: "--width-5",
      columnType: "NUMBER",
    },
    {
      columnKey: "Longitude",
      headingName: "Longitude",
      valueKey: "Longitude",
      className: "--width-5",
      columnType: "NUMBER",
    },
    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  STATE: [
    {
      columnKey: "SID",
      headingName: "#ID",
      valueKey: "SID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "StateName",
      headingName: "State Name",
      valueKey: "StateName",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "GStateName",
    //   headingName: "રાજ્યનું નામ",
    //   valueKey: "GStateName",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  TALUKA: [
    // {
    //   columnKey: "TID",
    //   headingName: "#ID",
    //   valueKey: "TID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "TalukaName",
      headingName: "Taluka Name",
      valueKey: "TalukaName",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "gTalukaName",
    //   headingName: "તાલુકાનું નામ",
    //   valueKey: "gTalukaName",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "DistName",
      headingName: "District",
      valueKey: "DistName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  TYPE: [
    {
      columnKey: "TypeID",
      headingName: "#ID",
      valueKey: "TypeID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "TypeName",
      headingName: "Type Name",
      valueKey: "TypeName",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "gTypeName",
    //   headingName: "પ્રકાર નામ",
    //   valueKey: "gTypeName",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  VILLAGE: [
    // {
    //   columnKey: "VID",
    //   headingName: "#ID",
    //   valueKey: "VID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "VillageName",
      headingName: "Village Name",
      valueKey: "VillageName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "TalukaName",
      headingName: "Taluka",
      valueKey: "TalukaName",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "gVillageName",
    //   headingName: "ગામનું નામ",
    //   valueKey: "gVillageName",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "Latitude",
      headingName: "Latitude",
      valueKey: "Latitude",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Longitude",
      headingName: "Longitude",
      valueKey: "Longitude",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Altitude",
      headingName: "Altitude",
      valueKey: "Altitude",
      className: "--width-5",
      columnType: "STRING",
    },

    {
      columnKey: "DistName",
      headingName: "District",
      valueKey: "DistName",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "StateName",
    //   headingName: "State Name",
    //   valueKey: "StateName",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "Name",
    //   headingName: "Reading Location Name",
    //   valueKey: "Name",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "Remarks",
    //   headingName: "Remarks",
    //   valueKey: "Remarks",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  WARNINGRULE: [
    // {
    //   columnKey: "WID",
    //   headingName: "#ID",
    //   valueKey: "WID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "DangerCategoryName",
      headingName: "Danger Category",
      valueKey: "DangerCategoryName",
      className: "--width-5",
      columnType: "COLOR",
    },
    {
      columnKey: "VillageName",
      headingName: "Village",
      valueKey: "VillageName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "TalukaName",
      headingName: "Taluka",
      valueKey: "TalukaName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Name",
      headingName: "Reading Location",
      valueKey: "Name",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "WaterLowerLevel",
      headingName: "Water Low Lvl (mtr)",
      valueKey: "WaterLowerLevel",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "WaterHigerLevel",
      headingName: "Water High Lvl (mtr)",
      valueKey: "WaterHigerLevel",
      className: "--width-5",
      columnType: "NUMBER",
    },
    // {
    //   columnKey: "AutoSMS",
    //   headingName: "Auto SMS",
    //   valueKey: "AutoSMS",
    //   className: "--width-5",
    //   columnType: "CHECK_BOX",
    // },
    // {
    //   columnKey: "AutoEMail",
    //   headingName: "Auto Email",
    //   valueKey: "AutoEMail",
    //   className: "--width-5",
    //   columnType: "CHECK_BOX",
    // },
    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  CONTACTCLUB: [
    {
      columnKey: "CCID",
      headingName: "#ID",
      valueKey: "CCID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "TypeID",
      headingName: "Type",
      valueKey: "TypeID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "ContactID",
      headingName: "Contact",
      valueKey: "ContactID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "MasterID",
      headingName: "Master",
      valueKey: "MasterID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  DAILYREADINGEFFECTEDVILLAGES: [
    {
      columnKey: "EVID",
      headingName: "#ID",
      valueKey: "EVID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "DRID",
      headingName: "DRID",
      valueKey: "DRID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "VillageID",
      headingName: "Village",
      valueKey: "VillageID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "WarningRuleID",
      headingName: "Warning Rule",
      valueKey: "WarningRuleID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "IsSMS",
      headingName: "IsSMS",
      valueKey: "IsSMS",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
    {
      columnKey: "ISEMail",
      headingName: "ISEMail",
      valueKey: "ISEMail",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  DAILYREADINGRECORD: [
    // {
    //   columnKey: "DRID",
    //   headingName: "#ID",
    //   valueKey: "DRID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "DistrictID",
    //   headingName: "District",
    //   valueKey: "DistrictID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
      {
        columnKey: "Name",
        headingName: "Reading Location",
        valueKey: "Name",
        className: "--width-5",
        columnType: "STRING",
      },
    {
      columnKey: "Edate",
      headingName: "Date",
      valueKey: "Edate",
      className: "--width-5",
      columnType: "DATE",
    },
    {
      columnKey: "Etime_Org",
      headingName: "Time",
      valueKey: "Etime_Org",
      className: "--width-5",
      columnType: "TIME",
    },
    {
      columnKey: "WaterLevel",
      headingName: "Water Level(ft)",
      valueKey: "WaterLevel",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "WaterLevel_MTR",
      headingName: "Water Level(mtr)",
      valueKey: "WaterLevel_MTR",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "WaterLevel_mA",
    //   headingName: "WaterLevel_mA",
    //   valueKey: "WaterLevel_mA",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    
    // {
    //   columnKey: "DangerWaterLevel",
    //   headingName: "DangerWaterLevel(ft)",
    //   valueKey: "DangerWaterLevel",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "MinWaterLevel",
    //   headingName: "MinWaterLevel(ft)",
    //   valueKey: "MinWaterLevel",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "MaxWaterLevel",
    //   headingName: "MaxWaterLevel(ft)",
    //   valueKey: "MaxWaterLevel",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "EDateTime",
    //   headingName: "EDateTime",
    //   valueKey: "EDateTime",
    //   className: "--width-5",
    //   columnType: "DATE",
    // },
    // {
    //   columnKey: "BetteryLevel",
    //   headingName: "BetteryLevel",
    //   valueKey: "BetteryLevel",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "SingleLevel",
    //   headingName: "SingleLevel",
    //   valueKey: "SingleLevel",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "SkipReason",
    //   headingName: "SkipReason",
    //   valueKey: "SkipReason",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "ErrorData",
    //   headingName: "ErrorData",
    //   valueKey: "ErrorData",
    //   className: "--width-5",
    //   columnType: "CHECK_BOX",
    // },
    // {
    //   columnKey: "IsSkip",
    //   headingName: "IsSkip",
    //   valueKey: "IsSkip",
    //   className: "--width-5",
    //   columnType: "CHECK_BOX",
    // },
  ],

  DEVICELOG: [
    {
      columnKey: "RID",
      headingName: "#ID",
      valueKey: "RID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "SirenStartDate",
      headingName: "Siren StartDate",
      valueKey: "SirenStartDate",
      className: "--width-5",
      columnType: "DATE",
    },
    {
      columnKey: "SirenStartUserID",
      headingName: "Siren StartUserID",
      valueKey: "SirenStartUserID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "SirenStartMobileNo",
      headingName: "Siren StartMobileNo",
      valueKey: "SirenStartMobileNo",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "VillageID",
      headingName: "Village",
      valueKey: "VillageID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Category",
      headingName: "Category",
      valueKey: "Category",
      className: "--width-5",
      columnType: "STRING",
    },
  ],

  DEVICE: [
    {
      columnKey: "DeviceMasterID",
      headingName: "#ID",
      valueKey: "DeviceMasterID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "DeviceName",
      headingName: "Name",
      valueKey: "DeviceName",
      className: "--width-5",
      columnType: "DATE",
    },
    {
      columnKey: "DeviceType",
      headingName: "Type",
      valueKey: "DeviceType",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "CompanyName",
      headingName: "Company Name",
      valueKey: "CompanyName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "SerialNo",
      headingName: "Serial no.",
      valueKey: "SerialNo",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Type",
      headingName: "Type",
      valueKey: "Type",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Warrenty",
      headingName: "Warrenty",
      valueKey: "Warrenty",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Remarks",
      headingName: "Remarks",
      valueKey: "Remarks",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "IsActive",
      headingName: "IsActive",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  DISTRICT: [
    {
      columnKey: "DID",
      headingName: "#ID",
      valueKey: "DID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "DistName",
      headingName: "District Name",
      valueKey: "DistName",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "GDistrictName",
    //   headingName: "જિલ્લાનું નામ",
    //   valueKey: "GDistrictName",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "StateID",
      headingName: "State",
      valueKey: "StateID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  ERRORMESSAGE: [
    {
      columnKey: "ErrorID",
      headingName: "#ID",
      valueKey: "ErrorID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "ErrorMessage",
      headingName: "Error Message",
      valueKey: "ErrorMessage",
      className: "--width-5",
      columnType: "STRING",
    },
  ],

  TIDAL: [
    // {
    //   columnKey: "TID",
    //   headingName: "#ID",
    //   valueKey: "TID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "Name",
      headingName: "Reading Location",
      valueKey: "Name",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "TDate",
      headingName: "Date",
      valueKey: "TDate",
      className: "--width-5",
      columnType: "DATE",
    },
    {
      columnKey: "TTime",
      headingName: "Time",
      valueKey: "TTime",
      className: "--width-5",
      columnType: "TIME",
    },
    {
      columnKey: "TTypeName",
      headingName: "Type",
      valueKey: "TTypeName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Height_MTR",
      headingName: "Height (mtr)",
      valueKey: "Height_MTR",
      className: "--width-5",
      columnType: "STRING",
    },
  ],

  RAINGAUGELOCATION: [
    {
      columnKey: "RaingaugeLocationID",
      headingName: "#ID",
      valueKey: "RaingaugeLocationID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "RaingaugeLocationName",
      headingName: "Location",
      valueKey: "RaingaugeLocationName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "DistrictName",
      headingName: "Disctrict",
      valueKey: "DistrictName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "SAddress",
      headingName: "Address",
      valueKey: "SAddress",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Latitude",
      headingName: "Latitude",
      valueKey: "Latitude",
      className: "--width-5",
      columnType: "NUMBER",
    },
    {
      columnKey: "Longitude",
      headingName: "Longitude",
      valueKey: "Longitude",
      className: "--width-5",
      columnType: "NUMBER",
    },
    {
      columnKey: "GatewayName",
      headingName: "GatewayMaster",
      valueKey: "GatewayName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "GatewayIMEI",
      headingName: "GatewayIMEI",
      valueKey: "GatewayIMEI",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  GATEWAYSENSOR: [
    {
      columnKey: "DRID",
      headingName: "#ID",
      valueKey: "DRID",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "GatewayMasterID",
    //   headingName: "GatewayMaster",
    //   valueKey: "GatewayMasterID",
    //   className: "--width-5",
    //   columnType: "date",
    // },
    {
      columnKey: "Name",
      headingName: "Reading Location Name",
      valueKey: "Name",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "WaterLevel",
      headingName: "WaterLevel",
      valueKey: "WaterLevel",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "Reading_mA",
    //   headingName: "Reading_mA",
    //   valueKey: "Reading_mA",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "WaterLevel_FT",
      headingName: "WaterLevel_FT",
      valueKey: "WaterLevel_FT",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "MinWaterLevel",
      headingName: "MinWaterLevel",
      valueKey: "MinWaterLevel",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "MaxWaterLevel",
      headingName: "MaxWaterLevel",
      valueKey: "MaxWaterLevel",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Trend",
      headingName: "Trend",
      valueKey: "Trend",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "DangerWaterLevel",
      headingName: "DangerWaterLevel",
      valueKey: "DangerWaterLevel",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "BetteryLevel",
    //   headingName: "Bettery Level",
    //   valueKey: "BetteryLevel",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "SingleLevel",
    //   headingName: "Single Level",
    //   valueKey: "SingleLevel",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "GatewayIMEI",
      headingName: "Gateway IMEI",
      valueKey: "GatewayIMEI",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "GatewayName",
    //   headingName: "Gateway Name",
    //   valueKey: "GatewayName",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "IsPowerOn",
    //   headingName: "IsPowerOn",
    //   valueKey: "IsPowerOn",
    //   className: "--width-5",
    //   columnType: "CHECK_BOX",
    // },
    // {
    //   columnKey: "IsReal",
    //   headingName: "IsReal",
    //   valueKey: "IsReal",
    //   className: "--width-5",
    //   columnType: "CHECK_BOX",
    // },
  ],

  READINGNOTIFICATIONLOG: [
    {
      columnKey: "RID",
      headingName: "#ID",
      valueKey: "RID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "RType",
      headingName: "Type",
      valueKey: "RType",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "RDate",
      headingName: "Date",
      valueKey: "RDate",
      className: "--width-5",
      columnType: "DATE",
    },
    {
      columnKey: "SStatus",
      headingName: "Status",
      valueKey: "SStatus",
      className: "--width-5",
      columnType: "STRING",
    },
  ],

  SENTSMS: [
    {
      columnKey: "RID",
      headingName: "#ID",
      valueKey: "RID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "SDateTime",
      headingName: "DateTime",
      valueKey: "SDateTime",
      className: "--width-5",
      columnType: "DATE",
    },
    {
      columnKey: "DangerCategoryName",
      headingName: "DangerCategory Name",
      valueKey: "DangerCategoryName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "VillageName",
      headingName: "Village Name",
      valueKey: "VillageName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "WaterLevel",
      headingName: "Water Level",
      valueKey: "WaterLevel",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "ContactName",
      headingName: "Contact Name",
      valueKey: "ContactName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "CMobileNo",
      headingName: "MobileNo",
      valueKey: "CMobileNo",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "SMessage",
      headingName: "Message",
      valueKey: "SMessage",
      className: "--width-5",
      columnType: "STRING",
    },
  ],

  SMSCOUNTER: [
    {
      columnKey: "RID",
      headingName: "#ID",
      valueKey: "RID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "CDate",
      headingName: "Date",
      valueKey: "CDate",
      className: "--width-5",
      columnType: "DATE",
    },
    {
      columnKey: "MobileNo",
      headingName: "MobileNo",
      valueKey: "MobileNo",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "STypes",
      headingName: "Types",
      valueKey: "STypes",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "MStatus",
      headingName: "Status",
      valueKey: "MStatus",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "SentSMSCounter",
      headingName: "Sent SMSCounter",
      valueKey: "SentSMSCounter",
      className: "--width-5",
      columnType: "STRING",
    },
  ],

  // doubt
  SMSUTILITY: [
    {
      columnKey: "RID",
      headingName: "#ID",
      valueKey: "RID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "BaseURL",
      headingName: "BaseURL",
      valueKey: "BaseURL",
      className: "--width-5",
      columnType: "DATE",
    },
    {
      columnKey: "UserID",
      headingName: "UserID",
      valueKey: "UserID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Pwd",
      headingName: "Pwd",
      valueKey: "Pwd",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "SenderID",
      headingName: "SenderID",
      valueKey: "SenderID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "MunID",
      headingName: "MunID",
      valueKey: "MunID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "EntityID",
      headingName: "EntityID",
      valueKey: "EntityID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "SMSCredit",
      headingName: "SMSCredit",
      valueKey: "SMSCredit",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "SMSCounter",
      headingName: "SMSCounter",
      valueKey: "SMSCounter",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "SMSRemains",
      headingName: "SMSRemains",
      valueKey: "SMSRemains",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "isActive",
      headingName: "isActive",
      valueKey: "isActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  // USERREADINGLOCATION: [
  //   {
  //     columnKey: "ReadingLocationID",
  //     headingName: "#ID",
  //     valueKey: "ReadingLocationID",
  //     className: "--width-5",
  //     columnType: "STRING",
  //   },
  //   {
  //     columnKey: "GatewayMasterID",
  //     headingName: "Gateway",
  //     valueKey: "GatewayMasterID",
  //     className: "--width-5",
  //     columnType: "STRING",
  //   },
  //   {
  //     columnKey: "GatewayIMEI",
  //     headingName: "Gateway IMEI",
  //     valueKey: "GatewayIMEI",
  //     className: "--width-5",
  //     columnType: "STRING",
  //   },
  //   {
  //     columnKey: "Resistance",
  //     headingName: "Resistance",
  //     valueKey: "Resistance",
  //     className: "--width-5",
  //     columnType: "STRING",
  //   },
  //   {
  //     columnKey: "MilliAmpsMin",
  //     headingName: "MilliAmpsMin",
  //     valueKey: "MilliAmpsMin",
  //     className: "--width-5",
  //     columnType: "STRING",
  //   },
  //   {
  //     columnKey: "MilliAmpsMax",
  //     headingName: "MilliAmpsMax",
  //     valueKey: "MilliAmpsMax",
  //     className: "--width-5",
  //     columnType: "STRING",
  //   },
  //   {
  //     columnKey: "AdjustMeter",
  //     headingName: "Adjust Meter",
  //     valueKey: "AdjustMeter",
  //     className: "--width-5",
  //     columnType: "STRING",
  //   },
  //   {
  //     columnKey: "DataRefreshMin",
  //     headingName: "DataRefreshMin",
  //     valueKey: "DataRefreshMin",
  //     className: "--width-5",
  //     columnType: "STRING",
  //   },
  //   {
  //     columnKey: "IsActive",
  //     headingName: "IsActive",
  //     valueKey: "IsActive",
  //     className: "--width-5",
  //     columnType: "CHECK_BOX",
  //   },
  // ],

  USERMENUPERMISSION: [
    {
      columnKey: "RID",
      headingName: "#ID",
      valueKey: "RID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "MenuID",
      headingName: "MenuID",
      valueKey: "MenuID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "UserID",
      headingName: "UserID",
      valueKey: "UserID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "canADD",
      headingName: "canADD",
      valueKey: "canADD",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
    {
      columnKey: "canEDIT",
      headingName: "canEDIT",
      valueKey: "canEDIT",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
    {
      columnKey: "canDELETE",
      headingName: "canDELETE",
      valueKey: "canDELETE",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
    {
      columnKey: "canVIEW",
      headingName: "canVIEW",
      valueKey: "canVIEW",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  USERTYPE: [
    {
      columnKey: "UserTypeId",
      headingName: "#ID",
      valueKey: "UserTypeId",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "UserType",
      headingName: "UserType",
      valueKey: "UserType",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "MunID",
      headingName: "MunID",
      valueKey: "MunID",
      className: "--width-5",
      columnType: "STRING",
    },
  ],

  USERTYPEMENUPERMISSION: [
    {
      columnKey: "RID",
      headingName: "#ID",
      valueKey: "RID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "MenuID",
      headingName: "MenuID",
      valueKey: "MenuID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "UserTypeID",
      headingName: "UserTypeID",
      valueKey: "UserTypeID",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "canADD",
      headingName: "canADD",
      valueKey: "canADD",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
    {
      columnKey: "canEDIT",
      headingName: "canEDIT",
      valueKey: "canEDIT",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
    {
      columnKey: "canDELETE",
      headingName: "canDELETE",
      valueKey: "canDELETE",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
    {
      columnKey: "canVIEW",
      headingName: "canVIEW",
      valueKey: "canVIEW",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  GATEWAYSIREN: [
    // {
    //   columnKey: "GatewaySirenDataID",
    //   headingName: "#ID",
    //   valueKey: "GatewaySirenDataID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "SirenLocationID",
    //   headingName: "Siren Location",
    //   valueKey: "SirenLocationID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "GatewayMasterID",
    //   headingName: "Gateway",
    //   valueKey: "GatewayMasterID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "GatewayIMEI",
      headingName: "GatewayIMEI",
      valueKey: "GatewayIMEI",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "RDateTime",
      headingName: "Date",
      valueKey: "RDateTime",
      className: "--width-5",
      columnType: "DATE",
    },
    {
      columnKey: "CurrentIP",
      headingName: "CurrentIP",
      valueKey: "CurrentIP",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "BetteryLevel",
      headingName: "BetteryLevel",
      valueKey: "BetteryLevel",
      className: "--width-5",
      columnType: "NUMBER",
    },
    {
      columnKey: "SingleLevel",
      headingName: "SingleLevel",
      valueKey: "SingleLevel",
      className: "--width-5",
      columnType: "NUMBER",
    },
    {
      columnKey: "PowerLevel",
      headingName: "PowerLevel",
      valueKey: "PowerLevel",
      className: "--width-5",
      columnType: "NUMBER",
    },
    // {
    //   columnKey: "IsReal",
    //   headingName: "IsReal",
    //   valueKey: "IsReal",
    //   className: "--width-5",
    //   columnType: "CHECK_BOX",
    // },
    {
      columnKey: "IsPowerOn",
      headingName: "IsPowerOn",
      valueKey: "IsPowerOn",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  RESERVOIR: [
    // {
    //   columnKey: "ReservoirID",
    //   headingName: "#ID",
    //   valueKey: "ReservoirID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "ReservoirName",
      headingName: "Reservoir Name",
      valueKey: "ReservoirName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "ReservoirLocation",
      headingName: "Reservoir Location",
      valueKey: "ReservoirLocation",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "ReservoirLatitude",
    //   headingName: "Reservoir Latitude",
    //   valueKey: "ReservoirLatitude",
    //   className: "--width-5",
    //   columnType: "NUMBER",
    // },
    // {
    //   columnKey: "ReservoirLongitude",
    //   headingName: "Reservoir Longitude",
    //   valueKey: "ReservoirLongitude",
    //   className: "--width-5",
    //   columnType: "NUMBER",
    // },
    // {
    //   columnKey: "KMFromCapital",
    //   headingName: "KMFromCapital",
    //   valueKey: "KMFromCapital",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "TotalLevelHeight",
      headingName: "Total Level Height (mtr)",
      valueKey: "TotalLevelHeight",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "DangerLevelHeight",
      headingName: "Danger LevelHeight (mtr)",
      valueKey: "DangerLevelHeight",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "WarningLevelHeight",
      headingName: "Warning LevelHeight (mtr)",
      valueKey: "WarningLevelHeight",
      className: "--width-5",
      columnType: "STRING",
    },
    // {
    //   columnKey: "NornalDischarge",
    //   headingName: "Normal Discharge",
    //   valueKey: "NornalDischarge",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "MaxDischarge",
    //   headingName: "Max Discharge",
    //   valueKey: "MaxDischarge",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    // {
    //   columnKey: "MaxTimeDuration",
    //   headingName: "Max TimeDuration",
    //   valueKey: "MaxTimeDuration",
    //   className: "--width-5",
    //   columnType: "NUMBER",
    // },
    {
      columnKey: "IsActive",
      headingName: "IsActive",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  RESERVOIRDISCHARGEENTRY: [
    // {
    //   columnKey: "ReservoirDischargeEntryID",
    //   headingName: "#ID",
    //   valueKey: "ReservoirDischargeEntryID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },
    {
      columnKey: "ReservoirDischargeEntryDate",
      headingName: "Entry Date",
      valueKey: "ReservoirDischargeEntryDate",
      className: "--width-5",
      columnType: "DATE",
    },
    {
      columnKey: "EDateTime",
      headingName: "Entry Time",
      valueKey: "EDateTime",
      className: "--width-5",
      columnType: "TIME",
    },
    {
      columnKey: "ReservoirName",
      headingName: "Reservoir Name",
      valueKey: "ReservoirName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "CurrentHeight",
      headingName: "Water level (mtr)",
      valueKey: "CurrentHeight",
      className: "--width-5",
      columnType: "NUMBER",
    },

    {
      columnKey: "TotalInflow",
      headingName: "InFlow (Cusec)",
      valueKey: "TotalInflow",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "TotalDischarge",
      headingName: "OutFlow (Cusec)",
      valueKey: "TotalDischarge",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "GrossStorage",
      headingName: "Gross Storage (MCM)",
      valueKey: "GrossStorage",
      className: "--width-5",
      columnType: "NUMBER",
    },
    {
      columnKey: "SkipReason",
      headingName: "Skip Reason",
      valueKey: "SkipReason",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "Remarks",
      headingName: "Remarks",
      valueKey: "Remarks",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "IsActive",
      headingName: "IsActive",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],

  LEVEL: [
    // {
    //   columnKey: "LevelID",
    //   headingName: "LevelID",
    //   valueKey: "LevelID",
    //   className: "--width-5",
    //   columnType: "STRING",
    // },

    {
      columnKey: "LevelName",
      headingName: "Level Name",
      valueKey: "LevelName",
      className: "--width-5",
      columnType: "STRING",
    },

    {
      columnKey: "LevelHeightFrom",
      headingName: "From Height  (mtr)",
      valueKey: "LevelHeightFrom",
      className: "--width-5",
      columnType: "NUMBER",
    },

    {
      columnKey: "LevelHeightTo",
      headingName: "To Height  (mtr)",
      valueKey: "LevelHeightTo",
      className: "--width-5",
      columnType: "NUMBER",
    },

    {
      columnKey: "ReadingLocationName",
      headingName: "Reading Location",
      valueKey: "ReadingLocationName",
      className: "--width-5",
      columnType: "STRING",
    },
    {
      columnKey: "TotalContacts",
      headingName: "Total Contact",
      valueKey: "TotalContacts",
      className: "--width-5",
      columnType: "STRING",
    },

    {
      columnKey: "IsActive",
      headingName: "Is Active",
      valueKey: "IsActive",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
    {
      columnKey: "IsSMS",
      headingName: "Is SMS",
      valueKey: "IsSMS",
      className: "--width-5",
      columnType: "CHECK_BOX",
    },
  ],
};

export { DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS };
