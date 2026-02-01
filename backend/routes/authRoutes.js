import express from "express";
import {
  getCurrentUser,
  signin,
  signout,
  signup,
} from "../controllers/authController.js";
import isAuth from "../middlewares/isAuth.js";

const authRouter = express.Router();

authRouter.post("/signin", signin);
authRouter.post("/signup", signup);
authRouter.get("/signout", signout);
authRouter.get("/current-user", isAuth, getCurrentUser);

export default authRouter;
