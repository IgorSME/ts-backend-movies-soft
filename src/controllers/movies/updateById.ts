import { requestError } from "../../helpers";
import { Movies } from "../../models";
import { Request,Response
 } from "express";
import { IMovieSchema } from "../../types/appType";

const updateById = async (req:Request, res:Response):Promise<void> => {
  // const { _id } = req.user;
  const { idParam } = req.params;
  console.log("result", idParam);
  const result:IMovieSchema | null = await Movies.findOneAndUpdate({ _id: idParam }, req.body, {
    new: true,
  });

  if (!result) {
    throw requestError(404, `Movie with ${idParam} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
export default updateById;
