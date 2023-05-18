const express = require("express");
const router = express.Router();
const {
  validation,
  ctrlWrapper,
  authToken,
  isValidId,
} = require("../../middlewares");
const { joiMoviesSchema } = require("../../models");
const { movies: ctrl } = require("../../controllers");

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

module.exports = router;
