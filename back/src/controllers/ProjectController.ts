import { Request, Response } from "express";
import Project from "../models/Project";
import User from "../models/User";

// Create a new project
export const createProject = async (req: Request, res: Response): Promise<any> => {
  try {
    const { projectName, createdBy } = req.body;

    if (!projectName || !createdBy) {
      return res
        .status(400)
        .json({ message: "Project name and createdBy are required" });
    }

    // Find user by their id (assuming createdBy is the user's _id)
    const user = await User.findById(createdBy);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found in user collection" });
    }

    // Create project with the correct field name: createdBy
    const newProject = new Project({
      projectName,
      createdBy: user._id,
    });

    await newProject.save();

    // Update the user's projectsCreated array if that field exists on the user schema
    if (user.projectsCreated) {
      user.projectsCreated.push(newProject._id);
      await user.save();
    }

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
