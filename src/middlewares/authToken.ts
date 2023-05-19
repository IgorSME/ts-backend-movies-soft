import jwt from "jsonwebtoken";
import { User } from "../models";
import { requestError } from "../helpers";
import {  Response, NextFunction,RequestHandler } from "express";
import {  IJwtPayload, IUserAuthRequest, IUserSchema } from "../types/appType";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

const { SECRET_KEY_ACCESS ="" } = process.env;

const authToken = async (req:IUserAuthRequest, res:Response, next:NextFunction):Promise<void> => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer != "Bearer") {
      throw requestError(401, "Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY_ACCESS) as IJwtPayload;

    const user:IUserSchema | null = await User.findById(id);

    if (!user) {
      throw requestError(401, "Not authorized");
    }
    if (!user.accessToken) {
      throw requestError(401, "Token expired");
    }
    req.user = user || null;
    next();
  } catch (error) {
    if (
      error.message === "invalid signature" ||
      error.message === "invalid token"
    ) {
      error.status = 401;
    }
    //accessToken expired
    if (error.message === "jwt expired") {
      (error.status = 412), (error.message = "Your token expired");
    }
  }
};
// export default authToken;
export default authToken as unknown as RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;
