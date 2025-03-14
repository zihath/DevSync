import { Request, Response } from "express";
import Room from "../models/Room";
import User from "../models/User";
import crypto from "crypto";
import liveblocks from "../liveblocks";

export const createRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    // console.log("At create-room api endpoint");
    const { fileName, language, createdBy } = req.body;
    // console.log(fileName);
    // console.log(language);
    // console.log(createdBy);

    if (!fileName || !language || !createdBy) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findById(createdBy);

    // console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const roomId = crypto.randomUUID();

    // await liveblocks.createRoom(roomId, {
    //   defaultAccesses: ["room:read"],
    //   usersAccesses: [
    //     [user._id] : ["room:read", "room:write"]
    //   ],
    // });

    const newRoom = new Room({
      roomId,
      fileName,
      language,
      createdBy: user._id,
    });
    await newRoom.save();

    user.createdRooms.push(newRoom._id);
    await user.save();
    console.log("reached here");
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

    if (!roomId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Room ID and User ID are required" });
    }

    const room = await Room.findOne({ roomId });
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!room.participants.includes(user._id)) {
      room.participants.push(user._id);
      await room.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Joined room successfully", room });
  } catch (error) {
    console.error("Error joining room:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const { roomId } = req.body;
    // const { roomId } = req.params;
    const deletedRoom = await Room.findOneAndDelete({ roomId });

    if (!deletedRoom) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }
    try {
      await liveblocks.deleteRoom(roomId);
    } catch (liveblocksError) {
      console.error("Liveblocks error:", liveblocksError);
      return res.status(500).json({
        success: false,
        message: "Failed to delete room from Liveblocks",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
