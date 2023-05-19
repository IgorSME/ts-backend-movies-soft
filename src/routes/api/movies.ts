import express, {Router} from 'express';
import {
  validation,
  ctrlWrapper,
  authToken,
  isValidId,
}  from "../../middlewares";
import { joiMoviesSchema } from "../../models";
import { movies as ctrl } from "../../controllers";

const router:Router = express.Router();

router.get("/", authToken, ctrlWrapper(ctrl.getAll));
router.get("/:idParam", authToken, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", authToken, validation(joiMoviesSchema), ctrlWrapper(ctrl.add));
router.patch(
  "/:idParam",
  authToken,
  isValidId,
  validation(joiMoviesSchema),
  ctrlWrapper(ctrl.updateById)
);
router.delete(
  "/:idParam",
  authToken,
  validation(joiMoviesSchema),
  ctrlWrapper(ctrl.removeById)
);

export default router;
