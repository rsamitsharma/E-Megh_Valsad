import express from 'express';
import {
  //Get
  GetContactMaster,
  GetDangerCategoryMaster,
  GetDistrictMaster,
  GetGatewayMaster,
  GetRaingaugeLocationMaster,
  GetReadingLocationMaster,
  GetSIMMaster,
  GetSirenLocationMaster,
  GetStateMaster,
  GetTalukaMaster,
  GetTypeMaster,
  GetUserMaster,
  GetUserTypeMaster,
  GetVillageMaster,
  GetMenuMaster,
  GetDeviceMaster,
  GetGatewaynDeviceClubMaster,
  GetGatewayRaingaugeData,
  GetGatewaySensorData,
  GetGatewaySirenData,
  GetTidalData,
  GetGatewayString,
  GetReadingNotificationLog,
  GetRefreshTimeMaster,
  GetSentSMS,
  GetAffectedVillage,
  GetReservoirMaster,
  GetReservoirDischarge,
  GetDailyReading,
  GetWarningRuleMaster,
  GetContactClubMaster,
  GetLevelMaster,
  GetUserMenuMaster,
  GetDashboardSensorData,
  GetDashboardSirenData,
  GetDailyReadingData,
  GetTopRowNumber,
  // Add
  AddContactMaster,
  AddDangerCategoryMaster,
  AddDistrictMaster,
  AddGatewayMaster,
  AddRaingaugeLocationMaster,
  AddReadingLocationMaster,
  AddSIMMaster,
  AddSirenLocationMaster,
  AddStateMaster,
  AddTalukaMaster,
  AddTypeMaster,
  AddUserMaster,
  AddUserTypeMaster,
  AddVillageMaster,
  AddMenuMaster,
  AddDeviceMaster,
  AddGatewaynDeviceClubMaster,
  AddGatewayRaingaugeData,
  AddGatewaySensorData,
  AddGatewaySirenData,
  AddTidalData,
  AddDailyReading,
  AddUserMenuPermission,
  AddReservoirMaster,
  AddReservoirDischargeEntry,
  AddWarningRuleMaster,
  AddLevelMaster,
  AddRefreshTimeMaster,
  // AddIOTGatewayData,
  //UPDATE
  AddReadingLocation_Admin,
  GetData,
  GetDailyReadingDataReport,
  GetPredictionReport,
  GetPredictionData,
  GetEMailAdminMaster,
  AddEmailAdminMaster,
  // AddVillagePolygon,
  GetVillagePolygonWithPointsAndTiles,
  GetTidalData_Report,
  GetPredictionDataWithVillages,
  GetRainFallReadingDataHourly,
  GetPredictionWihtoutDamOutFlow_NODE,
  GetTidalDataDashboard,
  GetTopRowNumberTidal,
} from '../controller';

const masterRouter = express.Router();

//Get
masterRouter.get('/GetContactMaster', GetContactMaster);
masterRouter.get('/GetData', GetData);
masterRouter.get('/GetDangerCategoryMaster', GetDangerCategoryMaster);
masterRouter.get('/GetDistrictMaster', GetDistrictMaster);
masterRouter.get('/GetGatewayMaster', GetGatewayMaster);
masterRouter.get('/GetRaingaugeLocationMaster', GetRaingaugeLocationMaster);
masterRouter.get('/GetReadingLocationMaster', GetReadingLocationMaster);
masterRouter.get('/GetSIMMaster', GetSIMMaster);
masterRouter.get('/GetSirenLocationMaster', GetSirenLocationMaster);
masterRouter.get('/GetStateMaster', GetStateMaster);
masterRouter.get('/GetTalukaMaster', GetTalukaMaster);
masterRouter.get('/GetTypeMaster', GetTypeMaster);
masterRouter.get('/GetUserMaster', GetUserMaster);
masterRouter.get('/GetUserTypeMaster', GetUserTypeMaster);
masterRouter.get('/GetVillageMaster', GetVillageMaster);
masterRouter.get('/GetMenuMaster', GetMenuMaster);
masterRouter.get('/GetDeviceMaster', GetDeviceMaster);
masterRouter.get('/GetGatewaynDeviceClubMaster', GetGatewaynDeviceClubMaster);
masterRouter.get('/GetGatewayRaingaugeData', GetGatewayRaingaugeData);
masterRouter.get('/GetGatewaySensorData', GetGatewaySensorData);
masterRouter.get('/GetGatewaySirenData', GetGatewaySirenData);
masterRouter.get('/GetTidalData', GetTidalData);
masterRouter.get('/GetGatewayString', GetGatewayString);
masterRouter.get('/GetReadingNotificationLog', GetReadingNotificationLog);
masterRouter.get('/GetRefreshTimeMaster', GetRefreshTimeMaster);
masterRouter.get('/GetSentSMS', GetSentSMS);
masterRouter.get('/GetAffectedVillage', GetAffectedVillage);
masterRouter.get('/GetReservoirMaster', GetReservoirMaster);
masterRouter.get('/GetReservoirDischarge', GetReservoirDischarge);
masterRouter.get('/GetDailyReading', GetDailyReading);
masterRouter.get('/GetWarningRuleMaster', GetWarningRuleMaster);
masterRouter.get('/GetContactClubMaster', GetContactClubMaster);
masterRouter.get('/GetLevelMaster', GetLevelMaster);
masterRouter.get('/GetUserMenuMaster', GetUserMenuMaster);
masterRouter.get('/GetDashboardSensorData', GetDashboardSensorData);
masterRouter.get('/GetDashboardSirenData', GetDashboardSirenData);
masterRouter.get('/GetDailyReadingData', GetDailyReadingData);
masterRouter.get('/GetDailyReadingDataReport', GetDailyReadingDataReport);
masterRouter.get('/GetPredictionReport', GetPredictionReport);
masterRouter.get('/GetPredictionData', GetPredictionData);
masterRouter.get('/GetEMailAdminMaster', GetEMailAdminMaster);
masterRouter.get('/GetVillagePolygonWithPointsAndTiles', GetVillagePolygonWithPointsAndTiles);
masterRouter.get('/GetTidalData_Report', GetTidalData_Report);
masterRouter.get('/GetPredictionDataWithVillages', GetPredictionDataWithVillages);
masterRouter.get('/GetRainFallReadingDataHourly', GetRainFallReadingDataHourly);
masterRouter.get('/GetPredictionWihtoutDamOutFlow_NODE', GetPredictionWihtoutDamOutFlow_NODE);
masterRouter.get('/GetTopRowNumber', GetTopRowNumber);
masterRouter.get('/GetTopRowNumberTidal', GetTopRowNumberTidal);
masterRouter.get('/GetTidalDataDashboard', GetTidalDataDashboard);

//Add
masterRouter.post('/AddContactMaster', AddContactMaster);
masterRouter.post('/AddDangerCategoryMaster', AddDangerCategoryMaster);
masterRouter.post('/AddDistrictMaster', AddDistrictMaster);
masterRouter.post('/AddGatewayMaster', AddGatewayMaster);
masterRouter.post('/AddRaingaugeLocationMaster', AddRaingaugeLocationMaster);
masterRouter.post('/AddReadingLocationMaster', AddReadingLocationMaster);
masterRouter.post('/AddSIMMaster', AddSIMMaster);
masterRouter.post('/AddSirenLocationMaster', AddSirenLocationMaster);
masterRouter.post('/AddStateMaster', AddStateMaster);
masterRouter.post('/AddTalukaMaster', AddTalukaMaster);
masterRouter.post('/AddTypeMaster', AddTypeMaster);
masterRouter.post('/AddUserMaster', AddUserMaster);
masterRouter.post('/AddUserTypeMaster', AddUserTypeMaster);
masterRouter.post('/AddVillageMaster', AddVillageMaster);
masterRouter.post('/AddMenuMaster', AddMenuMaster);
masterRouter.post('/AddDeviceMaster', AddDeviceMaster);
masterRouter.post('/AddGatewaynDeviceClubMaster', AddGatewaynDeviceClubMaster);
masterRouter.post('/AddGatewayRaingaugeData', AddGatewayRaingaugeData);
masterRouter.post('/AddGatewaySensorData', AddGatewaySensorData);
masterRouter.post('/AddGatewaySirenData', AddGatewaySirenData);
masterRouter.post('/AddTidalData', AddTidalData);
masterRouter.post('/AddDailyReading', AddDailyReading);
masterRouter.post('/AddUserMenuPermission', AddUserMenuPermission);
masterRouter.post('/AddReservoirMaster', AddReservoirMaster);
masterRouter.post('/AddReservoirDischargeEntry', AddReservoirDischargeEntry);
masterRouter.post('/AddWarningRuleMaster', AddWarningRuleMaster);
masterRouter.post('/AddLevelMaster', AddLevelMaster);
masterRouter.post('/AddRefreshTimeMaster', AddRefreshTimeMaster);
// masterRouter.post('/AddIOTGatewayData', AddIOTGatewayData);
masterRouter.post('/AddEmailAdminMaster', AddEmailAdminMaster);
// masterRouter.post('/AddVillagePolygon', AddVillagePolygon);
//UPDATE

masterRouter.put('/AddReadingLocation_Admin', AddReadingLocation_Admin);

export default masterRouter;
