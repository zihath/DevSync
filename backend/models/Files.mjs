import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  ownerId: { type: String, required: true }, // Clerk User ID
  name: { type: String, required: true },
  language: { type: String, required: true },
  collaborators: [
    {
      userId: { type: String, ref: 'User', required: true },
      role: { type: String, enum: ['editor', 'viewer'], default: 'editor' }
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

const Files = mongoose.model("StoreFiles", fileSchema);
export default Files;