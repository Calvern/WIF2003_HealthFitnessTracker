import express from "express";
import authController from "../controllers/authController.js";
import { validateUserLogInRequest } from "../middlewares/validation.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/validate-token", verifyToken, authController.getUserId);

router.post("/login", validateUserLogInRequest, authController.logIn);

router.post("/logout", authController.logOut);

export default router;
