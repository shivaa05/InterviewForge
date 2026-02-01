import express from "express";
import dotenv from "dotenv";
import connectDb from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import sessionRouter from "./routes/sessionRoute.js";
import chatRouter from "./routes/chatRoutes.js";
dotenv.config();
connectDb();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3001;

app.use("/api/auth", authRouter);
app.use("/api/session", sessionRouter);
app.use("/api/chat", chatRouter);

app.listen(PORT, () => {
  console.log("Server is running on Port:", PORT);
});
