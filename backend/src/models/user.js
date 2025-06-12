import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  profilePictureUrl: {
    type: String, // URL to Cloudinary image
  },
  gender: {
    type: String,
  },
  dob: {
    type: Date,
  },
  weight: {
    type: Number, // in kilograms
  },
  height: {
    type: Number,
  },
  activityLevel: {
    type: Number,
  },
  weightGoal: {
    type: Number,
    enum: [-500, 0, 500],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deactivated: {
    type: Boolean,
    default: false,
  },

  dailyTargetCalorie: {
    type: Number,
  },

  dailyTargetSteps: {
    type: Number,
  },
  dailyTargetActivity: {
    type: Number,
  },

  favouriteFood: {
    type: [
      {
        mealId: Number,
        foodName: String,
        imageUrl: String,
      },
    ],
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
