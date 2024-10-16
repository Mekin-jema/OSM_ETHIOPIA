import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./database/connectDB.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

//middlewares
app.use(express.json());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
app.get("/", (req, res) => {
  res.send("Hello World");
});

// route controller
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//Connect to database
connectDB((next) => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
  });
});
