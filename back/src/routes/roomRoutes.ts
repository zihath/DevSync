import express from "express";
import {
  createRoom,
  joinRoom,
  deleteRoom,
  getCreatedRooms,
  getJoinedRooms,
} from "../controllers/roomController";

const router = express.Router();

router.post("/create-room", createRoom);

router.post("/join-room", joinRoom);

router.delete("/delete-room/:roomId", deleteRoom);

router.get("/created-rooms/:userId", getCreatedRooms);

router.get("/joined-rooms/:userId", getJoinedRooms);

export default router;
