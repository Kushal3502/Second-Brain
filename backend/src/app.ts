import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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

// routes
app.use("/api/v1/user", userRouter);

export default app;
