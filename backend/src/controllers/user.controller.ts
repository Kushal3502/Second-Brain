import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) throw new Error("All fields are required");

    //   check if username already exists
    const isExists = await User.findOne({ username });

    if (isExists)
      res.status(400).json({
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
      res.status(400).json({
        success: false,
        message: "User not created",
      });

    res.status(201).json({
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
