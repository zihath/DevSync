import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  clerkId: string;
  username: string;
  email: string;
  joinedRooms: mongoose.Types.ObjectId[];
  createdRooms: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  joinedRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  createdRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
});

export default mongoose.model<IUser>("User", UserSchema);
