import express from "express";
import userController from "../controllers/userController.js";
import { getUserGoals } from "../controllers/userController.js";
import {
  validateUserCreatePhysicalInfoRequest,
  validateUserCreateProfileRequest,
  validateUserEditProfileRequest,
  validateUserRegisterRequest,
} from "../middlewares/validation.js";
import { verifyToken } from "../middlewares/auth.js";
import multer from "multer";

const router = express.Router();

router.post(
  "/register",
  validateUserRegisterRequest,
  userController.registerMyUser
);

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.put(
  "/create-profile",

  upload.single("imageFile"),
  validateUserCreateProfileRequest,
  verifyToken,
  userController.registerMyUserProfile
);
router.put(
  "/create-physical",
  validateUserCreatePhysicalInfoRequest,
  verifyToken,
  userController.registerMyUserPhysicalInfo
);
router.get("/profile", verifyToken, userController.getMyUserInfo);

router.put(
  "/profile",
  upload.single("imageFile"),
  validateUserEditProfileRequest,
  verifyToken,
  userController.updateMyUserProfile
);

router.get("/goals", verifyToken, getUserGoals);

export default router;
