import express from 'express';
import itemsRouter from './Account';
import masterRouter from './Master';

const mainRouter = express.Router();

// Apis of each controller
mainRouter.use('/AccountController', itemsRouter);
mainRouter.use('/MasterController', masterRouter);

export default mainRouter;
