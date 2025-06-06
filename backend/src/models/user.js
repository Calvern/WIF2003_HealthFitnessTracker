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
  dailyTargetCalorie: {
    type: Number,
  },

  favouriteFood: [
    {
      mealId: {
        type: Number,
        required: true,
      },
      foodName: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
