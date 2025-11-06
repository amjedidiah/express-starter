import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const DEFAULT_ERROR_STATUS_CODE = 500;

export class HttpError {
  name = 'HttpError';

  message: string;
  status: number;

  constructor(message: string, status?: number) {
    this.status = status ?? DEFAULT_ERROR_STATUS_CODE;
    this.message = message;
  }
}

export const handleValidationErrors = (request: Request) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    throw new HttpError(errors.array()[0]?.msg ?? 'Bad request', 400);
};

// Async error handler wrapper
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
