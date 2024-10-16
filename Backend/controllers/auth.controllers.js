import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      password == "" ||
      email === ""
    ) {
      return next(errorHandler(400, "All fields are required"));
    }
    const UserAlreadyExist = await User.findOne({ email });
    if (UserAlreadyExist) {
      return next(errorHandler(409, "User Already exist!"));
    }
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    const { password: pas, ...rest } = newUser._doc;
    res.send(rest);
  } catch (error) {
    next(error);
  }
};
