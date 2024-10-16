import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./database/connectDB.js";

const app = express(); // Create an Express app

connectDB((next) => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
  });
});
