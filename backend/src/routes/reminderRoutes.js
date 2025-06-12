import express from "express";
import reminderController from "../controllers/reminderController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// This is the endpoint for creating a reminder
router.post("/create", verifyToken, reminderController.createReminder);

export default router;
