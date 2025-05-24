import User from "../models/user.js";
import jwt from "jsonwebtoken";
import calculateAge from "../utilities/calculateAge.js";

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

    return res.status(200).json({ message: "User registered OK" });
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

    await user.save();
    res.status(201).json(user);
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
    await user.save();

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export default {
  registerMyUser,
  registerMyUserProfile,
  registerMyUserPhysicalInfo,
};
