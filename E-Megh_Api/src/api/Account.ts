import express from 'express';
import { UserLogin, UserLoginByMobileNo } from '../controller/AccountController';

const itemsRouter = express.Router();

itemsRouter.get('/GetUser', UserLogin);
itemsRouter.get('/GetUserByMobileNo', UserLoginByMobileNo);

export default itemsRouter;
