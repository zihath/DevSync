import express from "express";
import { createUser, getUser } from "../controllers/userController";
import { requireAuth } from "@clerk/express";
const router = express.Router();

// so basically this is a middleware that is used to authenticate the user
// this middleware will attach the user object to the request

router.get("/", requireAuth(), getUser);
router.post("/create-user", requireAuth(), createUser);

export default router;
