import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import roomRoutes from "./routes/roomRoutes";
import ProjectRoutes from "./routes/ProjectRoutes";
import { clerkMiddleware } from "@clerk/express";
import authRoutes from "./routes/authroutes";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
// when we are sending request from frontend to backend we need to allow cors
// we should mention the origin port and credentials as true because we are using cookies.
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
// app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/projects", ProjectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
