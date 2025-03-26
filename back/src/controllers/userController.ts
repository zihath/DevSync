import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { getAuth } from "@clerk/express";

export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    // this userId is the clerkId
    const { userId } = getAuth(req);
    console.log(userId);

    const { username, email } = req.body;
    let user: IUser | null = await User.findOne({ clerkId: userId });

    if (user) {
      const { clerkId, ...userWithoutClerkId } = user.toObject();
      return res
        .status(200)
        .json({ message: "User already exists", user: userWithoutClerkId });
    }

    user = new User({
      clerkId: userId,
      username,
      email,
      joinedRooms: [],
      createdRooms: [],
      projectsCreated:[],
    });

    await user.save();
    const { clerkId, ...userWithoutClerkId } = user.toObject();
    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutClerkId,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error saving user", details: error.message });
  }
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = getAuth(req);
    console.log("At getUser");
    console.log(userId);
    const user = await User.findOne({ clerkId: userId });
    console.log("user", user);
    if (user) {
      const { clerkId, ...userWithoutClerkId } = user?.toObject() || {};
      return res
        .status(200)
        .json({ message: "User found", user: userWithoutClerkId });
    } else {
      return res.status(200).json({ message: "User not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error fetching user", details: error.message });
  }
};
