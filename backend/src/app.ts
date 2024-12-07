import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

// route import
import userRouter from "./routes/user.routes";
import brainRouter from "./routes/brain.routes";

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/brain", brainRouter);

export default app;
