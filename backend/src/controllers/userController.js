import User from "../models/user.js";
import jwt from "jsonwebtoken";
import calculateAge from "../utilities/calculateAge.js";
import cloudinary from "cloudinary";
import bcrypt from "bcryptjs";

const registerMyUser = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User(req.body);
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 86400000,
    });

    return res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const registerMyUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
    });

    if (!user) {
      res.status(404).json({ message: "User does not exist" });
    }

    const imageFile = req.file;
    const imageUrl = await uploadImagesToCloudinary(imageFile);
    user.profilePictureUrl = imageUrl;
    console.log("Received profile data:", user.profilePictureUrl);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const registerMyUserPhysicalInfo = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
    });

    if (!user) {
      res.status(404).json({ message: "User does not exist" });
    }
    const age = calculateAge(user.dob);
    const bmr =
      10 * user.weight +
      6.25 * user.height -
      5 * age +
      (user.gender == "Male" ? 5 : -161);
    const targetCalorie = bmr * user.activityLevel + user.weightGoal;
    user.dailyTargetCalorie = targetCalorie;
    user.dailyTargetSteps = 0;
    user.dailyTargetActivity = 0;
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getMyUserInfo = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateMyUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
    });

    if (!user) {
      res.status(404).json({ message: "User does not exist" });
    }

    const imageFile = req.file;
    if (imageFile) {
      const imageUrl = await uploadImagesToCloudinary(imageFile);
      user.profilePictureUrl = imageUrl;
    }
    console.log("Received profile data:", user.profilePictureUrl);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const changeMyUserPassword = async (req, res) => {
  try {
    console.log("🔧 req.body:", req.body);
    console.log("🔧 userId:", req.userId);

    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect current password" });

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  registerMyUser,
  registerMyUserProfile,
  registerMyUserPhysicalInfo,
  getMyUserInfo,
  updateMyUserProfile,
  changeMyUserPassword,
};

async function uploadImagesToCloudinary(imageFile) {
  const base64Image = Buffer.from(imageFile.buffer).toString("base64");
  const dataURI = `data:${imageFile.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
}

export const getUserGoals = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select(
      "dailyTargetCalorie dailyTargetSteps dailyTargetActivity"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      calories: user.dailyTargetCalorie || 0,
      steps: user.dailyTargetSteps || 0,
      activity: user.dailyTargetActivity || 0,
    });
  } catch (err) {
    console.error("Error fetching user goals:", err);
    res.status(500).json({ message: "Server error" });
  }
};
