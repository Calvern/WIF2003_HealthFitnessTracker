import express from "express";
import foodDiaryController from "../controllers/foodDiaryController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/recommend-food", verifyToken, foodDiaryController.recommendMeal);

router.get("/", verifyToken, foodDiaryController.getDiaryByDate);

export default router;
