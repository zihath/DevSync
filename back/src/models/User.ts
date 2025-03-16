import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  clerkId: string; // Clerk user ID
  username: string;
  email: string;
  joinedRooms: string[]; // Rooms the user has joined
  createdRooms: string[]; // Rooms the user has created
}

const UserSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  joinedRooms: [{ type: String }],
  createdRooms: [{ type: String }],
});

export default mongoose.model<IUser>("User", UserSchema);
