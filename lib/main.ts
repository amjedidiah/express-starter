import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csrfProtection from 'csurf';
import expressWinston from 'express-winston';
import mongoose from 'mongoose';
import 'dotenv/config';
import logger from './config/logger';
import routes from './routes';
import { handleResponseError } from './config/error';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

const app = express();

// Helmet to set secure HTTP headers
app.use(helmet());

app.use(cors()); // Cross Origin Site requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Configure to accept JSON request body

// Use Winston logger with Express Winston
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true, // Log metadata (e.g., request headers, response status)
    msg: 'HTTP {{req.method}} {{req.url}}', // Customize the log message format
  })
);

// CSRF Protection
app.use(cookieParser());
app.use(csrfProtection({ cookie: true }));

app.use(routes);

// Error handling middleware
app.use((error: unknown, _req: Request, res: Response, next: NextFunction) => {
  handleResponseError(res, error);
  next();
});

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() =>
    app.listen(port, host, () => {
      logger.info(`[ ready ] http://${host}:${port}`);
    })
  )
  .catch(logger.error);
