import Exercise from "../models/exercise.js";

export const createExercise = async (req, res) => {
  console.log("Received:", req.body);
  try {
    const exercise = new Exercise({ ...req.body, userId: req.userId,});
    const saved = await exercise.save();
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
