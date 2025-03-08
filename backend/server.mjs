import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import fileRoutes from "./routes/fileRoutes.mjs";
import clearAuthmiddlleware from "./middlewares/clearAuthmiddlleware.mjs";
import "dotenv/config";

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the correct .env file inside the backend folder
dotenv.config({ path: path.join(__dirname, ".env") });

const port = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send(users);
});

app.use(clearAuthmiddlleware);

app.use("/api", fileRoutes);

// app.use("/api/liveblocks-auth" , liveblocksroutes);

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
