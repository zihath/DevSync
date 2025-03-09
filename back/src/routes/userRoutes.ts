import express from "express";
import { createUser, getUser } from "../controllers/userController";

const router = express.Router();

router.post("/create-user", createUser);
router.get("/:clerkId", getUser);

export default router;
