import Reminder from "../models/reminder.js";  // Import the Reminder model
import { validationResult } from "express-validator";  // Optional: If you're using express-validator for validation

// Function to handle the creation of a new reminder
const createReminder = async (req, res) => {
  try {
    const { title, date, time, category, leadTime, recurring, notes } = req.body;

    if (!title || !date || !time || !category || !leadTime || !recurring || !notes) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newReminder = new Reminder({
      user: req.userId,
      title,
      date,
      time,
      category,
      leadTime,
      recurring,
      notes,
      type: "reminder",  
    });

    const savedReminder = await newReminder.save();

    res.status(201).json({
      message: "Reminder created successfully!",
      reminder: savedReminder,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create reminder" });
  }
};


const getReminderById = async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch only reminders (exclude notifications)
    const reminders = await Reminder.find({ 
      user: userId, 
      type: "reminder" // Ensure type is "reminder"
    })
      .sort({ createdAt: -1 });  // Sort by creation date, most recent first

    res.status(200).json(reminders); // Send the reminders to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reminders' });
  }
};


////////////////////////////////////////////////////////////
const deleteReminder = async (req, res) => {
  try {
    const reminderId = req.params.id;
    const reminder = await Reminder.findByIdAndDelete(reminderId);

    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }

    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete reminder" });
  }
};



const getNotifications = async (req, res) => {
  try {
    // Fetch notifications based on the userId and type: "notification"
    const notifications = await Reminder.find({ 
      user: req.userId, 
      type: "notification" 
    })
    .sort({ date: 1, time: 1 });  // Sort by date and time in ascending order

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};


export default {
  createReminder, 
  getReminderById,
  deleteReminder,
  getNotifications
};