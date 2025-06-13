import express from "express";
import reminderController from "../controllers/reminderController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// POST request to create a reminder
router.post("/create", verifyToken, reminderController.createReminder);

// GET request to fetch all reminders
router.get("/get-reminders", verifyToken, reminderController.getReminderById);

router.get("/get-notifications", verifyToken, reminderController.getNotifications);

router.put("/:id/read", verifyToken, reminderController.updateReadStatus);




router.delete("/:id", verifyToken, reminderController.deleteReminder);

router.put("/update/:id", verifyToken, reminderController.updateReminder);

export default router;
