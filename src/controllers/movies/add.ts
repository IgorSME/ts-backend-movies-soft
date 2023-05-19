import { Movies } from "../../models";
import { Response } from "express";
import { IUserAuthRequest } from "../../types/appType";

const add = async (req:IUserAuthRequest, res:Response):Promise<void> => {
  const { _id } = req.user;
  const result = await Movies.create({ ...req.body, owner: _id });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

export default add;
