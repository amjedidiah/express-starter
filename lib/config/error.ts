import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import logger from './logger';

const DEFAULT_ERROR_STATUS_CODE = 500;

export class HttpError {
  name = 'HttpError';

  message: string;
  status: number;

  constructor(message: string, status?: number) {
    this.status = status || DEFAULT_ERROR_STATUS_CODE;
    this.message = message;
  }
}

export const handleResponseError = (res: Response, error: any) => {
  const code =
    error instanceof HttpError ? error.status : DEFAULT_ERROR_STATUS_CODE;

  logger.error(error);

  res.status(code).json({ data: null, message: (error as Error).message });
  res.end();
};

export const handleValidationErrors = (request: Request) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    throw new HttpError(errors.array()[0]?.msg || 'Bad request', 400);
};
