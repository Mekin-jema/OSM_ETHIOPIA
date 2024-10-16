import express from "express";
import { testUser } from "../controllers/user.controllers.js";

const route = express.Router();
route.get("/test", testUser);

export default route;
