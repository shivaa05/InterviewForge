import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";
import { nanoid } from "nanoid";

export const createSession = async (req, res) => {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.userId;

    if (!problem || !difficulty) {
      return res
        .status(400)
        .json({ message: "Problem and difficulty are required" });
    }

    const callId = nanoid(8);

    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    await streamClient.video.call("default", session.callId).getOrCreate({
      data: {
        created_by: {id:userId},
        custom: {
          problem,
          difficulty,
          sessionId: session._id.toString(),
        },
      },
    });

    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by_id: userId,
      members: [userId],
    });
    await channel.create();

    res.status(201).json({ session });
  } catch (error) {
    console.log("Error in createSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getActiveSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name email _id")
      .populate("participant", "name email _id")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    console.log("Error in getActiveSessions controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyRecentSessions = async (req, res) => {
  try {
    const userId = req.userId;

    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ sessions });
  } catch (error) {
    console.log("Error in getMyRecentSessions controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id)
      .populate("host", "name email")
      .populate("participant", "name email ");

    if (!session) return res.status(404).json({ message: "Session not found" });

    res.status(200).json({ session });
  } catch (error) {
    console.log("Error in getSessionById controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const joinSession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status !== "active") {
      return res
        .status(400)
        .json({ message: "Cannot join a completed session" });
    }

    const isHost = session.host.toString() === userId.toString();
    const isParticipant =
      session.participant &&
      session.participant.toString() === userId.toString();

    if (session.participant && !isHost && !isParticipant) {
      return res.status(409).json({ message: "Session is full" });
    }

    if (!session.participant && !isHost) {
      session.participant = userId;
      await session.save();
    }

    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([userId]);

    res.status(200).json({ session });
  } catch (error) {
    console.log("Error in joinSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const endSession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.host.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Only the host can end the session" });
    }

    if (session.status === "completed") {
      return res.status(400).json({ message: "Session is already completed" });
    }

    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });
    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete();

    session.status = "completed";
    await session.save();

    res.status(200).json({ session, message: "Session ended successfully" });
  } catch (error) {
    console.log("Error in endSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
