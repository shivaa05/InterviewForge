import { upsertStreamUser } from "../lib/stream.js";
import generateToken from "../lib/token.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    console.log("object");
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    try {
      await upsertStreamUser({
        id: user._id.toString(),
        name: user.name,
      });
    } catch (err) {
      console.error("Stream sync failed:", err.message);
    }

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res
      .status(201)
      .json({ success: true, message: "Account created successfully", user });
  } catch (error) {
    console.log("Error in register", error);
    return res.status(500).json({
      success: false,
      message: "Internal sever error",
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        message: "Password not correct",
      });
    }

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Login successfully", user });
  } catch (error) {
    console.log("Error in signin", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const signout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res.status(200).json({
      success: true,
      message: "Sign out successfully",
    });
  } catch (error) {
    console.log("Error in signout", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User Not authenticated",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in get current user", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
