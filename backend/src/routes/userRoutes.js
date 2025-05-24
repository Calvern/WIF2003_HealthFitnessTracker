import express from "express";
import userController from "../controllers/userController.js";
import { validateUserRegisterRequest } from "../middlewares/validation.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/register",
  validateUserRegisterRequest,
  userController.registerMyUser
);

router.put(
  "/create-profile",
  verifyToken,
  userController.registerMyUserProfile
);
router.put(
  "/create-physical",
  verifyToken,
  userController.registerMyUserPhysicalInfo
);

export default router;
