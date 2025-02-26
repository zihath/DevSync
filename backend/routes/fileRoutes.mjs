import express from "express";
import Files from "../models/Files.mjs";
// import clearAuthmiddlleware from "../middlewares/clearAuthmiddlleware.mjs";

const router = express.Router();

// router.use(clearAuthmiddlleware);

router.get("/files", async (req, res) => {
  try {
    const { ownerId } = req.query; // Get ownerId from query params

    if (!ownerId) {
      return res.status(400).json({ error: "ownerId is required" });
    }

    const files = await Files.find({ ownerId });

    if (files.length === 0) {
      return res.status(404).json({ error: "No files found for this ownerId" });
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


router.patch("/files/:add-collab" , async(req , res) => {
  try{
    const {fileId , collabId , collabRole} = req.body;

    if(!fileId || !collabId || !collabRole){
      return res.status(400).json({message : "All fileds are required"});
    }

    const file = await Files.findOne({_id : fileId});

    if(!file){
      return res.status(404).json({message : "File not found"});
    }

    const existingCollaborator = file.collaborators.find(collab => collab.userId === collabId);

    if (existingCollaborator) {
      return res.status(400).json({ message: "User is already a collaborator" });
    }

    file.collaborators.push({userId , role});

    await file.save();

    res.status(200).json({message : "Collaboratore added successfully"});

  }

  catch(error){
    console.log(error);
    res.status(500).json({message : "Internal server error"})
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
    res.status(500).json({ error: "Error deleting file", details: error.message });
  }
});



export default router;
