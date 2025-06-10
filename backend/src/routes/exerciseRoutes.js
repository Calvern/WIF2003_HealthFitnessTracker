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
  updateWorkoutExercise,
  deleteCardioExercise,
  deleteWorkoutExercise,
  getCalorieOutSummary
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
router.get("/calorie-out-summary", verifyToken, getCalorieOutSummary);
router.put("/update/cardio/:id", verifyToken, updateCardioExercise);
router.put("/update/workout/:id", verifyToken, updateWorkoutExercise);
router.delete("/delete/cardio/:id", verifyToken, deleteCardioExercise);
router.delete("/delete/workout/:id", verifyToken, deleteWorkoutExercise);


export default router;