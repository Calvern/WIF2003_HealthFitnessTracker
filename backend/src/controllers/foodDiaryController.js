import axios from "axios";
import FoodDiary from "../models/foodDiary.js";
import mongoose from "mongoose";
const SPOON_API_KEY = process.env.SPOONACULAR_API_KEY;

const recommendMeal = async (req, res) => {
  try {
    const { targetCalories, date } = req.body;
    console.log(targetCalories);
    const { data: mealPlan } = await axios.get(
      "https://api.spoonacular.com/mealplanner/generate",
      {
        params: {
          timeFrame: "day",
          targetCalories: targetCalories || 2000,
          apiKey: SPOON_API_KEY,
        },
      }
    );

    const meals = mealPlan.meals;

    const mealTypes = ["breakfast", "lunch", "dinner"];

    const mealData = await Promise.all(
      meals.map(async (meal, index) => {
        const { calories, protein, fat, carbs } = await fetchNutrition(meal.id);
        return {
          mealId: meal.id,
          foodName: meal.title,
          imageUrl: `https://img.spoonacular.com/recipes/${meal.id}-312x231.jpg`,
          calories,
          protein,
          fat,
          carbs,
          mealType: mealTypes[index],
        };
      })
    );

    let foodDiary = await FoodDiary.findOne({
      user: req.userId,
      date: new Date(date),
    });
    if (!foodDiary) {
      foodDiary = new FoodDiary();
      foodDiary.user = new mongoose.Types.ObjectId(req.userId);
      foodDiary.date = new Date(date);
      foodDiary.meals = [];
    }
    foodDiary.meals.push(...mealData);
    await foodDiary.save();
    return res.status(200).json({ message: "Diary updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getDiaryByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const userId = req.userId;
    const foodDiary = await FoodDiary.findOne({
      user: userId,
      date: new Date(date),
    }).select("meals");
    if (!foodDiary) {
      const foodDiary = {
        meals: [],
      };
      return res.json(foodDiary);
    }
    res.json(foodDiary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const addFoodToDiary = async (req, res) => {
  try {
    const { date, type, mealId, foodName } = req.body;
    const userId = req.userId;

    const { calories, protein, fat, carbs } = await fetchNutrition(mealId);

    const meal = {
      mealId,
      foodName,
      imageUrl: `https://img.spoonacular.com/recipes/${mealId}-312x231.jpg`,
      calories,
      protein,
      fat,
      carbs,
      mealType: type,
    };

    let foodDiary = await FoodDiary.findOne({
      user: userId,
      date: new Date(date),
    });
    if (!foodDiary) {
      foodDiary = new FoodDiary();
      foodDiary.user = new mongoose.Types.ObjectId(req.userId);
      foodDiary.date = new Date(date);
      foodDiary.meals = [];
    }
    foodDiary.meals.push(meal);
    await foodDiary.save();
    return res.status(200).json({ message: "Diary updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const removeFoodFromDiary = async (req, res) => {
  try {
    const { date, type, mealId } = req.query;
    const foodDiary = await FoodDiary.findOne({
      user: req.userId,
      date: new Date(date),
    });

    if (!foodDiary) {
      res
        .status(404)
        .json({ message: "Food Diary for this date is not available" });
    }
    const indexToRemove = foodDiary.meals.findIndex(
      (meal) => meal.mealId === Number(mealId) && meal.mealType === type
    );

    if (indexToRemove === -1) {
      return res
        .status(404)
        .json({ message: "Meal not found in diary for specified type" });
    }

    // Remove just one matching meal
    foodDiary.meals.splice(indexToRemove, 1);
    await foodDiary.save();
    res.status(200).json({ message: "Meal removed from diary" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const fetchNutrition = async (id) => {
  const { data } = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json`,
    {
      params: {
        apiKey: SPOON_API_KEY,
      },
    }
  );

  const nutrients = data.nutrients;

  const getNutrientValue = (name) => {
    const item = nutrients.find((n) => n.name === name);
    return item ? item.amount : 0;
  };

  const calories = Math.round(getNutrientValue("Calories"));
  const protein = Math.round(getNutrientValue("Protein"));
  const fat = Math.round(getNutrientValue("Fat"));
  const carbs = Math.round(getNutrientValue("Carbohydrates"));
  return {
    calories,
    protein,
    fat,
    carbs,
  };
};

const getCalorieSummaryByDay = async (req, res) => {
  try {
    const { date } = req.query;
    const userId = req.userId;

    const targetDate = new Date(date); // e.g., "2025-06-12"
    const nextDate = new Date(targetDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const diaryEntry = await FoodDiary.findOne({
      user: userId,
      date: {
        $gte: targetDate,
        $lt: nextDate,
      },
    });

    if (!diaryEntry) {
      return res.json({ totalCalories: 0 });
    }

    const totalCalories = diaryEntry.meals.reduce(
      (sum, meal) => sum + meal.calories,
      0
    );

    res.json({ totalCalories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getCalorieSummary = async (req, res) => {
  try {
    const { mode, startDate, endDate, month, year } = req.query;
    const userId = req.userId;

    const matchStage = {
      user: new mongoose.Types.ObjectId(userId),
    };

    // --- DAILY MODE: group by day ---
    if (mode === "daily" && startDate && endDate) {
      const from = new Date(startDate);
      const to = new Date(endDate);
      to.setDate(to.getDate() + 1); // exclusive end

      matchStage.date = {
        $gte: from,
        $lt: to,
      };
    }

    // --- WEEKLY MODE: group by week ---
    if (mode === "weekly" && month && year) {
      const startOfMonth = new Date(Date.UTC(year, month - 1, 1));
      const endOfMonth = new Date(Date.UTC(year, month, 1));

      matchStage.date = {
        $gte: startOfMonth,
        $lt: endOfMonth,
      };
    }

    const pipeline = [
      { $match: matchStage },
      { $unwind: "$meals" },
      {
        $group: {
          _id:
            mode === "weekly"
              ? {
                  week: { $isoWeek: "$date" },
                  year: { $isoWeekYear: "$date" },
                }
              : {
                  date: {
                    $dateToString: { format: "%Y-%m-%d", date: "$date" },
                  },
                },
          totalCalories: { $sum: "$meals.calories" },
        },
      },
      { $sort: { "_id.date": 1, "_id.week": 1 } },
    ];

    const result = await FoodDiary.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  recommendMeal,
  getDiaryByDate,
  addFoodToDiary,
  removeFoodFromDiary,
  getCalorieSummary,
  getCalorieSummaryByDay,
};
