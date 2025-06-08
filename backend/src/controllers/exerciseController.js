import Exercise from "../models/exercise.js";
import User from "../models/user.js";
import exerciseList from "../../../frontend/src/data/exerciseList.js";

export const createExercise = async (req, res) => {
 const { date, steps = 0, workout = [], cardio = [] } = req.body;
  const userId = req.userId;

  try {
    const log = await Exercise.findOneAndUpdate(
      { userId, date },
      {
        $set: { steps },
        $push: {
          workout: { $each: workout },
          cardio: { $each: cardio }
        }
      },
      { upsert: true, new: true }
    );

    res.status(200).json(log);
  } catch (error) {
    console.error("Log exercise error:", error);
    res.status(500).json({ message: "Failed to save exercise log" });
  }
};

export const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({ userId: req.userId }).sort({
      date: -1,
    });
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTargetSteps = async (req, res) => {
  try {
    const userId = req.userId;
    const { targetSteps, workoutMinutes } = req.body;

    if (typeof targetSteps !== "number" || typeof workoutMinutes !== "number") {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        dailyTargetSteps: targetSteps,
        dailyTargetActivity: workoutMinutes,
      },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    console.error("Update daily targets error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logSteps = async (req, res) => {
  const { date, steps } = req.body;
  const userId = req.userId;

  if (!date || typeof steps !== "number") {
    return res.status(400).json({ message: "Invalid request data" });
  }

  try {
    const updated = await Exercise.findOneAndUpdate(
      { userId, date },
      { $set: { steps } },
      { upsert: true, new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.error("Log steps error:", error);
    res.status(500).json({ message: "Failed to log steps" });
  }
};

export const fetchSteps = async (req, res) => {
  try {
    const userId = req.userId
    const today = new Date().toISOString().split("T")[0];

    const entry = await Exercise.findOne({ userId, date: today });
    console.log("Fetched Steps Entry:", entry);

    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

