import express from "express";
import { 
    createProject ,
    editProjectContent,
    editProjectName,
    getAllProjects,
    getProjectsByUser,
    getProjectById,
    deleteProject
} from "../controllers/ProjectController";


const router = express.Router();

router.post("/create", createProject);
router.put("/edit-content/:projectId", editProjectContent);
router.put("/edit-name/:projectId", editProjectName);
router.get("/all", getAllProjects);
router.get("/user/:clerkId", getProjectsByUser);
router.get("/getproject/:projectId", getProjectById);
router.delete("/delete-project/:id" , deleteProject)

export default router;
