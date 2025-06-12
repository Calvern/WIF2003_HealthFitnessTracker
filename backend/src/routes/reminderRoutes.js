import express from "express";
import reminderController from "../controllers/reminderController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// POST request to create a reminder
router.post("/create", verifyToken, reminderController.createReminder);

// GET request to fetch all reminders
router.get("/", verifyToken, reminderController.getAllReminders);

export default router;
