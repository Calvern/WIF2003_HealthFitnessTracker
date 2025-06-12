import Reminder from "../models/reminder.js";  // Import the Reminder model
import { validationResult } from "express-validator";  // Optional: If you're using express-validator for validation

// Function to handle the creation of a new reminder
const createReminder = async (req, res) => {
  try {
    console.log("BUG here--> User Info:", req.userId);  // Log the user to verify its content

    // Extract the data from the request body
    const {
      title,
      date,
      time,
      category,
      leadTime,
      recurring,
      notes,
    } = req.body;

    // Validate that the necessary fields are provided (optional: you can add your own validation logic)
    if (!title || !date || !time || !category || !leadTime || !recurring || !notes) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new reminder object
    const newReminder = new Reminder({
      user: req.userId,  // Use req.userId to get the logged-in user's ID from the token
      title,
      date,
      time,
      category,
      leadTime,
      recurring,
      notes,
    });

    // Save the new reminder to the database
    const savedReminder = await newReminder.save();

    // Send a success response back to the frontend
    res.status(201).json({
      message: "Reminder created successfully!",
      reminder: savedReminder,  // Send the saved reminder back to the frontend
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create reminder" });
  }
};

const getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find(); // Fetch all reminders
    res.status(200).json(reminders); // Send them to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reminders' });
  }
};

export default {
  createReminder, 
  getAllReminders,
};