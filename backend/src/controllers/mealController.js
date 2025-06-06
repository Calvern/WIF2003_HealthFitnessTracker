import axios from "axios";
import FoodDiary from "../models/foodDiary.js";

const getNutritionImage = async (req, res) => {
  try {
    const mealId = req.params.mealId;
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${mealId}/nutritionLabel.png`,
      {
        responseType: "arraybuffer",
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Length", response.data.length);
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getMealbyId = async (req, res) => {
  try {
    const mealId = Number(req.params.mealId);
    const foodDiary = await FoodDiary.findOne({
      user: req.userId,
      "meals.mealId": mealId,
    });
    if (!foodDiary) {
      return res.status(404).json({ message: "Meal not found" });
    }

    const matchedMeal = foodDiary.meals.find((meal) => meal.mealId === mealId);
    return res.json(matchedMeal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getRecipeImage = async (req, res) => {
  try {
    const mealId = req.params.mealId;
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${mealId}/card`,
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  getNutritionImage,
  getMealbyId,
  getRecipeImage,
};
