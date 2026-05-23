import { Request, Response } from 'express';
import sql, { MAX, ConnectionPool } from 'mssql';
import sqlConfig from '../config/sqlconfig';
import { ContactMasterParam } from '../models';
import convert from 'xml-js';

const GetContactMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { IsAll, ContactID } = req.query as unknown as ContactMasterParam;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('IsAll', sql.Bit(), IsAll)
      .input('CID', sql.Decimal(18, 0), ContactID)
      .execute('sp_GetContactMaster_NODE');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetDangerCategoryMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { IsAll, DangerCategoryID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('IsAll', sql.Bit(), IsAll)
      .input('DID', sql.Decimal(18, 0), DangerCategoryID)
      .execute('sp_GetDangerCategoryMaster_NODE');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetDistrictMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { DID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool.request().input('DID', sql.Int, DID).execute('sp_GetDistrictMaster');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetGatewayMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { IsAll, GatewayMasterID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('IsAll', sql.Bit(), IsAll)
      .input('FID', sql.Decimal(18, 0), GatewayMasterID)
      .execute('sp_GetGatewayMaster_NODE');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetRaingaugeLocationMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { IsAll, RaingaugeLocationID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('IsAll', sql.Bit(), IsAll)
      .input('RaingaugeLocationID', sql.Decimal(18, 0), RaingaugeLocationID)
      .execute('sp_GetRaingaugeLocationMaster');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetReadingLocationMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  try {
    const { IsAll, ReadingLocationID } = req.query;

    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('IsAll', sql.Bit(), IsAll)
      .input('RLID', sql.Decimal(18, 0), ReadingLocationID)
      .execute('sp_GetReadingLocationMaster_NODE');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetPredictionDataWithVillages = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  try {
    const { ReadingLocationID } = req.query;

    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('ReadingLocationID', sql.Decimal(18, 0), ReadingLocationID)
      .execute('sp_GetPredictionDataWithVillages');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetSIMMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { IsAll, SIMID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('IsAll', sql.Bit(), IsAll)
      .input('SID', sql.Decimal(18, 0), SIMID)
      .execute('sp_GetSIMMaster_NODE');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetSirenLocationMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { IsAll, SirenLocationID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('IsAll', sql.Bit(), IsAll)
      .input('UserID', sql.Decimal(18, 0), SirenLocationID)
      .execute('sp_GetSirenLocationMaster');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetStateMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { SID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool.request().input('SID', sql.Decimal(18, 0), SID).execute('sp_GetStateMaster_NODE');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetTalukaMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { TID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool.request().input('TID', sql.Decimal(18, 0), TID).execute('sp_GetTalukaMaster_NODE');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetTypeMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { IsAll, TypeID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('IsAll', sql.Bit(), IsAll)
      .input('TypeID', sql.Decimal(18, 0), TypeID)
      .execute('sp_GetTypeMaster');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetUserMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { IsAll, RID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('RID', sql.Decimal(18, 0), RID)
      .input('IsAll', sql.Bit(), IsAll)
      .execute('sp_GetUserMaster_NODE');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordsets,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordsets,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetEMailAdminMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { IsAll, RID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('IsAll', sql.Bit(), IsAll)
      .input('RID', sql.Int, RID)
      .execute('sp_GetEMailAdminMaster');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordsets,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordsets,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetUserTypeMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { UserTypeID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('UserTypeID', sql.Decimal(18, 0), UserTypeID)
      .execute('sp_GetUserTypeMaster');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordsets,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetVillageMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { IsAll, VillageID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('IsAll', sql.Bit(), IsAll)
      .input('VID', sql.Decimal(18, 0), VillageID)
      .execute('sp_GetVillageMaster_NODE');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetMenuMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool.request().execute('sp_GetMenuMaster');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetDeviceMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { IsAll, DeviceMasterID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('IsAll', sql.Bit(), IsAll)
      .input('DeviceMasterID', sql.Decimal(18, 0), DeviceMasterID)
      .execute('sp_GetDeviceMaster');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetRainFallReadingDataHourly = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool.request().execute('sp_RainFallReadingDataHourly');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetGatewaynDeviceClubMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { IsAll } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool.request().input('IsAll', sql.Bit(), IsAll).execute('sp_GetGatewaynDeviceClubMaster');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetGatewayRaingaugeData = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { GatewayRaingaugeDataID, FromDate, ToDate } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('GatewayRaingaugeDataID', sql.Decimal(18, 0), GatewayRaingaugeDataID)
      .input('FromDate', sql.VarChar(50), FromDate)
      .input('ToDate', sql.VarChar(50), ToDate)
      .execute('sp_GetGatewayRaingaugeData');

    if (!Result.recordset?.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetGatewaySensorData = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { ReadingLocationID, FromDate, ToDate } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('ReadingLocationID', sql.Decimal(18, 0), ReadingLocationID)
      .input('FromDate', sql.VarChar(50), FromDate)
      .input('ToDate', sql.VarChar(50), ToDate)
      .execute('sp_GetGatewaySensorData');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetGatewaySirenData = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { GatewaySirenDataID, FromDate, ToDate } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('GatewaySirenDataID', sql.Decimal(18, 0), GatewaySirenDataID)
      .input('FromDate', sql.DateTime(), FromDate)
      .input('ToDate', sql.DateTime(), ToDate)
      .execute('sp_GetGatewaySirenData');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetTidalData = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { ReadingLocationID, TopRowNumber } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('ReadingLocationID', sql.Decimal(18, 0), ReadingLocationID)
      .input('TopRowNumber', sql.Int, TopRowNumber)
      .execute('sp_GetTidalData_NODE');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetTidalData_Report = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { ReadingLocationID, TidalDataId } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('ReadingLocationID', sql.Decimal(18, 0), ReadingLocationID)
      .input('TidalDataId', sql.Int(), TidalDataId)
      .execute('sp_GetTidalData_Report_NODE');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetTidalDataDashboard = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { ReadingLocationID, FromDate, ToDate } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('ReadingLocationID', sql.Decimal(18, 0), ReadingLocationID)
      .input('FromDate', sql.DateTime, FromDate)
      .input('ToDate', sql.DateTime, ToDate)
      .execute('sp_GetTidalData_NODEDashboard');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetGatewayString = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool.request().execute('sp_GetGatewayString');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetReadingNotificationLog = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool.request().execute('sp_GetReadingNotificationLog');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetPredictionData = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool.request().execute('sp_GetPredictionData_NODE');

    const table1 = Result.recordsets[0]; // First result set
    const table2 = Result.recordsets[1]; // Second result set
    const table3 = Result.recordsets[2]; // Second result set

    if (!table1.length && !table2.length && !table3.length) {
      res.status(404).json({
        Table1: table1,
        Table2: table2,
        Table3: table3,
        message: 'No Data Found in both tables',
      });
      return;
    }

    res.status(200).json({
      Table1: table1,
      Table2: table2,
      Table3: table3,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetPredictionWihtoutDamOutFlow_NODE = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool.request().execute('sp_GetPredictionWihtoutDamOutFlow_NODE');

    const table1 = Result.recordsets[0]; // First result set
    const table2 = Result.recordsets[1]; // Second result set
    const table3 = Result.recordsets[2]; // Second result set

    if (!table1.length && !table2.length && !table3.length) {
      res.status(404).json({
        Table1: table1,
        Table2: table2,
        Table3: table3,
        message: 'No Data Found in both tables',
      });
      return;
    }

    res.status(200).json({
      Table1: table1,
      Table2: table2,
      Table3: table3,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetVillagePolygonWithPointsAndTiles = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  try {
    const { VillageId } = req.query;

    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('VillageId', sql.Int, VillageId)
      .execute('sp_GetVillagePolygonWithPointsAndTilesJson');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetRefreshTimeMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { RID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool.request().input('RID', sql.Decimal(18, 0), RID).execute('sp_GetRefreshTimeMaster');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetSentSMS = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool.request().execute('sp_GetSentSMS');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetAffectedVillage = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { ReadingLocationID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('ReadingLocationID', sql.Decimal(18, 0), ReadingLocationID)
      .execute('sp_GetAffectedVillage');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetReservoirMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { IsAll, ReservoirID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('IsAll', sql.Bit(), IsAll)
      .input('ReservoirID', sql.Decimal(18, 0), ReservoirID)
      .execute('sp_GetReservoirMaster');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetReservoirDischarge = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { ReservoirDischargeEntryID, ReservoirID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('ReservoirID', sql.Decimal(18, 0), ReservoirID)
      .input('ReservoirDischargeEntryID', sql.Decimal(18, 0), ReservoirDischargeEntryID)
      .execute('sp_GetReservoirDischargeEntry');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetData = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { ReadingLocationID, Days } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('ReadingLocationID', sql.Decimal(18, 0), ReadingLocationID)
      .input('Days', sql.VarChar(30), Days)
      .execute('sp_GetDailyReadingDataByDays');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordsets,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordsets,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetDailyReading = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { ReadingLocationID, FromDate, ToDate } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('ReadingLocationID', sql.Decimal(18, 0), ReadingLocationID)
      .input('FromDate', sql.DateTime(), FromDate)
      .input('ToDate', sql.DateTime(), ToDate)
      .execute('sp_GetDailyReading');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetPredictionReport = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { StartDateTime, EndDateTime } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('StartDateTime', sql.DateTime(), StartDateTime)
      .input('EndDateTime', sql.DateTime(), EndDateTime)
      .execute('Get_Hourly_WaterLevel_Predictions');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetDailyReadingDataReport = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { ReadingLocationID, DailyReadingId } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('ReadingLocationID', sql.Decimal(18, 0), ReadingLocationID)
      .input('DailyReadingId', sql.Decimal(18, 0), DailyReadingId)
      .execute('sp_GetDailyReadingData_NODE');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetDailyReadingData = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { ReadingLocationID, TopRowNumber } = req.query;
  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('ReadingLocationID', sql.Decimal(18, 0), ReadingLocationID)
      .input('TopRowNumber', sql.Int, TopRowNumber)
      .execute('sp_GetDailyReadingData');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordsets,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordsets,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetWarningRuleMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { IsAll, WarningRuleMasterID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('IsAll', sql.Bit(), IsAll)
      .input('WID', sql.Decimal(18, 0), WarningRuleMasterID)
      .execute('sp_GetWarningRuleMaster_NODE');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetContactClubMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { IsAll, CCID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('IsAll', sql.Bit(), IsAll)
      .input('CCID', sql.Decimal(18, 0), CCID)
      .execute('sp_GetContactClubMaster');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetLevelMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { IsAll, LevelID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('IsAll', sql.Bit(), IsAll)
      .input('LevelID', sql.Decimal(18, 0), LevelID)
      .execute('sp_GetLevelMaster_NODE');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordsets,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordsets,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetUserMenuMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { UserID } = req.query;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool
      .request()
      .input('UserID', sql.Decimal(18, 0), UserID)
      .execute('sp_GetUserMenuMaster');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetDashboardSensorData = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool.request().execute('sp_GetDashboardSensorData_NODE');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetDashboardSirenData = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;

  try {
    pool = await sql.connect(sqlConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Result: any = await pool.request().execute('sp_GetDashboardSirenData');

    if (!Result.recordset.length) {
      res.status(404).json({
        Table: Result.recordset,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      Table: Result.recordset,
      message: 'Data Found',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const GetTopRowNumber = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { ReadingLocationID, Days } = req.query;

  try {
    pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input('ReadingLocationID', sql.Int, Number(ReadingLocationID))
      .input('Days', sql.Int, Number(Days)).query(`
        SELECT COUNT(DRID) AS TopRowNumber 
        FROM vw_DailyReading 
        WHERE ReadingLocationId = @ReadingLocationID 
        AND EDATE BETWEEN DATEADD(DAY, -@Days, GETDATE()) AND GETDATE()
      `);

    const count = result.recordset[0]?.TopRowNumber || 0;

    if (count === 0) {
      res.status(404).json({
        TopRowNumber: count,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      TopRowNumber: count,
      message: 'Data Found',
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: String(error) });
    }
  } finally {
    pool?.close();
  }
};

const GetTopRowNumberTidal = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { ReadingLocationID, Days } = req.query;

  try {
    pool = await sql.connect(sqlConfig);

    const result = await pool
      .request()
      .input('ReadingLocationID', sql.Int, Number(ReadingLocationID))
      .input('Days', sql.Int, Number(Days)).query(`
        SELECT COUNT(1) AS TopRowNumber 
        FROM tbl_TidalData 
        WHERE ReadingLocationId = @ReadingLocationID 
        AND EDateTime BETWEEN DATEADD(DAY, -@Days, GETDATE()) AND GETDATE()
      `);

    const count = result.recordset[0]?.TopRowNumber || 0;

    if (count === 0) {
      res.status(404).json({
        TopRowNumber: count,
        message: 'No Data Found',
      });
      return;
    }

    res.status(200).json({
      TopRowNumber: count,
      message: 'Data Found',
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: String(error) });
    }
  } finally {
    pool?.close();
  }
};
//#endregion

//#region POST

const AddContactMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('CID', sql.Decimal(18, 0), Data.ContactID)
      .input('VillageID', sql.Decimal(18, 0), Data.VillageID)
      .input('ContactName', sql.VarChar(255), Data.ContactName)
      .input('gContactName', sql.NVarChar(255), Data.gContactName)
      .input('Designation', sql.VarChar(255), Data.Designation)
      .input('MobileNo', sql.VarChar(10), Data.MobileNo)
      .input('EMail', sql.VarChar(255), Data.EMail)
      .input('Remarks', sql.VarChar(MAX), Data.Remarks)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddContacts');

    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddDangerCategoryMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('DID', sql.Decimal(18, 0), Data.DangerCategoryID)
      .input('DangerCategoryName', sql.VarChar(500), Data.DangerCategoryName)
      // .input('ColorCode', sql.VarChar(20), Data.ColorCode)
      .input('SMSFormat', sql.VarChar(20), Data.SMSFormat)
      .input('EMailFormat', sql.VarChar(20), Data.EMailFormat)
      .input('Remarks', sql.VarChar(MAX), Data.Remarks)
      .input('OrderNo', sql.Int(), Data.OrderNo)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddDangerCategoryMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddDistrictMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('DID', sql.Decimal(18, 0), Data.DistrictID)
      .input('DistName', sql.VarChar(50), Data.DistrictName)
      .input('GDistName', sql.NVarChar(50), Data.GDistrictName)
      .input('StateID', sql.Decimal(18, 0), Data.StateID)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddDistrictMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddGatewayMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('FID', sql.Decimal(18, 0), Data.GatewayMasterID)
      .input('SIM', sql.Decimal(18, 0), Data.SIM)
      .input('FName', sql.VarChar(100), Data.GatewayName)
      .input('SerialNo', sql.VarChar(100), Data.SerialNo)
      .input('CompanyName', sql.VarChar(100), Data.CompanyName)
      // .input('GatewayIMEI', sql.VarChar(50), Data.GatewayIMEI)
      .input('Type', sql.VarChar(100), Data.Type)
      .input('Warrenty', sql.VarChar(100), Data.Warrenty)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .input('Remarks', sql.VarChar(1000), Data.Remarks)
      .input('PurchasedDate', sql.DateTime(), Data.PurchasedDate)
      .input('InvoiceNo', sql.VarChar(50), Data.InvoiceNo)
      .input('Comments', sql.VarChar(MAX), Data.Comments)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddGatewayMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddRaingaugeLocationMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('RaingaugeLocationID', sql.Decimal(18, 0), Data.RaingaugeLocationID)
      .input('RaingaugeLocationName', sql.VarChar(100), Data.RaingaugeLocationName)
      .input('DisctrictID', sql.Decimal(18, 0), Data.DisctrictID)
      .input('SAddress', sql.VarChar(MAX), Data.SAddress)
      .input('Latitude', sql.Decimal(18, 12), Data.Latitude)
      .input('Longitude', sql.Decimal(18, 12), Data.Longitude)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .input('GatewayMasterID', sql.Decimal(18, 0), Data.GatewayMasterID)
      .input('GatewayIMEI', sql.Decimal(18, 0), Data.GatewayIMEI)
      .input('CreatedBy', sql.Int(), Data.CreatedBy)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddRaingaugeLocationMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddReadingLocationMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('RLID', sql.Decimal(18, 0), Data.ReadingLocationID)
      .input('Name', sql.VarChar(100), Data.ReadingLocationName)
      .input('RiverName', sql.VarChar(500), Data.RiverName)
      .input('Location', sql.VarChar(50), Data.Location)
      .input('DangerWaterLevel', sql.Decimal(8, 0), Data.DangerWaterLevel)
      .input('WarningWaterLevel', sql.Decimal(8, 2), Data.WarningLevel)
      .input('Latitude', sql.Decimal(18, 12), Data.Latitude)
      .input('Longitude', sql.Decimal(18, 12), Data.Longitude)
      .input('Altitude', sql.Decimal(18, 12), Data.Altitude)
      .input('MaxTimeDuration', sql.Int(), Data.MaxTimeDuration)
      .input('Remarks', sql.VarChar(4000), Data.Remarks)
      .input('IsManualEntry', sql.Bit(), Data.IsManualEntry)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .output('Status', sql.VarChar(4000))
      // .input('RangeHeightMin', sql.Decimal(8, 3), Data.RangeHeightMin)
      // .input('RangeHeightMax', sql.Decimal(8, 3), Data.RangeHeightMax)
      // .input('DangerHeight', sql.Decimal(8, 3), Data.DangerHeight)
      // .input('DangerLevel', sql.Decimal(8, 2), Data.DangerLevel)
      // .input('CreatedBy', sql.Int(), Data.CreatedBy)
      .execute('sp_AddReadingLocationMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

// const AddVillagePolygon = async (req: Request, res: Response) => {
//   let pool!: ConnectionPool;
//   const data = req.body;

//   try {
//     pool = await sql.connect(sqlConfig);

//     const result = await pool
//       .request()
//       .input('VillageId', sql.Int, data.VillageId)
//       .input('CreatedBy', sql.Int, data.CreatedBy)
//       .input('Points', sql.NVarChar(sql.MAX), JSON.stringify(data.Points))
//       .input('Tiles', sql.NVarChar(sql.MAX), JSON.stringify(data.Tiles))
//       // .execute("sp_AddVillagePolygonWithPointsAndTiles");
//       .execute('sp_AddVillagePolygonWithPointsAndTilesJson');
//     res.status(200).json({
//       message: result.output.Status,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       message: error.message,
//     });
//   } finally {
//     pool?.close();
//   }
// };

const AddSIMMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('SID', sql.Decimal(18, 0), Data.SIMID)
      .input('CompanyName', sql.VarChar(50), Data.CompanyName)
      .input('PhoneNo', sql.VarChar(10), Data.PhoneNo)
      .input('isPrepaid', sql.Bit(), Data.isPrepaid)
      .input('TariffPlan', sql.VarChar(50), Data.TariffPlan)
      .input('BillCycle', sql.VarChar(50), Data.BillCycle)
      .input('SIMNo', sql.VarChar(50), Data.SIMNo)
      .input('LastDate', sql.DateTime(), Data.LastDate)
      .input('IsActive', sql.Bit(), Data.IsActive)
      // .input('CreatedBy', sql.Int(), Data.CreatedBy)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddSIMMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddSirenLocationMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('SirenLocationID', sql.Decimal(18, 0), Data.SirenLocationID)
      .input('SirenLocationName', sql.VarChar(100), Data.SirenLocationName)
      .input('DisctrictID', sql.Decimal(18, 0), Data.DisctrictID)
      .input('SAddress', sql.VarChar(MAX), Data.SAddress)
      .input('Latitude', sql.Decimal(18, 12), Data.Latitude)
      .input('Longitude', sql.Decimal(18, 12), Data.Longitude)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .input('GatewayMasterID', sql.Decimal(18, 0), Data.GatewayMasterID)
      .input('GatewayIMEI', sql.Decimal(18, 0), Data.GatewayIMEI)
      .input('CreatedBy', sql.Int(), Data.CreatedBy)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddSirenLocationMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddStateMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('SID', sql.Decimal(18, 0), Data.StateID)
      .input('StateName', sql.VarChar(100), Data.StateName)
      .input('GStateName', sql.NVarChar(255), Data.GStateName)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddStateMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddTalukaMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('TID', sql.Decimal(18, 0), Data.TalukaID)
      .input('TalukaName', sql.VarChar(50), Data.TalukaName)
      .input('gTalukaName', sql.NVarChar(50), Data.gTalukaName)
      .input('DistID', sql.Decimal(18, 0), Data.DistrictID)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddTalukaMaster_NODE');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddTypeMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('TypeID', sql.Decimal(18, 0), Data.TypeID)
      .input('TypeName', sql.VarChar(100), Data.TypeName)
      .input('gTypeName', sql.NVarChar(255), Data.gTypeName)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddTypeMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddUserMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('UID', sql.Decimal(18, 0), Data.UID)
      .input('UserID', sql.VarChar(15), Data.UserID)
      .input('FirstName', sql.VarChar(100), Data.FirstName)
      .input('LastName', sql.VarChar(100), Data.LastName)
      .input('EMail', sql.VarChar(500), Data.EMail)
      .input('Pword', sql.VarChar(500), Data.Pword)
      .input('Mobile', sql.Decimal(10, 0), Data.Mobile)
      .input('UserType', sql.Int(), Data.UserType)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .input('IsAdmin', sql.Bit(), Data.IsAdmin)
      .input('ReadingLocationList', sql.VarChar(sql.MAX), JSON.stringify(Data.ReadingLocationList))
      .input('MenuDetails', sql.VarChar(sql.MAX), JSON.stringify(Data.MenuDetails))
      .input('CreatedBy', sql.Int(), Data.CreatedBy)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddUserMasterRoles');
    res.status(200).json({
      message: Result.output.Status,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddUserTypeMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('UserTypeID', sql.Decimal(18, 0), Data.UserTypeID)
      .input('UserType', sql.VarChar(50), Data.UserType)
      // .input('IsActive', sql.Bit, Data.IsActive)
      .input('MunID', sql.Int, Data.MunID)
      .output('status', sql.VarChar(sql.MAX))
      .execute('sp_AddUserTypeMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddVillageMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('VID', sql.Decimal(18, 0), Data.VillageID)
      .input('VillageName', sql.VarChar(100), Data.VillageName)
      .input('gVillageName', sql.NVarChar(100), Data.gVillageName)
      .input('ReadingLocationId', sql.Decimal(18, 0), Data.ReadingLocationID)
      .input('Taluka', sql.Decimal(18, 0), Data.TalukaID)
      .input('Remarks', sql.VarChar(MAX), Data.Remarks)
      .input('Latitude', sql.Decimal(18, 12), Data.Latitude)
      .input('Altitude', sql.Decimal(18, 12), Data.Altitude)
      .input('Longitude', sql.Decimal(18, 12), Data.Longitude)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .input('KMFromRLID', sql.Decimal(8, 2), Data.KMFromRLID)
      .input('ContactsXML', sql.Xml, Data.ContactsXML)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddVillageMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddMenuMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('MenuID', sql.Decimal(18, 0), Data.MenuID)
      .input('ParentMenuID', sql.Int(), Data.ParentMenuID)
      .input('MenuName', sql.VarChar(25), Data.MenuName)
      .input('MenuCaption', sql.VarChar(25), Data.MenuCaption)
      .input('RouterPath', sql.VarChar(MAX), Data.RouterPath)
      .input('iOrder', sql.Int(), Data.iOrder)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddMenuMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddDeviceMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('DeviceMasterID', sql.Decimal(18, 0), Data.DeviceMasterID)
      .input('DeviceName', sql.VarChar(100), Data.DeviceName)
      .input('CompanyName', sql.VarChar(100), Data.CompanyName)
      .input('SerialNo', sql.VarChar(50), Data.SerialNo)
      .input('DeviceType', sql.Int(), Data.DeviceType)
      .input('Type', sql.VarChar(100), Data.Type)
      .input('Warrenty', sql.VarChar(100), Data.Warrenty)
      .input('Remarks', sql.VarChar(MAX), Data.Remarks)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .input('CreatedBy', sql.Int(), Data.CreatedBy)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddDeviceMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddGatewaynDeviceClubMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('GatewaynDeviceClubMasterID', sql.Decimal(18, 0), Data.GatewaynDeviceClubMasterID)
      .input('GatewaynDeviceClubName', sql.VarChar(50), Data.GatewaynDeviceClubName)
      .input('DeviceMasterID', sql.Decimal(18, 0), Data.DeviceMasterID)
      .input('GatewayMasterID', sql.Decimal(18, 0), Data.GatewayMasterID)
      .input('SIMID', sql.Decimal(18, 0), Data.SIMID)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .input('CreatedBy', sql.Int(), Data.CreatedBy)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddGatewaynDeviceClubMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddGatewayRaingaugeData = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('GatewayMasterID', sql.Decimal(18, 0), Data.GatewayMasterID)
      .input('GatewayIMEI', sql.Decimal(18, 0), Data.GatewayIMEI)
      .input('RaingaugeLocationID', sql.Decimal(18, 0), Data.RaingaugeLocationID)
      .input('RDateTime', sql.DateTime(), Data.RDateTime)
      .input('Reading', sql.Decimal(18, 4), Data.Reading)
      .input('BetteryLevel', sql.Decimal(18, 4), Data.BetteryLevel)
      .input('PowerLevel', sql.Decimal(18, 4), Data.PowerLevel)
      .input('CurrentIP', sql.VarChar(35), Data.CurrentIP)
      .input('SingleLevel', sql.Int(), Data.SingleLevel)
      .input('IsPowerOn', sql.Bit(), Data.IsPowerOn)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddGatewayRaingaugeData');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddGatewaySensorData = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('GatewayIMEI', sql.Decimal(18, 0), Data.GatewayIMEI)
      .input('RDateTime', sql.DateTime(), Data.RDateTime)
      .input('Reading', sql.Decimal(18, 4), Data.Reading)
      .input('BetteryLevel', sql.Decimal(18, 4), Data.BetteryLevel)
      .input('PowerLevel', sql.Decimal(18, 4), Data.PowerLevel)
      .input('CurrentIP', sql.VarChar(35), Data.CurrentIP)
      .input('SingleLevel', sql.Int(), Data.SingleLevel)
      .input('IsPowerOn', sql.Bit(), Data.IsPowerOn)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddGatewaySensorData');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddGatewaySirenData = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('GatewayIMEI', sql.Decimal(18, 0), Data.GatewayIMEI)
      .input('RDateTime', sql.DateTime(), Data.RDateTime)
      // .input('Reading', sql.Decimal(18, 4), Data.Reading)
      .input('SirenLocationID', sql.Decimal(18, 4), Data.SirenLocationID)
      .input('BetteryLevel', sql.Decimal(18, 4), Data.BetteryLevel)
      .input('PowerLevel', sql.Decimal(18, 4), Data.PowerLevel)
      .input('CurrentIP', sql.VarChar(35), Data.CurrentIP)
      .input('SingleLevel', sql.Int(), Data.SingleLevel)
      .input('IsPowerOn', sql.Bit(), Data.IsPowerOn)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddGatewaySirenData');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddTidalData = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;

  const tidalDataID = Data.TidalDataID !== undefined ? Data.TidalDataID : 0;

  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('TID', sql.Decimal(18, 0), tidalDataID)
      .input('TDate', sql.DateTime(), Data.TDate)
      .input('ReadingLocationID', sql.Decimal(18, 4), Data.ReadingLocationID)
      .input('TTime', sql.VarChar(), Data.TTime)
      .input('TType', sql.Int(), Data.TType)
      .input('Height', sql.Decimal(8, 2), Data.Height)
      .input('CreatedBy', sql.Int(), Data.CreatedBy)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddTidalData');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddDailyReading = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('DRID', sql.Decimal(18, 0), Data.DRID)
      .input('EDATE', sql.DateTime(), Data.EDATE)
      .input('READBY', sql.VarChar(50), Data.READBY)
      .input('REMARKS', sql.VarChar(500), Data.REMARKS)
      .input('TREND', sql.VarChar(15), Data.TREND)
      .input('ETIME', sql.VarChar(50), Data.ETIME)
      .input('READINGLID', sql.Decimal(18, 0), Data.READINGLID)
      .input('WATERLEVEL', sql.Decimal(18, 2), Data.WATERLEVEL)
      .input('EFFECTEDV', sql.Xml(), Data.EFFECTEDV)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddDailyReading');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddUserMenuPermission = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('MenuDetails', sql.Decimal(18, 0), JSON.stringify(Data.MenuDetails))
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddUserMenuForPermission');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddReservoirMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('ReservoirID', sql.Decimal(18, 0), Data.ReservoirID)
      .input('ReservoirName', sql.VarChar(100), Data.ReservoirName)
      .input('ReservoirLocation', sql.VarChar(MAX), Data.ReservoirLocation)
      .input('ReservoirLatitude', sql.Decimal(18, 12), Data.ReservoirLatitude)
      .input('ReservoirLongitude', sql.Decimal(18, 12), Data.ReservoirLongitude)
      .input('KMFromCapital', sql.Decimal(5, 2), Data.KMFromCapital)
      .input('TotalLevelHeight', sql.Decimal(8, 2), Data.TotalLevelHeight)
      .input('DangerLevelHeight', sql.Decimal(8, 2), Data.DangerLevelHeight)
      .input('WarningLevelHeight', sql.Decimal(8, 2), Data.WarningLevelHeight)
      .input('NornalDischarge', sql.Decimal(8, 2), Data.NormalDischarge)
      .input('MaxDischarge', sql.Decimal(8, 2), Data.MaxDischarge)
      .input('MaxTimeDuration', sql.Int(), Data.MaxTimeDuration)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .input('CreatedBy', sql.Int(), Data.CreatedBy)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddReservoirMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddEmailAdminMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('RID', sql.Int, Data.RID)
      .input('MName', sql.VarChar(100), Data.MName)
      .input('mShortName', sql.VarChar(100), Data.mShortName)
      .input('CommEmailID', sql.VarChar(MAX), Data.CommEmailID)
      .input('EmailID', sql.VarChar(100), Data.EmailID)
      .input('HostName', sql.VarChar(100), Data.HostName)
      .input('PortNumber', sql.VarChar(100), Data.PortNumber)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .input('SSN', sql.Bit(), Data.SSN)
      .input('Password', sql.VarChar(100), Data.Password)
      .input('IsEmailActive', sql.Bit(), Data.IsEmailActive)
      .output('Status', sql.VarChar(100))
      .execute('sp_AddEMailAdminMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddReservoirDischargeEntry = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('ReservoirDischargeEntryID', sql.Decimal(18, 0), Data.ReservoirDischargeEntryID)
      .input('ReservoirDischargeEntryDate', sql.Date(), Data.ReservoirDischargeEntryDate)
      .input('ReservoirDischargeEntryTime', sql.VarChar(50), Data.ReservoirDischargeEntryTime)
      .input('Remarks', sql.VarChar(50), Data.Remarks)
      .input('ReservoirID', sql.Decimal(18, 0), Data.ReservoirID)
      .input('CurrentHeight', sql.Decimal(18, 2), Data.CurrentHeight)
      .input('TotalInflow', sql.Decimal(18, 2), Data.TotalInflow)
      .input('TotalDischarge', sql.Decimal(18, 2), Data.TotalDischarge)
      .input('TotalTimetoReachedCapital', sql.Int(), Data.TotalTimetoReachedCapital)
      .input('GrossStorage', sql.Decimal(18, 2), Data.GrossStorage)
      // .input('IsSkip', sql.Bit(), Data.IsSkip)
      .input('SkipReason', sql.VarChar(MAX), Data.SkipReason)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .input('CreatedBy', sql.Int(), Data.CreatedBy)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddReservoirDischargeEntry');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddWarningRuleMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const xmlData = convert.js2xml({ DocumentElement: { Details: Data.Details } }, { compact: true, spaces: 2 });
    const Result = await pool
      .request()
      // .input('XML', sql.Xml, Data.Details)
      .input('XML', sql.Xml, xmlData)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddWarningRuleMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
      stack: error.stack,
    });
  } finally {
    pool?.close();
  }
};

const AddLevelMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  const xmlData = convert.js2xml({ DocumentElement: { Details: Data.LevelContactList } }, { compact: true, spaces: 2 });
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('LevelID', sql.Decimal(18, 0), Data.LevelID)
      .input('LevelName', sql.VarChar(50), Data.LevelName)
      .input('LevelHeightFrom', sql.Decimal(18, 2), Data.LevelHeightFrom)
      .input('LevelHeightTo', sql.Decimal(18, 2), Data.LevelHeightTo)
      .input('ReadingLocationID', sql.Decimal(18, 0), Data.ReadingLocationID)
      .input('Remarks', sql.VarChar(sql.MAX), Data.Remarks)
      .input('LevelContactList', sql.Xml, xmlData)
      .input('IsSMS', sql.Bit(), Data.IsSMS)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .input('CreatedBy', sql.Int(), Data.CreatedBy)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddLevelMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

const AddRefreshTimeMaster = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('RID', sql.Decimal(18, 0), Data.RID)
      .input('ChartRefreshTime', sql.Decimal(), Data.ChartRefreshTime)
      .input('AlertSMSRefreshTime', sql.Decimal(), Data.AlertSMSRefreshTime)
      .input('CurrentReadingRefreshTime', sql.Decimal(), Data.CurrentReadingRefreshTime)
      .input('SirenRefreshTime', sql.Decimal(), Data.SirenRefreshTime)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddRefreshTimeMaster');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

// const AddIOTGatewayData = async (req: Request, res: Response) => {
//   let pool!: ConnectionPool;
//   const Data = req.body;
//   try {
//     pool = await sql.connect(sqlConfig);
//     // const _Path = path.join(__dirname, '../IOTGatewayData/');
//     // const FileName = `Log${new Date().toISOString().split('T')[0]}.txt`;
//     // const filepath = path.join(_Path, FileName);

//     // // Create directory and file if not exists
//     // if (!fs.existsSync(_Path)) {
//     //   fs.mkdirSync(_Path);
//     // }
//     // if (!fs.existsSync(filepath)) {
//     //   fs.writeFileSync(filepath, '');
//     // }

//     // // Log data to file
//     // fs.appendFileSync(filepath, `Date : - ${new Date().toISOString()}\n`);
//     // fs.appendFileSync(filepath, JSON.stringify(Data) + '\n');

//     // Parse data
//     const dataObj = JSON.parse(JSON.stringify(Data));
//     const DateTime = '';
//     let Serial = '';
//     let Voltage = '0';
//     let mA = '4';

//     Object.keys(dataObj).forEach((key) => {
//       const StrData = key.split(';');
//       StrData.forEach((item) => {
//         const StrSubData = item.split(':');
//         if (StrSubData.length > 0) {
//           // if (StrSubData[0] === 'DateTime') {
//           //   // Convert the input date-time format "28/07/2024 12:00:19 AM","28/07/2024 11:59:50 PM" to "2023-07-08 20:03:18.853"
//           //   const inputDateTime = StrSubData[1]; //"28/07/2024 11:59:50 PM"
//           //   const [datePart, timePart] = inputDateTime.split(' '); //datePart:-28/07/2024,timePart:-11:59:50 PM
//           //   const [day, month, year] = datePart.split('/').map(Number); //["28", "07", "2024"], map(number) is used because its converts string to number
//           //   const [time, period] = timePart.split(' '); //["11:59:50", "PM"],time:-"11:59:50",period:-"PM"
//           //   const [hours, minutes, seconds] = time.split(':').map(Number); //["11", "59", "50"],hours:-"11",minutes:-"59",seconds:-"50"
//           //   // Convert to 24-hour format
//           //   if (period === 'PM' && hours < 12) {
//           //     hours += 12; //(i.e., not 12 PM), 12 is added to hours, making it 23 for 11 PM.
//           //   } else if (period === 'AM' && hours === 12) {
//           //     hours = 0; //If period is "AM" and hours is 12 (i.e., 12 AM), hours is set to 0
//           //   }
//           //   // const dateTime = new Date(year, month - 1, day, hours, minutes, seconds); //this creates a Date object representing July 28, 2024, 23:59:50.
//           //   // const milliseconds = 853; // Default milliseconds or you can use a dynamic value if needed
//           //   // To include milliseconds, you need to create a new date object that includes milliseconds
//           //   // const dateTimeWithMilliseconds = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds); //Note that months are zero-indexed in JavaScript
//           //   // Format the date-time with milliseconds
//           //   // const formattedDateTime =
//           //   //   dateTimeWithMilliseconds
//           //   //     .toISOString() //("2024-07-28T23:59:50.000Z").
//           //   //     .replace('T', ' ') // Replace 'T' with a space ("2024-07-28 23:59:50.000Z").
//           //   //     .split('.')[0] + //[0]="2024-07-28T23:59:50",[1]="456Z" // Remove the milliseconds part ("2024-07-28 23:59:50").
//           //   //   '.' +
//           //   //   milliseconds.toString().padStart(3, '0'); // Add milliseconds part ("2024-07-28 23:59:50.123".)
//           //   // console.log(formattedDateTime);
//           // }
//           if (StrSubData[0] === 'Serial') {
//             Serial = StrSubData[1];
//           } else if (StrSubData[0] === 'Voltage') {
//             Voltage = (parseInt(StrSubData[1], 10) / 1000).toFixed(3);
//           } else if (StrSubData[0] === 'mA') {
//             mA = parseInt(StrSubData[1], 10).toFixed(3);
//           }
//         }
//       });
//     });

//     // Execute stored procedure
//     const Result = await pool
//       .request()
//       .input('GatewayIMEI', sql.Decimal(18, 0), Serial)
//       .input('Reading', sql.Decimal(18, 3), Voltage)
//       .input('Reading_mA', sql.Decimal(18, 3), mA)
//       .input('RDATETIME', sql.DateTime, DateTime)
//       .input('CurrentIP', sql.VarChar(255), '')
//       .input('IsPowerOn', sql.Bit(), true)
//       .input('BetteryLevel', sql.Decimal(18, 3), 0)
//       .input('SingleLevel', sql.Decimal(18, 3), 0)
//       .input('PowerLevel', sql.Decimal(18, 3), 0)
//       .output('Status', sql.VarChar(4000))
//       .execute('sp_AddGatewaySensorData');

//     res.status(200).json({
//       message: Result.output.Status,
//     });
//   } catch (error: any) {
//     res.status(500).send({
//       message: error.message,
//     });
//   } finally {
//     pool?.close();
//   }
// };

// const AddIOTGatewayData = async (req: Request, res: Response) => {
//   let pool!: ConnectionPool;
//   const Data = req.body;
//   try {
//     pool = await sql.connect(sqlConfig);
//     const _Path = path.join(__dirname, '../IOTGatewayData/');
//     const FileName = `Log${new Date().toISOString().split('T')[0]}.txt`;
//     const filepath = path.join(_Path, FileName);

//     // Create directory and file if not exists
//     if (!fs.existsSync(_Path)) {
//       fs.mkdirSync(_Path);
//     }
//     if (!fs.existsSync(filepath)) {
//       fs.writeFileSync(filepath, '');
//     }

//     // Log data to file
//     fs.appendFileSync(filepath, `Data : - ${new Date().toISOString()}\n`);
//     fs.appendFileSync(filepath, JSON.stringify(Data) + '\n');

//     // Parse data
//     const dataObj = JSON.parse(JSON.stringify(Data));
//     let DateTime = '';
//     let Serial = '';
//     let Voltage = '0';
//     let mA = '4';
//     Object.keys(dataObj).forEach((key) => {
//       const StrData = key.split(';');
//       StrData.forEach((item) => {
//         const StrSubData = item.split(':');
//         if (StrSubData.length > 0) {
//           if (StrSubData[0] === 'DateTime') {
//             DateTime = new Date(parseInt(StrSubData[1], 10) * 1000).toISOString(); // Convert timestamp to ISO
//           } else if (StrSubData[0] === 'Serial') {
//             Serial = StrSubData[1];
//           } else if (StrSubData[0] === 'Voltage') {
//             Voltage = (parseInt(StrSubData[1], 10) / 1000).toFixed(3);
//           } else if (StrSubData[0] === 'mA') {
//             mA = (parseInt(StrSubData[1], 10)).toFixed(3);
//           }
//         }
//       });
//     });

//     // Log parsed data for debugging
//     fs.appendFileSync(filepath, `Parsed DateTime: ${DateTime}\n`);

//     // Execute stored procedure
//     const Result = await pool
//       .request()
//       .input('GatewayIMEI', sql.Decimal(18, 0), Serial)
//       .input('Reading', sql.Decimal(18, 3), Voltage)
//       .input('Reading_mA', sql.Decimal(18, 3), mA)
//       .input('RDATETIME', sql.DateTime, DateTime)
//       .input('CurrentIP', sql.VarChar(255), '')
//       .input('IsPowerOn', sql.Bit(), true)
//       .input('BetteryLevel', sql.Decimal(18, 3), 0)
//       .input('SingleLevel', sql.Decimal(18, 3), 0)
//       .input('PowerLevel', sql.Decimal(18, 3), 0)
//       .output('Status', sql.VarChar(4000))
//       .execute('sp_AddGatewaySensorData');

//     res.status(200).json({
//       message: Result.output.Status,
//     });
//   } catch (error: any) {
//     res.status(500).send({
//       message: error.message,
//     });
//   } finally {
//     pool?.close();
//   }
// };

//#endregion

//#region PUT

const AddReadingLocation_Admin = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const Data = req.body;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('ReadingLocationID', sql.Decimal(18, 0), Data.ReadingLocationID)
      .input('GatewayMasterID', sql.Decimal(18, 0), Data.GatewayMasterID)
      .input('Resistance', sql.Decimal(18, 0), Data.Resistance)
      .input('MilliAmpsMin', sql.Int(), Data.MilliAmpsMin)
      .input('MilliAmpsMax', sql.Int(), Data.MilliAmpsMax)
      .input('AdjustMeter', sql.Decimal(18, 2), Data.AdjustMeter)
      .input('DataRefreshMin', sql.Int(), Data.DataRefreshMin)
      .input('CreatedBy', sql.Int(), Data.CreatedBy)
      .input('IsActive', sql.Bit(), Data.IsActive)
      .output('Status', sql.VarChar(4000))
      .execute('sp_AddReadingLocationMaster_Admin');
    res.status(200).json({
      message: Result.output.Status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  } finally {
    pool?.close();
  }
};

//#endregion

export {
  //  #region Get

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
  GetDailyReadingDataReport,
  GetData,
  GetPredictionReport,
  GetPredictionData,
  GetEMailAdminMaster,
  GetVillagePolygonWithPointsAndTiles,
  GetTidalData_Report,
  GetPredictionDataWithVillages,
  GetRainFallReadingDataHourly,
  GetPredictionWihtoutDamOutFlow_NODE,
  GetTopRowNumber,
  GetTidalDataDashboard,
  GetTopRowNumberTidal,
  //  #endregion

  //  #region POST
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
  AddEmailAdminMaster,
  //  #endregion

  //  #region PUT
  AddReadingLocation_Admin,
  // AddVillagePolygon,

  //  #endregion

  // #region ExcelFile Upload
  // ExcelUploadTidalData
};
