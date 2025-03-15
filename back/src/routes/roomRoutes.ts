import express from "express";
import {
  createRoom,
  joinRoom,
  deleteRoom,
} from "../controllers/roomController";

const router = express.Router();

router.post("/create-room", createRoom);

router.post("/join-room", joinRoom);

router.delete("/delete-room", deleteRoom);

export default router;
