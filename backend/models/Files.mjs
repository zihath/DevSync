import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  ownerId: { type: String, required: true }, // Clerk User ID
  name: { type: String, required: true },
  content: { type: String, required: true },
  language: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Files = mongoose.model("StoreFiles", fileSchema);
export default Files;
