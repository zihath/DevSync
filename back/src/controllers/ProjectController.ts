import { Request, Response } from "express";
import Project from "../models/Project";
import User from "../models/User";


export const createProject = async (req: Request, res: Response): Promise<any> => {
  try {
    const { projectName, createdBy } = req.body;

    if (!projectName || !createdBy) {
      return res.status(400).json({ message: "Project name and clerkId are required" });
    }

    const user = await User.findOne({clerkId : createdBy});

    if(!user){
        return res
        .status(404)
        .json({success : false , message : "User not found in user collection"});
    }
    const newProject = new Project({ 
        projectName, 
        clerkId : user._id,
    });

    await newProject.save();

    user.projectsCreated.push(newProject._id);
    await user.save();

    res.status(201).json({
        success : true,
        message : "project created successfully",
        project : newProject,
    });
  } catch (error) {
    console.error("error creating project" , error);

    res.status(500).json({  success: false, message: "Internal Server Error"});
  }
};

export const editProjectContent = async (req: Request, res: Response): Promise<any> => {
    try {
      const { projectId } = req.params;
      const { html, css, js } = req.body;
  
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { html, css, js, lastEditedTime: Date.now() },
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


  export const editProjectName = async (req: Request, res: Response): Promise<any> => {
    try {
      const { projectId } = req.params;
      const { projectName } = req.body;
  
      if (!projectName) {
        return res.status(400).json({ message: "Project name is required" });
      }
  
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { projectName, lastEditedTime: Date.now() },
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

  export const getAllProjects = async (req: Request, res: Response): Promise<any> => {
    try {
      const projects = await Project.find().populate("clerkId", "username email");
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  
  
  export const getProjectsByUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const { clerkId } = req.params;
      const projects = await Project.find({ clerkId }).populate("clerkId", "username email");
  
      if (!projects.length) {
        return res.status(404).json({ message: "No projects found for this user" });
      }
  
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  
