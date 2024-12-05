import jwt from "jsonwebtoken";

export const generateAccessToken = (user: any) => {
  const accessToken = jwt.sign(
    { _id: user._id, username: user.username },
    String(process.env.ACCESS_TOKEN_SECRET),
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  return accessToken;
};

export const generateRefreshToken = (user: any) => {
  const refreshToken = jwt.sign(
    { _id: user._id, username: user.username },
    String(process.env.REFRESH_TOKEN_SECRET),
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );

  return refreshToken;
};
