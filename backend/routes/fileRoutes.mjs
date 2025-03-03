import express from "express";
import Files from "../models/Files.mjs";
// import clearAuthmiddlleware from "../middlewares/clearAuthmiddlleware.mjs";

import { clerkClient } from '@clerk/clerk-sdk-node';

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
    res.status(500).json({ error: "Error retrieving files", details: error.message });
  }
});





// Route to store a file in MongoDB
router.post("/files", async (req, res) => {
  try {
    const { ownerId, name, language } = req.body;
    const newFile = new Files({ ownerId, name, language });
    await newFile.save();
    res.status(201).json({ message: "File saved successfully", file: newFile });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error saving file", details: error.message });
  }
});

router.put("/files/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    const { name, language } = req.body;

    const updatedFile = await Files.findByIdAndUpdate(
      fileId,
      { name,  language },
      { new: true }
    );

    if (!updatedFile) {
      return res.status(404).json({ error: "File not found" });
    }

    res.status(200).json({ message: "File updated successfully", file: updatedFile });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error updating file", details: error.message });
  }
});

router.patch("/files/join", async (req, res) => {
  const { fileId, userId } = req.body;

  if (!fileId || !userId) {
    return res.status(400).json({ message: "File ID and User ID are required" });
  }

  try {
    // Find the file
    const file = await Files.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Directly add the user ID as a collaborator
    file.collaborators.push({ userId, role: "editor" });

    await file.save();

    return res.status(200).json({ message: "Joined successfully as a collaborator" });
  } catch (error) {
    console.error("Error joining as collaborator:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});




// router.patch("/files/add-collab", async (req, res) => {
//   try {
//     const { fileId, collabEmail, collabRole } = req.body;

//     if (!fileId || !collabEmail || !collabRole) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Find the file in the database
//     const file = await Files.findById(fileId);
//     if (!file) {
//       return res.status(404).json({ message: "File not found" });
//     }

//     try {
//       // Fetch users from Clerk and find the one with the given email
//       const users = await clerkClient.users.getUserList();
//       const foundUser = users.find((user) =>
//         user.emailAddresses.some((emailObj) => emailObj.emailAddress === collabEmail)
//       );

//       if (!foundUser) {
//         return res.status(404).json({ message: "User not found in Clerk" });
//       }

//       const collabUserId = foundUser.id; // Clerk user ID

//       // Check if the user is already a collaborator
//       const existingCollaborator = file.collaborators.some(
//         (collab) => collab.userId === collabUserId
//       );

//       if (existingCollaborator) {
//         return res.status(400).json({ message: "User is already a collaborator" });
//       }

//       // Add collaborator
//       file.collaborators.push({ userId: collabUserId, role: collabRole });
//       await file.save();

//       return res.status(200).json({ message: "Collaborator added successfully" });
//     } catch (error) {
//       console.error("Error checking user in Clerk:", error);
//       return res.status(500).json({ message: "Internal server error while checking user" });
//     }
//   } catch (error) {
//     console.error("Error processing request:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });



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
    res.status(500).json({ error: "Error deleting file", details: error.message });
  }
});



export default router;
