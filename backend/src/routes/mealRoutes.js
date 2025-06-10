import express from "express";
import mealController from "../controllers/mealController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/search", verifyToken, mealController.searchMeal);

router.get("/favourites", verifyToken, mealController.getFavouriteMeals);

router.post("/favourites", verifyToken, mealController.addMealToFavourite);

router.get("/:mealId", verifyToken, mealController.getMealbyId);

router.get("/nutrition/:mealId", verifyToken, mealController.getNutritionImage);

router.get("/recipe/:mealId", verifyToken, mealController.getRecipeImage);

router.delete(
  "/favourites/:mealId",
  verifyToken,
  mealController.removeMealFromFavourite
);

export default router;
