import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import { IError } from '../types/appType';

const isValidId = (req:Request, _res:Response, next:NextFunction) => {
  const { idParam } = req.params;
  if (!isValidObjectId(idParam)) {
    const error:IError = new Error(`${idParam} is not correct`);
    error.status = 400;
    next(error);
  }
  next();
};

export default isValidId;
