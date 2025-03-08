import express from "express";
import Files from "../models/Files.mjs";
// import clearAuthmiddlleware from "../middlewares/clearAuthmiddlleware.mjs";

import { clerkClient } from "@clerk/clerk-sdk-node";

const router = express.Router();

// router.use(clearAuthmiddlleware);

router.get("/files", async (req, res) => {
  try {
    const { ownerId } = req.query; // Get ownerId from query params

    if (!ownerId) {
      return res.status(200).json({ message: "No files available" });
    }

    // Fetch files where the user is either the owner or a collaborator
    const files = await Files.find({
      $or: [
        { ownerId }, // User is the owner
        { "collaborators.userId": ownerId }, // User is a collaborator
      ],
    });

    if (files.length === 0) {
      return res.status(200).json({ message: "No files available" });
    }

    res.status(200).json(files);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "Error retrieving files", details: error.message });
  }
});

router.post("/files", async (req, res) => {
  try {
    const { ownerId, name, language } = req.body;
    const newFile = new Files({ ownerId, name, language });
    await newFile.save();
    res.status(201).json({ message: "File saved successfully", file: newFile });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "Error saving file", details: error.message });
  }
});

router.put("/files/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    const { name, language } = req.body;

    const updatedFile = await Files.findByIdAndUpdate(
      fileId,
      { name, language },
      { new: true }
    );

    if (!updatedFile) {
      return res.status(404).json({ error: "File not found" });
    }

    res
      .status(200)
      .json({ message: "File updated successfully", file: updatedFile });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "Error updating file", details: error.message });
  }
});

router.patch("/files/join", async (req, res) => {
  const { fileId, userId } = req.body;

  if (!fileId || !userId) {
    return res
      .status(400)
      .json({ message: "File ID and User ID are required" });
  }

  try {
    const file = await Files.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    file.collaborators.push({ userId, role: "editor" });

    await file.save();

    return res
      .status(200)
      .json({ message: "Joined successfully as a collaborator" });
  } catch (error) {
    console.error("Error joining as collaborator:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/files/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    const deletedFile = await Files.findByIdAndDelete(fileId);

    if (!deletedFile) {
      return res.status(404).json({ error: "File not found" });
    }

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "Error deleting file", details: error.message });
  }
});

export default router;
