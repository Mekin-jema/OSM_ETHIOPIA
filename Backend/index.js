import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./database/connectDB.js";
import userRouter from "./routes/user.routes.js";

const app = express(); // Create an Express app

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", userRouter);
connectDB((next) => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
  });
});
