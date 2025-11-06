import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import expressWinston from 'express-winston';
import 'dotenv/config';
import routes from './routes';
import logger from './config/logger';
import { DEFAULT_ERROR_STATUS_CODE, HttpError } from './config/error';
import { doubleCsrfProtection } from './config/csrf';

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

// CSRF Protection (cookieParser must come before csrf)
app.use(cookieParser());
app.use(doubleCsrfProtection);

app.use(routes);

// Error handling middleware
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const code =
    error instanceof HttpError ? error.status : DEFAULT_ERROR_STATUS_CODE;

  logger.error(error);

  res.status(code).json({ data: null, message: (error as Error).message });
});

export default app;
