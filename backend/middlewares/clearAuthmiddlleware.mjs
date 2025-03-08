import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import dotenv from "dotenv";

dotenv.config(); // Ensure Clerk secret key is loaded

export default ClerkExpressRequireAuth(); // Middleware to require authentication
