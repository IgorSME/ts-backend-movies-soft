import { requestError } from "../../helpers";
import { Movies } from "../../models";
import { IMovieSchema, IUserAuthRequest } from "../../types/appType";
import { Response } from "express";

const getById = async (req:IUserAuthRequest, res:Response):Promise<void> => {
  const { idParam } = req.params;

  const result:IMovieSchema | null = await Movies.findById(idParam);
  if (!result) {
    throw requestError(404,`Movie with id=${idParam} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

export default getById;
