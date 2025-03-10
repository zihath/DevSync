import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
  _id: mongoose.Types.ObjectId;
  roomId: string;
  fileName: string;
  language: string;
  createdBy: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  lastModifiedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema(
  {
    roomId: { type: String, required: true, unique: true },
    fileName: { type: String, required: true },
    language: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model<IRoom>("Room", RoomSchema);
