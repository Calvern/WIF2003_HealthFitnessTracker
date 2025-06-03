import Exercise from "../models/exercise.js";
import User from "../models/user.js";
import exerciseList from "../../../frontend/src/data/exerciseList.js";

// export const createExercise = async (req, res) => {
//   console.log("Received:", req.body);
//   try {
//     const exercise = new Exercise({ ...req.body, userId: req.userId,});
//     const saved = await exercise.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error("Error saving exercise:", err.message);
//     res.status(400).json({ error: err.message });
//   }
// };

export const createExercise = async (req, res) => {
  console.log("Received:", req.body);
  try {
    const { type, name, duration } = req.body;
    const userId = req.userId;

    let caloriesBurned = 0;

    if (type === "cardio" && duration) {
      const user = await User.findById(userId);
      const exercise = exerciseList.find((ex) => ex.name === name);
      const weight = user?.weight;
      const met = exercise?.met;

      if (met && duration && weight) {
        caloriesBurned = (met * weight * (duration / 60)).toFixed(2);
      }
    }

    const exerciseLog = new Exercise({
      ...req.body,
      userId,
      caloriesBurned: Number(caloriesBurned), // ensure it's a number
    });

    const saved = await exerciseLog.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving exercise:", err.message);
    res.status(400).json({ error: err.message });
  }
};


export const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
