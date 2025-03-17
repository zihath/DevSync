import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
   _id: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  projectName: string;
  html: string;
  css: string;
  js: string;
  createdTime: Date;
  lastEditedTime: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
    projectName: { type: String, required: true },
    html: { type: String, default: "" },
    css: { type: String, default: "" },
    js: { type: String, default: "" },
  },
  { timestamps: { createdAt: "createdTime", updatedAt: "lastEditedTime" } }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
