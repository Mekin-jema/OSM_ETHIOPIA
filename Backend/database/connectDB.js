import mongoose from "mongoose";

export const connectDB = async (next) => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${con.connection.host}`);
    next();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
