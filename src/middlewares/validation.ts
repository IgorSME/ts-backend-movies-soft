import { Request, Response, NextFunction } from 'express';
import { Schema} from 'joi';
import { IValidationError, TValidation } from '../types/appType';

const validation = (schema:Schema):TValidation => {
  return (req:Request, _res:Response, next:NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const validationError = error as IValidationError;
      validationError.status = 400;
      next(validationError);
      return;
    }
    next();
  };
};

export default validation;
