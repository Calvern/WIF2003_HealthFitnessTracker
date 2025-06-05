import express from "express";
import {
  createExercise,
  getExercises,
  updateTargetSteps,
  logSteps
} from "../controllers/exerciseController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyToken, createExercise);
router.get("/", verifyToken, getExercises);
router.put("/target", verifyToken, updateTargetSteps);
router.post("/steps", verifyToken, logSteps);

export default router;