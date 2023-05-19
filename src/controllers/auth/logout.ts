import {  Response } from 'express';
import { User } from '../../models';
import { IUserAuthRequest } from '../../types/appType';

const logout = async (req:IUserAuthRequest, res:Response):Promise<void> => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { accessToken: "", refreshToken: "" });
  res.status(204).send();
};

export default logout;
