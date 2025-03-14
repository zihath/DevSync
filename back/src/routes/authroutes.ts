import express from "express";
import { Request, Response } from "express";
import liveblocks from "../liveblocks";
import { getAuth, requireAuth } from "@clerk/express";
import User from "../models/User";

const router = express.Router();

router.post(
  "/",
  requireAuth(),
  async (req: Request, res: Response): Promise<any> => {
    try {
      const currentUser = getAuth(req);
      console.log("At api/auth");
      console.log(currentUser);
      const user = await User.findOne({ clerkId: currentUser.userId });
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const roomId =
        req.body.roomId || `room-${Math.random().toString(36).substring(7)}`;
      console.log(roomId);
      const session = liveblocks.prepareSession(user._id.toString(), {
        userInfo: {
          name: user.username || "Anonymous",
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        },
      });
      console.log(session);
      session.allow(roomId, session.FULL_ACCESS);
      console.log("session.allow");
      const { body, status } = await session.authorize();
      console.log("session.authorize");
      console.log(body);
      res.status(status).json(body);
    } catch (error) {
      console.error("Error creating session:", error);
      return res.status(500).json({ message: "Error creating session" });
    }
  }
);

export default router;
