import axios from "axios";
import FoodDiary from "../models/foodDiary.js";
import User from "../models/user.js";

const searchMeal = async (req, res) => {
  try {
    const { query, page } = req.query;
    const result = await axios.get(
      `https://api.spoonacular.com/recipes/autocomplete?number=24&query=${query}`,
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );
    const resultDataList = Object.values(result.data);
    const pageSize = 6;
    const pageNumber = parseInt(page || "1");
    const skip = (pageNumber - 1) * 6;
    const total = resultDataList.length;
    let searchResult = resultDataList.slice(skip, skip + pageSize);
    searchResult = searchResult.map((result) => ({
      mealId: result.id,
      foodName: result.title,
      imageUrl: `https://img.spoonacular.com/recipes/${result.id}-312x231.jpg`,
    }));
    const response = {
      data: searchResult,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    return res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Something went wrong" });
  }
};

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

const addMealToFavourite = async (req, res) => {
  try {
    const { mealId } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const exists = user.favouriteFood.some(
      (item) => item.mealId === Number(mealId)
    );
    if (exists) {
      return res.status(400).json({ message: "Meal already in favourites" });
    }
    user.favouriteFood.push(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const removeMealFromFavourite = async (req, res) => {
  try {
    const mealId = req.params.mealId;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out the meal with the given mealId
    user.favouriteFood = user.favouriteFood.filter(
      (item) => item.mealId !== Number(mealId)
    );

    await user.save();

    return res.status(200).json({ message: "Meal removed from favourites" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getFavouriteMeals = async (req, res) => {
  try {
    const pageSize = 6;
    const pageNumber = parseInt(req.query.page || "1");
    const skip = (pageNumber - 1) * 6;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const total = user.favouriteFood.length;
    const favouriteMeals = user.favouriteFood.slice(skip, skip + pageSize);

    const response = {
      data: favouriteMeals,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    return res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  searchMeal,
  getNutritionImage,
  getMealbyId,
  getRecipeImage,
  addMealToFavourite,
  removeMealFromFavourite,
  getFavouriteMeals,
};
