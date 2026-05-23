import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mainRouter from './api';

// ENV Variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

// CORS
const options: cors.CorsOptions = {
  origin: '*',
  methods: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(options));

// For parsing application/json
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// FilePath
app.use(express.static('public'));

// Global Path
app.use(`/api`, cors(), mainRouter);

// API Calls
app.use((req: Request, res: Response) => {
  res.status(405).json({
    message: `Sorry, API Not Found, try again. OriginalURL : ${req.originalUrl.toString()}`,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
