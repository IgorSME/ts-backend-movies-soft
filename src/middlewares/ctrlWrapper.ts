import { Request,Response, NextFunction } from "express";
import { ICtrlWrapper, IUserAuthRequest } from "../types/appType";

const ctrlWrapper = (ctrl:ICtrlWrapper) => {
  return async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
      await ctrl(req as IUserAuthRequest, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default ctrlWrapper;
