import express from "express";
const { Liveblocks } = require("@liveblocks/node");

const router = express.Router();
const API_KEY = process.env.LIVEBLOCKS_SECRET_KEY;
const liveblocks = new Liveblocks({ secret: API_KEY });

// Route for Liveblocks authentication
router.post("/", async (req, res) => {
  try {
    // Get user info from Clerk authentication middleware
    const { userId, sessionClaims } = req.auth;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = {
      id: userId, // Clerk User ID
      info: {
        name: sessionClaims.first_name || "Anonymous",
        color: "#D583F0",
        picture: sessionClaims.image_url || "https://liveblocks.io/avatars/avatar-1.png",
      },
    };

    // Get the room name from the request body
    const { room } = req.body;

    // Create a Liveblocks session
    const session = liveblocks.prepareSession(user.id, {
      userInfo: user.info,
    });

    // Grant full access to the room
    session.allow(room, session.FULL_ACCESS);

    // Authorize the user
    const { body, status } = await session.authorize();
    res.status(status).send(body);
  } catch (error) {
    console.error("Liveblocks Auth Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
