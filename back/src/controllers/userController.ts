import { Request, Response } from "express";
import User, { IUser } from "../models/User";

export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { clerkId, username, email } = req.body;
    let user: IUser | null = await User.findOne({ clerkId });

    if (user) {
      return res.status(200).json({ message: "User already exists", user });
    }

    user = new User({
      clerkId,
      username,
      email,
      joinedRooms: [],
      createdRooms: [],
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error saving user", details: error.message });
  }
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { clerkId } = req.params;
    const user = await User.findOne({ clerkId });

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error fetching user", details: error.message });
  }
};
