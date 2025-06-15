import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";
import cron from "node-cron";
import Reminder from "./models/reminder.js";
import { checkAndConvertReminders } from "./utilities/cron.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import foodDiaryRoutes from "./routes/foodDiaryRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

// Create an Express app
const app = express();

// Create an HTTP server and attach Socket.IO
const server = http.createServer(app);

// Configure Socket.IO with CORS support
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  // Allow connections from this frontend URL
    methods: ["GET", "POST"],  // Allow these HTTP methods
    credentials: true,  // Allow cookies to be sent in requests
  },
});

// Your other Express configurations...
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS for HTTP requests
app.use(
  cors({
    origin: "http://localhost:5173",  // Allow the frontend to connect
    credentials: true,  // Allow credentials (cookies) if needed
  })
);

// Database connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to database"));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Routes setup
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/food-diary", foodDiaryRoutes);
app.use("/api/meal", mealRoutes);
app.use("/api/reminders", reminderRoutes);

// Real-time notifications via Socket.IO
const sendNotificationToClient = (notification) => {
  io.emit("newNotification", notification);  // Emit to all connected clients
};

// Cron job to check reminders
cron.schedule('*/30 * * * * *', async () => {
  console.log("\n=== Running reminder check ===");
  await checkAndConvertReminders(sendNotificationToClient);  // Pass the emit function to cron task
});

// Start the server
server.listen(7001, () => {
  console.log("Server is running on http://localhost:7001");
});
