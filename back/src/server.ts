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

const allowedOrigins = [
  "http://localhost:5173",
  "https://devsync-frontend-c92n.onrender.com",
  "https://dev-sync-psi.vercel.app",
  "https://dev-sync-3aoiiv655-zihaths-projects.vercel.app",
  "https://dev-sync-git-main-zihaths-projects.vercel.app",
  "https://dev-sync-669vhb06q-zihaths-projects.vercel.app",
];

app.use(
  cors({
    // origin: "http://localhost:5173", // development env
//     origin: process.env.CLIENT_URL, // productino env
      origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
