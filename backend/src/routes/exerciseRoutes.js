import express from "express";
import {
  createExercise,
  getExercises,
  updateTargetSteps,
} from "../controllers/exerciseController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyToken, createExercise);
router.get("/", verifyToken, getExercises);
router.put("/target", verifyToken, updateTargetSteps);

export default router;