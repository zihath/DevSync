import { Request, Response } from "express";
import Project from "../models/Project";
import User from "../models/User";

// Create a new project
export const createProject = async (req: Request, res: Response): Promise<any> => {
  try {
    const { projectName, createdBy , html , css , js} = req.body;

    if (!projectName || !createdBy) {
      console.log({ message: "Project name and createdBy are required" });
      return res
        .status(400)
        .json({ message: "Project name and createdBy are required" });
        
    }

    // Find user by their id (assuming createdBy is the user's _id)
    const user = await User.findById(createdBy);
    if (!user) {
      console.log({ message: "User not found in user collection" });
      return res
        .status(404)
        .json({ success: false, message: "User not found in user collection" });
    }
    // console.log("from backend" , user);

    // Create project with the correct field name: createdBy
    const newProject = new Project({
      projectName,
      createdBy: user._id,
      html,
      css,
      js,
    });

    // console.log("s1");
    await newProject.save();

    // console.log("s2");
    // Update the user's projectsCreated array if that field exists on the user schema
    // if (user.projectsCreated) {
    //   user.projectsCreated.push(newProject._id);
    //   await user.save();
    // }

    user.projectsCreated.push(newProject._id);
    // console.log("s3");
    await user.save();
    // console.log("s4");
    

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Edit the content of a project (html, css, js)
export const editProjectContent = async (req: Request, res: Response): Promise<any> => {
  try {
    const { projectId } = req.params;
    const { html, css, js } = req.body;

    // Update the project's content; the timestamps option will update lastEditedTime automatically.
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { html, css, js },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Edit the project's name
export const editProjectName = async (req: Request, res: Response): Promise<any> => {
  try {
    const { projectId } = req.params;
    const { projectName } = req.body;

    if (!projectName) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { projectName },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all projects and populate the createdBy field with the user's username and email
export const getAllProjects = async (req: Request, res: Response): Promise<any> => {
  try {
    const projects = await Project.find().populate("createdBy", "username email");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get projects for a specific user (by user id)
// Here, the route param is renamed to userId for clarity.
export const getProjectsByUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params;
    const projects = await Project.find({ createdBy: userId }).populate("createdBy", "username email");

    if (!projects.length) {
      return res.status(404).json({ message: "No projects found for this user" });
    }

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const getProjectById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { projectId } = req.params; // Extract _id from URL params
    // console.log(projectId);
    const project = await Project.findById(projectId).populate("createdBy", "username email");
    // console.log("r1");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    // console.log("r2");
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};



export const deleteProject = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    // Assume current user's ID is sent in the request body.
    // In a real-world scenario, this might come from req.user if using authentication middleware.
    const { currentUserId } = req.body;
    
    if (!currentUserId) {
      return res.status(401).json({ success: false, message: "Unauthorized: User ID required" });
    }

    // Find the project by its ID
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // Check if the current user is the owner of the project
    if (project.createdBy.toString() !== currentUserId.toString()) {
      return res.status(403).json({ success: false, message: "Forbidden: You are not the owner of this project" });
    }

    // Delete the project
    await Project.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};