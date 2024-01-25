import { Response } from 'express';

export const sendResponse = (
  res: Response,
  statusCode: number,
  data: any,
  recordCount?: number | null,
): void => {
  const resultsCount =
    recordCount !== null && recordCount !== undefined
      ? { recordCount: recordCount }
      : {};

  const status = statusCode >= 200 && statusCode < 300 ? 'success' : 'error';

  res.status(statusCode).json({
    status,
    data,
    ...resultsCount,
  });
};

export const sendError = (
  res: Response,
  statusCode: number,
  err: any,
): void => {
  res.status(statusCode).json({
    status:  `${statusCode}`.startsWith('4') ? 'fail' : 'error',
    isOperational: true,
    message: typeof err === 'string' ? err : (err?.message || 'Something went wrong'),
  });
};

module.exports = { sendResponse, sendError };
