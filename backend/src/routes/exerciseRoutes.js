import express from "express";
import {
  createExercise,
  getExercises
} from "../controllers/exerciseController.js";

const router = express.Router();

router.post("/", createExercise);
router.get("/", getExercises);

export default router;