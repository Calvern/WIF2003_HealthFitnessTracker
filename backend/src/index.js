import express from "express";
import http from "http";  // Import http module for creating an HTTP server
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import foodDiaryRoutes from "./routes/foodDiaryRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import cron from "node-cron";
import Reminder from "./models/reminder.js";
import { checkAndConvertReminders } from "./utilities/cron.js";
import { Server } from "socket.io";


const app = express();
const server = http.createServer(app);  // Create an HTTP server using Express app
const io = new Server(server)  // Attach socket.io to the server

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to database"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/food-diary", foodDiaryRoutes);
app.use("/api/meal", mealRoutes);
app.use("/api/reminders", reminderRoutes);

// Send real-time notifications via socket.io
const sendNotificationToClient = (notification) => {
  io.emit("newNotification", notification); // This broadcasts the event to all connected clients
};

// Schedule the cron job to run every 10 seconds (for demo purposes)
cron.schedule('*/10 * * * * *', async () => {
  console.log("\n=== Running reminder check ===");
  await checkAndConvertReminders(sendNotificationToClient);  // Pass the emit function to cron task
});

// Start the server
server.listen(7001, () => {
  console.log("Server is running on localhost:7001");
});
