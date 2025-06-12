import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    category: { type: String, required: true },
    leadTime: { type: String, required: true },
    recurring: { type: String, required: true },
    notes: { type: String, required: true },
  },
  { timestamps: true } // To keep track of creation time
);

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;
