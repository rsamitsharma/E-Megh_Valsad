import { Request, Response } from 'express';
import sql, { ConnectionPool, MAX } from 'mssql';
import sqlConfig from '../config/sqlconfig';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

//#region POST

const UserLogin = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const UserData = req.query;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('UserID', sql.NVarChar(50), UserData.UserID)
      .input('Password', sql.NVarChar(50), UserData.Password)
      .output('Status', sql.VarChar(500), UserData.Status)
      .execute('sp_GetFindUser');

    const token = jwt.sign({ UserID: UserData.UserID }, 'EFWS_Vinesh_Patel' as string, {
      expiresIn: '1h',
    });

    const { recordset, recordsets } = Result;

    if (!recordset.length) {
      res.status(404).send({
        message: 'User Not Found',
      });
      return;
    }

    res.status(200).json({
      message: 'User Found',
      Table: recordsets,
      Token: token,
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

const UserLoginByMobileNo = async (req: Request, res: Response) => {
  let pool!: ConnectionPool;
  const { mobileno } = req.query;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool.request().input('MobileNo', sql.NVarChar(50), mobileno).execute('sp_GetUserByMobileNo');

    const { recordset, recordsets } = Result;

    if (!recordset.length) {
      res.status(404).send({
        message: 'User Not Found',
      });
      return;
    }

    const otp = await sendOTP(mobileno as string);

    res.status(200).json({
      message: 'User Found and OTP sent successfully',
      Table: recordsets,
      OTP: otp,
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

const sendOTP = async (mobileno: string) => {
  let pool!: ConnectionPool;
  const otp = Math.floor(10000 + Math.random() * 90000).toString();
  const currentTime = new Date();
  const message = `Your one time password for new e-REWA App is ${otp}. Only valid for 15 min, Thanks You, Team RSPL.`;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool
      .request()
      .input('CDate', sql.DateTime, currentTime)
      .input('MobileNo', sql.NVarChar(MAX), mobileno)
      .input('Messages', sql.NVarChar(MAX), message)
      .input('STypes', sql.NVarChar(50), 'OTP')
      .input('MStatus', sql.Bit, 1)
      .input('CreatedBy', sql.Int, 1)
      .output('Status', sql.VarChar(500))
      .execute('sp_AddSMSCounter');
    await sendSMSSingle(mobileno, message);
    return Result.output.Status, otp;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error('Failed to send OTP');
  } finally {
    pool?.close();
  }
};

const sendSMSSingle = async (mobileNo: string, message: string) => {
  const formattedNo = mobileNo.length === 10 ? '91' + mobileNo : mobileNo;
  const tempId = '1207165812885595997';
  const smsResponse = await sendSMS(formattedNo, message, tempId);
  return smsResponse;
};

const sendSMS = async (mobileNo: string, message: string, tempId: string) => {
  let pool!: ConnectionPool;
  try {
    pool = await sql.connect(sqlConfig);
    const Result = await pool.request().execute('sp_GetSMSUtility');
    const { recordset } = Result;
    const { UserID, Pwd, SenderID, EntityID } = recordset[0];

    // Encode the message to handle special characters
    const encodedMessage = encodeURIComponent(message);

    const baseURL = 'http://trans.responscity.com/smsstatuswithid.aspx';
    const url = `${baseURL}?mobile=${UserID}&pass=${Pwd}&senderid=${SenderID}&to=${mobileNo}&entityID=${EntityID}&templateID=${tempId}&msg=${encodedMessage}&msgtype=uc`;

    const response = await axios.get(url);

    return response.data;
  } catch (err) {
    throw new Error('SMS Sending Error: ' + (err as Error).message);
  } finally {
    await pool?.close();
  }
};

export { UserLogin, UserLoginByMobileNo, sendOTP, sendSMSSingle };
