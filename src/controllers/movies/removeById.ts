import { requestError } from "../../helpers";
import { Movies } from "../../models";
import { Request, Response } from "express";
import { IMovieSchema } from "../../types/appType";

const removeById = async (req:Request, res:Response):Promise<void> => {
  const { idParam } = req.params;
  const result:IMovieSchema | null = await Movies.findByIdAndRemove(idParam);
  if (!result) {
    throw requestError(404,`Movie with id=${idParam} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

export default removeById;
