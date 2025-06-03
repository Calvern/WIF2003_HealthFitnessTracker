import mongoose from "mongoose";

const exerciseLogSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["cardio", "workout"], required: true },
  name: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },

  // Cardio fields
  duration: Number,
  caloriesBurned: Number,

  // Workout fields
  sets: Number,
  reps: Number,
});

const Exercise = mongoose.model("ExerciseLog", exerciseLogSchema);
export default Exercise;
