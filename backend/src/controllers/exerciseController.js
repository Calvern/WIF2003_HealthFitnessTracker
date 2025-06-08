import Exercise from "../models/exercise.js";
import User from "../models/user.js";
import exerciseList from "../../../frontend/src/data/exerciseList.js";

export const createExercise = async (req, res) => {
  const { date, steps = 0, workout = [], cardio = [] } = req.body;
  const userId = req.userId;

  try {
    // Fetch user weight from database
    const user = await User.findById(userId);
    const weight = user?.weight || 0;

    // Process cardio array to calculate calories burned
    const processedCardio = cardio.map((item) => {
      const exerciseMeta = exerciseList.find(
        (ex) => ex.name.toLowerCase() === item.name.toLowerCase()
      );

      const MET = exerciseMeta?.met || 0; // Default MET = 100 if not found
      const duration = item.duration || 0; // in minutes
      const caloriesBurned = (MET * 3.5 * weight * duration) / 200;

      return {
        ...item,
        caloriesBurned: Math.round(caloriesBurned),
      };
    });

    const log = await Exercise.findOneAndUpdate(
      { userId, date },
      {
        $set: { steps },
        $push: {
          workout: { $each: workout },
          cardio: { $each: processedCardio },
        },
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
    const userId = req.userId;
    const today = new Date().toISOString().split("T")[0];

    const entry = await Exercise.findOne({ userId, date: today });

    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const fetchCardioDuration = async (req, res) => {
  try {
    const userId = req.userId;
    const today = new Date().toISOString().split("T")[0];

    const log = await Exercise.findOne({ userId, date: today });

    if (!log || !log.cardio || log.cardio.length === 0) {
      return res.json({ totalDuration: 0 });
    }

    const totalDuration = log.cardio.reduce(
      (sum, entry) => sum + (entry.duration || 0),
      0
    );
    res.json({ totalDuration });
  } catch (error) {
    console.error("Error fetching cardio duration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const fetchCaloriesBurned = async (req, res) => {
  try {
    const userId = req.userId;
    const today = new Date().toISOString().split("T")[0];

    const log = await Exercise.findOne({ userId, date: today });

    if (!log || !log.cardio || log.cardio.length === 0) {
      return res.json({ totalCalories: 0 });
    }

    const totalCalories = log.cardio.reduce(
      (sum, entry) => sum + (entry.caloriesBurned || 0),
      0
    );

    res.json({ totalCalories });
  } catch (error) {
    console.error("Error fetching calories burned:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const fetchWeeklySummary = async (req, res) => {
  try {
    const userId = req.userId;
    const dates = req.query.dates?.split(",") || [];

    const logs = await Exercise.find({
      userId,
      date: { $in: dates },
    });

    let totalSteps = 0;
    let totalMinutes = 0;
    let totalCalories = 0;
    let daysWithData = 0;

    logs.forEach((log) => {
      const hasSteps = log.steps > 0;
      const hasCardio = Array.isArray(log.cardio) && log.cardio.length > 0;

      if (hasSteps || hasCardio) {
        totalSteps += log.steps || 0;

        // Sum cardio durations (minutes)
        const cardioMinutes = log.cardio?.reduce(
          (sum, entry) => sum + (entry.duration || 0),
          0
        ) || 0;
        totalMinutes += cardioMinutes;

        // Sum cardio calories
        const dailyCalories = log.cardio?.reduce(
          (sum, entry) => sum + (entry.caloriesBurned || 0),
          0
        ) || 0;
        totalCalories += dailyCalories;

        daysWithData += 1;
      }
    });

    const avg = {
      averageSteps: Math.round(totalSteps / (daysWithData || 1)),
      averageMinutes: Math.round(totalMinutes / (daysWithData || 1)),
      averageCalories: Math.round(totalCalories / (daysWithData || 1)),
    };

    res.json(avg);
  } catch (error) {
    console.error("Error fetching weekly summary:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateExercise = async (req, res) => {
  console.log("Update exercise request received"); // 🪵 Add this
  try {
    const { id } = req.params;
    const updatedData = req.body;

    console.log("Updating exercise with ID:", id); // 🪵 Add this
    const updatedExercise = await Exercise.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedExercise) {
      console.log("Exercise not found for ID:", id); // 🪵 Add this
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.json(updatedExercise);
  } catch (error) {
    console.error("Error updating exercise:", error);
    res.status(500).json({ message: "Server error" });
  }
};


