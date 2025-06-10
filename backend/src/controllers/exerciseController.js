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

      const MET = exerciseMeta?.met || 0;
      const duration = item.duration || 0;
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
    const today = new Date().toLocaleDateString("en-CA");

    const entry = await Exercise.findOne({ userId, date: today });

    res.json(entry || { steps: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const fetchCardioDuration = async (req, res) => {
  try {
    const userId = req.userId;
    const today = new Date().toLocaleDateString("en-CA");

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
    const today = new Date().toLocaleDateString("en-CA");

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

        const cardioMinutes =
          log.cardio?.reduce((sum, entry) => sum + (entry.duration || 0), 0) ||
          0;
        totalMinutes += cardioMinutes;

        const dailyCalories =
          log.cardio?.reduce(
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

export const updateCardioExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedExercise = await Exercise.findOneAndUpdate(
      { "cardio._id": id },
      {
        $set: {
          "cardio.$.date": updatedData.date,
          "cardio.$.startTime": updatedData.startTime,
          "cardio.$.duration": updatedData.duration,
        },
      },
      { new: true }
    );

    if (!updatedExercise) {
      return res.status(404).json({ message: "Cardio exercise not found" });
    }

    res.json(updatedExercise);
  } catch (error) {
    console.error("Error updating cardio exercise:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateWorkoutExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedExercise = await Exercise.findOneAndUpdate(
      { "workout._id": id },
      {
        $set: {
          "workout.$.date": updatedData.date,
          "workout.$.startTime": updatedData.startTime,
          "workout.$.sets": updatedData.sets,
          "workout.$.reps": updatedData.reps,
        },
      },
      { new: true }
    );

    if (!updatedExercise) {
      return res.status(404).json({ message: "Workout exercise not found" });
    }

    res.json(updatedExercise);
  } catch (error) {
    console.error("Error updating workout exercise:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCardioExercise = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExercise = await Exercise.findOneAndUpdate(
      { "cardio._id": id },
      { $pull: { cardio: { _id: id } } },
      { new: true }
    );

    if (!deletedExercise) {
      return res.status(404).json({ message: "Cardio exercise not found" });
    }

    res.json({
      message: "Cardio exercise deleted successfully",
      deletedExercise,
    });
  } catch (error) {
    console.error("Error deleting cardio exercise:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteWorkoutExercise = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExercise = await Exercise.findOneAndUpdate(
      { "workout._id": id },
      { $pull: { workout: { _id: id } } },
      { new: true }
    );

    if (!deletedExercise) {
      return res.status(404).json({ message: "Workout exercise not found" });
    }

    res.json({
      message: "Workout exercise deleted successfully",
      deletedExercise,
    });
  } catch (error) {
    console.error("Error deleting workout exercise:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCalorieOutSummary = async (req, res) => {
  try {
    const { mode } = req.query;
    const userId = req.userId;

    const pipeline = [
      { $match: { user: userId } },
      {
        $project: {
          caloriesBurned: "$calories", // adjust based on your model
          date: 1,
        },
      },
      {
        $group: {
          _id: mode === "weekly"
            ? { $week: "$date" }
            : { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalCaloriesOut: { $sum: "$caloriesBurned" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];

    const result = await Exercise.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to summarize calories out" });
  }
};