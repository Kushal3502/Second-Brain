import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens";

interface AuthRequest extends Request {
  user?: { _id: string; username: string };
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) throw new Error("All fields are required");

    //   check if username already exists
    const isExists = await User.findOne({ username });

    if (isExists)
      return res.status(400).json({
        success: true,
        message: "Username already taken",
      });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //   create new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    if (!newUser)
      return res.status(400).json({
        success: false,
        message: "User not created",
      });

    return res.status(201).json({
      success: true,
      user: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Signup error :: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    // Extract user details
    const { username, password } = req.body;

    // Validate the username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // set cookies
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        user: {
          _id: user._id,
          username: user.username,
        },
        message: "Sign in successful",
      });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    // clear all cookies
    res.clearCookie("accessToken").clearCookie("refreshToken");

    if (req.user) {
      const user = await User.findById(req.user._id);
      // remove refreshtoken from db
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      // @ts-ignore
      user: req.user,
      message: "User fetched successfully",
    });

    // if token found -> reset the token
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
