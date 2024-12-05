import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";

interface AuthRequest extends Request {
  user?: { _id: string; username: string };
}

export const validateJWT = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // if token not found
    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Unauthorized request" });

    // verify token
    const decodedToken = jwt.verify(
      token,
      String(process.env.ACCESS_TOKEN_SECRET)
    ) as JwtPayload & { _id: string };

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    // if token not found
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Unauthorized request" });

    req.user = {
      _id: String(decodedToken._id),
      username: String(decodedToken.username),
    };

    next();
  } catch (error) {
    console.log("Auth middleware error :: ", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};