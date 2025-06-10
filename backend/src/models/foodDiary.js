import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  mealId: {
    type: Number,
    required: true,
  },
  foodName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  mealType: {
    type: String,
    enum: ["breakfast", "lunch", "dinner"],
    required: true,
  },
});

const foodDiarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
  meals: [mealSchema],
});

const FoodDiary = mongoose.model("FoodDiary", foodDiarySchema);

export default FoodDiary;
