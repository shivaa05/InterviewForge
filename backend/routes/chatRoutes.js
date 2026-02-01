import express from "express";
import { getStreamToken } from "../controllers/chatController.js";
import isAuth from "../middlewares/isAuth.js";

const chatRouter = express.Router();

chatRouter.get("/token", isAuth, getStreamToken);

export default chatRouter;
