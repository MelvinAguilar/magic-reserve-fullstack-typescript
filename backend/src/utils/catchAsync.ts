import { NextFunction, Request, Response } from 'express';

/* 
 * This function is a wrapper for async functions. It catches any errors that
 * occur in the async function and passes them to the next function.
 */
module.exports = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => next(err));
  };
};
