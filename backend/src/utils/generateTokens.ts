import jwt from "jsonwebtoken";

export const generateToken = (user: any) => {
  const token = jwt.sign(
    { id: user._id, username: user.username },
    String(process.env.JWT_SECRET),
    { expiresIn: process.env.JWT_EXPIRY }
  );

  return token;
};
