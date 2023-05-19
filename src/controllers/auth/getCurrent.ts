import { Response } from "express";
import { IUserAuthRequest } from "../../types/appType";

const getCurrent = async (req:IUserAuthRequest, res:Response) => {
  const { username, email } = req.user;

  res.json({
    user: {
      username,
      email,
    },
  });
};

export default getCurrent;
