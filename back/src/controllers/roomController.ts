import { Request, Response } from "express";
import crypto from "crypto";
import liveblocks from "../liveblocks";
import Room from "../models/Room";
import User from "../models/User";

export const createRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const { fileName, language, createdBy } = req.body;
    if (!fileName || !language || !createdBy) {
      res.status(400).json({
        success: false,
        message: "File name, language and createdBy are required",
      });
      return;
    }
    const user = await User.findById(createdBy);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const roomId = crypto.randomUUID();

    // Create a Liveblocks room with proper access controls
    // close mode means admin can edit others can view
    await liveblocks.createRoom(roomId, {
      defaultAccesses: ["room:write"],
      usersAccesses: {
        [user._id.toString()]: ["room:write"],
      },
    });

    const newRoom = new Room({
      roomId,
      fileName,
      language,
      createdBy: user._id,
      participants: [user._id],
    });

    await newRoom.save();
    user.createdRooms.push(newRoom._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      room: newRoom,
    });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const joinRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const { roomId, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    if (!roomId) {
      res
        .status(400)
        .json({ success: false, message: "Room ID and role are required" });
      return;
    }

    const room = await Room.findOne({ roomId });
    if (!room) {
      res.status(404).json({ success: false, message: "Room not found" });
      return;
    }

    // This is optional as of now, but don't delete.
    // Update Liveblocks permissions

    await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [user._id.toString()]: ["room:write"],
      },
    });

    // Check if the user is already a participant
    const existingParticipant = room.participants.find((p) =>
      p.equals(user._id)
    );

    if (!existingParticipant) {
      // Add new participant
      room.participants.push(user._id);

      // Add to user's joinedRooms if not already there
      if (!user.joinedRooms.some((id) => id.equals(room._id))) {
        user.joinedRooms.push(room._id);
      }
    } else {
      room.participants = room.participants.map((p) =>
        p.equals(user._id) ? user._id : p
      );
    }

    await room.save();
    await user.save();

    res.status(200).json({
      success: true,
      message: `Joined room`,
      room,
    });
  } catch (error) {
    console.error("Error joining room:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, roomId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    if (!roomId) {
      res.status(400).json({ success: false, message: "Room ID is required" });
      return;
    }

    const room = await Room.findOne({ roomId });
    if (!room) {
      res.status(404).json({ success: false, message: "Room not found" });
      return;
    }

    if (!room.createdBy.equals(user._id)) {
      res.status(403).json({
        success: false,
        message: "Only the creator can delete the room",
      });
      return;
    }

    // Delete room from Liveblocks
    await liveblocks.deleteRoom(roomId);

    // Update all users who have joined this room
    await User.updateMany(
      { joinedRooms: room._id }, // Find users who have this room in their joinedRooms array
      { $pull: { joinedRooms: room._id } } // Remove the room._id from their joinedRooms array
    );

    // Update the creator's createdRooms
    user.createdRooms = user.createdRooms.filter((id) => !id.equals(room._id));
    await user.save();

    // Delete the room from the database
    await Room.findByIdAndDelete(room._id);

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
