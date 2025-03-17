import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");

  // Replace this with your actual user id or retrieve it from context/auth state
//   const user = useSelector((state) => state.user); 
//   console.log("user from dashboard" , user);
 

  // Fetch all projects from the API
  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/projects/all");
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching projects:", errorData);
        return;
      }
  
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);


  const createdBy = useSelector((state) => state.user._id);
  console.log("userid" , createdBy);
  if(!createdBy){
  console.error("error fetching clerkId from redux store in dashboard");
  }
  // Handle project creation
  const handleCreateProject = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch("http://localhost:3000/api/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectName, createdBy }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating project:", errorData.message);
        return;
      }
  
      const data = await response.json();
      // Update the list with the new project returned from the API
      setProjects([...projects, data.project]);
      setProjectName("");
      setShowForm(false);
    } catch (error) {
      console.error("Error creating project", error);
    }

    setProjectName("");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Project Dashboard</h1>
      
      <div className="flex justify-center mb-6">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Create Project"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateProject} className="mb-6 flex justify-center space-x-4">
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link>
            <div key={project._id} className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-2 text-white">{project.projectName}</h2>
              <p className="text-gray-400">
                Created By: {project.createdBy?.username || "Unknown"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectDashboard;
