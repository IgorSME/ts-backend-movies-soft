const express = require("express");
const router = express.Router();
const { authToken, validation, ctrlWrapper } = require("../../middlewares");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiRefreshTokenSchema,
} = require("../../models");

const { auth: ctrl } = require("../../controllers");

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.post("/logout", authToken, ctrlWrapper(ctrl.logout));
router.post(
  "/refresh",
  validation(joiRefreshTokenSchema),
  ctrlWrapper(ctrl.refresh)
);
router.get("/current", authToken, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
