import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  name: String,
  startTime: String,
  sets: Number,
  reps: Number,
});

const cardioSchema = new mongoose.Schema({
  name: String,
  startTime: String,
  duration: Number,
  caloriesBurned: Number,
});

const exerciseLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true }, 
  steps: { type: Number, default: 0 },
  workout: [workoutSchema],
  cardio: [cardioSchema],
});

export default mongoose.model("ExerciseLog", exerciseLogSchema);
