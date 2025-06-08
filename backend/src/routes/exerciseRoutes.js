import express from "express";
import {
  createExercise,
  getExercises,
  updateTargetSteps,
  logSteps,
  fetchSteps,
  fetchCardioDuration, 
  fetchCaloriesBurned,
  fetchWeeklySummary,
  updateCardioExercise,
} from "../controllers/exerciseController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyToken, createExercise);
router.get("/", verifyToken, getExercises);
router.put("/target", verifyToken, updateTargetSteps);
router.post("/steps", verifyToken, logSteps);
router.get("/steps/today", verifyToken, fetchSteps);
router.get("/cardio/duration", verifyToken, fetchCardioDuration);
router.get("/calories/burned", verifyToken, fetchCaloriesBurned);
router.get("/summary/weekly", verifyToken, fetchWeeklySummary);
router.put("/update/cardio/:id", verifyToken, updateCardioExercise);

export default router;