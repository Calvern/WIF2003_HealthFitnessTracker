import express from "express";
import mealController from "../controllers/mealController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:mealId", verifyToken, mealController.getMealbyId);

router.get(
  "/nutrition/:mealId",
  verifyToken,
  mealController.getNutritionImage
);

router.get("/recipe/:mealId", verifyToken, mealController.getRecipeImage);

export default router;
