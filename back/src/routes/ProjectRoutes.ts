import express from "express";
import { 
    createProject ,
    editProjectContent,
    editProjectName,
    getAllProjects,
    getProjectsByUser
} from "../controllers/ProjectController";


const router = express.Router();

router.post("/create", createProject);
router.put("/edit-content/:projectId", editProjectContent);
router.put("/edit-name/:projectId", editProjectName);
router.get("/all", getAllProjects);
router.get("/user/:clerkId", getProjectsByUser);

export default router;
