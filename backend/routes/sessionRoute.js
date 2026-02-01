import express from "express";
import {
  createSession,
  endSession,
  getActiveSessions,
  getMyRecentSessions,
  getSessionById,
  joinSession,
} from "../controllers/sessionController.js";
import isAuth from "../middlewares/isAuth.js";

const sessionRouter = express.Router();

sessionRouter.post("/create", isAuth, createSession);
sessionRouter.get("/active", isAuth, getActiveSessions);
sessionRouter.get("/my-recent", isAuth, getMyRecentSessions);

sessionRouter.get("/:id", isAuth, getSessionById);
sessionRouter.post("/:id/join", isAuth, joinSession);
sessionRouter.post("/:id/end", isAuth, endSession);

export default sessionRouter;
