import express, {Router} from 'express';
import { authToken, validation, ctrlWrapper } from "../../middlewares";
import {
  joiRegisterSchema,
  joiLoginSchema,
  joiRefreshTokenSchema,
} from "../../models";

import { auth as ctrl }from "../../controllers";

const router:Router = express.Router();

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

export default router;
