import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(console.log("Connected to database"));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(7001, () => {
  console.log("Server is running on localhost:7001");
});
