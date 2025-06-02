import express from "express";
import {
  createExercise,
  getExercises
} from "../controllers/exerciseController.js";
import { verifyToken } from "../middlewares/auth.js";


const router = express.Router();

router.post("/", verifyToken, createExercise);
router.get("/", verifyToken, getExercises);

export default router;