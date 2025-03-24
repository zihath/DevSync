import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Preview from "@/PenCodeEditor/Preview";
import { Plus, Code, Search, X, Save } from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Mock user ID until auth is implemented
  const createdBy = useSelector((state) => state.user._id);

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
      toast.error("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle project creation


const handleCreateProject = async (e) => {
  e.preventDefault();
  setIsCreating(true);

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
      toast.error(`Error creating project: ${errorData.message}`);
      return;
    }

    const data = await response.json();

    // Update the list with the new project returned from the API
    setProjects([...projects, data.project]);
    setProjectName("");
    setShowForm(false);

    // Show success toast
    toast.success("Project created successfully!");
  } catch (error) {
    console.error("Error creating project", error);
    toast.error("Failed to create project");
  } finally {
    setIsCreating(false);
  }
};


  // Filter projects based on search query
  const filteredProjects = projects.filter(project => 
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <header className="mb-12">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-gradient">CodePen</span> Projects
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl text-center">
              Create, explore, and share front-end code snippets.
            </p>
          </div>
        </header>
        
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            )}
          </div>
          
          <button
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-all duration-300 hover-lift shadow-md"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showForm ? "Cancel" : "New Project"}
          </button>
        </div>

        {showForm && (
          <div className="mb-8 animate-fade-up">
            <form onSubmit={handleCreateProject} className="glass-effect p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="flex-grow px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all duration-300 disabled:opacity-70"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Create
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium">No projects found</h3>
            <p className="text-muted-foreground mt-2">
              {searchQuery 
                ? "Try a different search term" 
                : "Create your first project to get started!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link
                to={`/project-editor/${project._id}`}
                key={project._id}
                className="hover-glow hover-lift rounded-lg overflow-hidden bg-card border border-border transition-all duration-300 flex flex-col h-64"
              >
                {/* Preview Section */}
                <div className="flex-grow bg-white overflow-hidden relative">
                  <Preview
                    html={project.html || ""}
                    css={project.css || ""}
                    js={project.js || ""}
                    heightClass="h-full"
                  />
                </div>
                
                {/* Project Info */}
                <div className="p-4 bg-card">
                  <h2 className="text-lg font-medium truncate">{project.projectName}</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    by {project.createdBy?.username || "Anonymous"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDashboard;



// import React, { useState, useEffect } from "react";

// import { Link } from "react-router-dom";
// import Preview from "@/PenCodeEditor/Preview";


// const ProjectDashboard = () => {
//   const [projects, setProjects] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [projectName, setProjectName] = useState("");


//   const fetchProjects = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/projects/all");
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Error fetching projects:", errorData);
//         return;
//       }
  
//       const data = await response.json();
//       setProjects(data);
//     } catch (error) {
//       console.error("Error fetching projects", error);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);


//   const createdBy = useSelector((state) => state.user._id);
//   console.log("userid" , createdBy);
//   if(!createdBy){
//   console.error("error fetching clerkId from redux store in dashboard");
//   }
//   // Handle project creation
//   const handleCreateProject = async (e) => {
//     e.preventDefault();


//     try {
//       const response = await fetch("http://localhost:3000/api/projects/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ projectName, createdBy }),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Error creating project:", errorData.message);
//         return;
//       }
  
//       const data = await response.json();
//       // Update the list with the new project returned from the API
//       setProjects([...projects, data.project]);
//       setProjectName("");
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error creating project", error);
//     }

//     setProjectName("");
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen text-white">
//       <h1 className="text-3xl font-bold mb-6 text-center">Project Dashboard</h1>
      
//       <div className="flex justify-center mb-6">
//         <button
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "Cancel" : "Create Project"}
//         </button>
//       </div>

//       {showForm && (
//         <form onSubmit={handleCreateProject} className="mb-6 flex justify-center space-x-4">
//           <input
//             type="text"
//             placeholder="Project Name"
//             value={projectName}
//             onChange={(e) => setProjectName(e.target.value)}
//             className="px-4 py-2 rounded-lg border border-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
//           >
//             Submit
//           </button>
//         </form>
//       )}

//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {projects.map((project) => (
//           <Link
//             to={`/project-editor/${project._id}`}
//             key={project._id}
//             className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
//           >
//             {/* Card Content */}
//             <div className="flex flex-col h-full">
//               {/* The live preview area */}
//               <div className="flex-1">
//                 <Preview
//                   html={project.html || ""}
//                   css={project.css || ""}
//                   js={project.js || ""}
//                   heightClass="h-40"
//                 />
//               </div>

//               {/* Project info area */}
//               <div className="p-1">
//               <h2 className="text-xl font-semibold mb-1 text-white">
//                 {project.projectName}
//               </h2>
//               <p className="text-gray-400">
//                 {project.createdBy?.username || "Unknown"}
//               </p>
//             </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectDashboard;
