// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Preview from "@/PenCodeEditor/Preview";
// import { Plus, Code, Search, X, Save } from "lucide-react";
// import { toast } from "sonner";

// import { Loader2 } from "lucide-react";
// const ProjectDashboard = () => {
//   const [projects, setProjects] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [projectName, setProjectName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isCreating, setIsCreating] = useState(false);

//   // Mock user ID until auth is implemented
//   const createdBy = useSelector((state) => state.user._id);

//   // Fetch all projects from the API
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
//       toast.error("Failed to load projects");
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   // Handle project creation


// const handleCreateProject = async (e) => {
//   e.preventDefault();
//   setIsCreating(true);

//   try {
//     const response = await fetch("http://localhost:3000/api/projects/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ projectName, createdBy }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("Error creating project:", errorData.message);
//       toast.error(`Error creating project: ${errorData.message}`);
//       return;
//     }

//     const data = await response.json();

//     // Update the list with the new project returned from the API
//     setProjects([...projects, data.project]);
//     setProjectName("");
//     setShowForm(false);

//     // Show success toast
//     toast.success("Project created successfully!");
//   } catch (error) {
//     console.error("Error creating project", error);
//     toast.error("Failed to create project");
//   } finally {
//     setIsCreating(false);
//   }
// };


//   // Filter projects based on search query
//   const filteredProjects = projects.filter(project => 
//     project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
//         <header className="mb-12">
//           <div className="flex flex-col items-center space-y-4">
//             <h1 className="text-4xl font-bold tracking-tight">
//               <span className="text-gradient">CodePen</span> Projects
//             </h1>
//             <p className="text-muted-foreground text-lg max-w-2xl text-center">
//               Create, explore, and share front-end code snippets.
//             </p>
//           </div>
//         </header>
        
//         <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="relative w-full sm:w-96">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <input
//               type="text"
//               placeholder="Search projects..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
//             />
//             {searchQuery && (
//               <button 
//                 onClick={() => setSearchQuery("")}
//                 className="absolute right-3 top-1/2 -translate-y-1/2"
//               >
//                 <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
//               </button>
//             )}
//           </div>
          
//           <button
//             className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-all duration-300 hover-lift shadow-md"
//             onClick={() => setShowForm(!showForm)}
//           >
//             {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
//             {showForm ? "Cancel" : "New Project"}
//           </button>
//         </div>

//         {showForm && (
//           <div className="mb-8 animate-fade-up">
//             <form onSubmit={handleCreateProject} className="glass-effect p-6 rounded-lg">
//               <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <input
//                   type="text"
//                   placeholder="Project Name"
//                   value={projectName}
//                   onChange={(e) => setProjectName(e.target.value)}
//                   className="flex-grow px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   disabled={isCreating}
//                   className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all duration-300 disabled:opacity-70"
//                 >
//                   {isCreating ? (
//                     <>
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                       Creating...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="h-4 w-4" />
//                       Create
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {filteredProjects.length === 0 ? (
//           <div className="text-center py-12">
//             <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//             <h3 className="text-xl font-medium">No projects found</h3>
//             <p className="text-muted-foreground mt-2">
//               {searchQuery 
//                 ? "Try a different search term" 
//                 : "Create your first project to get started!"}
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProjects.map((project) => (
//               <Link
//                 to={`/project-editor/${project._id}`}
//                 key={project._id}
//                 className="hover-glow hover-lift rounded-lg overflow-hidden bg-card border border-border transition-all duration-300 flex flex-col h-64"
//               >
//                 {/* Preview Section */}
//                 <div className="flex-grow bg-white overflow-hidden relative">
//                   <Preview
//                     html={project.html || ""}
//                     css={project.css || ""}
//                     js={project.js || ""}
//                     heightClass="h-full"
//                   />
//                 </div>
                
//                 {/* Project Info */}
//                 <div className="p-4 bg-card">
//                   <h2 className="text-lg font-medium truncate">{project.projectName}</h2>
//                   <p className="text-muted-foreground text-sm mt-1">
//                     by {project.createdBy?.username || "Anonymous"}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectDashboard;



// // import React, { useState, useEffect } from "react";

// // import { Link } from "react-router-dom";
// // import Preview from "@/PenCodeEditor/Preview";


// // const ProjectDashboard = () => {
// //   const [projects, setProjects] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [projectName, setProjectName] = useState("");


// //   const fetchProjects = async () => {
// //     try {
// //       const response = await fetch("http://localhost:3000/api/projects/all");
  
// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         console.error("Error fetching projects:", errorData);
// //         return;
// //       }
  
// //       const data = await response.json();
// //       setProjects(data);
// //     } catch (error) {
// //       console.error("Error fetching projects", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProjects();
// //   }, []);


// //   const createdBy = useSelector((state) => state.user._id);
// //   console.log("userid" , createdBy);
// //   if(!createdBy){
// //   console.error("error fetching clerkId from redux store in dashboard");
// //   }
// //   // Handle project creation
// //   const handleCreateProject = async (e) => {
// //     e.preventDefault();


// //     try {
// //       const response = await fetch("http://localhost:3000/api/projects/create", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ projectName, createdBy }),
// //       });
  
// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         console.error("Error creating project:", errorData.message);
// //         return;
// //       }
  
// //       const data = await response.json();
// //       // Update the list with the new project returned from the API
// //       setProjects([...projects, data.project]);
// //       setProjectName("");
// //       setShowForm(false);
// //     } catch (error) {
// //       console.error("Error creating project", error);
// //     }

// //     setProjectName("");
// //   };

// //   return (
// //     <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen text-white">
// //       <h1 className="text-3xl font-bold mb-6 text-center">Project Dashboard</h1>
      
// //       <div className="flex justify-center mb-6">
// //         <button
// //           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
// //           onClick={() => setShowForm(!showForm)}
// //         >
// //           {showForm ? "Cancel" : "Create Project"}
// //         </button>
// //       </div>

// //       {showForm && (
// //         <form onSubmit={handleCreateProject} className="mb-6 flex justify-center space-x-4">
// //           <input
// //             type="text"
// //             placeholder="Project Name"
// //             value={projectName}
// //             onChange={(e) => setProjectName(e.target.value)}
// //             className="px-4 py-2 rounded-lg border border-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
// //             required
// //           />
// //           <button
// //             type="submit"
// //             className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
// //           >
// //             Submit
// //           </button>
// //         </form>
// //       )}

// //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {projects.map((project) => (
// //           <Link
// //             to={`/project-editor/${project._id}`}
// //             key={project._id}
// //             className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
// //           >
// //             {/* Card Content */}
// //             <div className="flex flex-col h-full">
// //               {/* The live preview area */}
// //               <div className="flex-1">
// //                 <Preview
// //                   html={project.html || ""}
// //                   css={project.css || ""}
// //                   js={project.js || ""}
// //                   heightClass="h-40"
// //                 />
// //               </div>

// //               {/* Project info area */}
// //               <div className="p-1">
// //               <h2 className="text-xl font-semibold mb-1 text-white">
// //                 {project.projectName}
// //               </h2>
// //               <p className="text-gray-400">
// //                 {project.createdBy?.username || "Unknown"}
// //               </p>
// //             </div>
// //             </div>
// //           </Link>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProjectDashboard;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  Plus, 
  Search, 
  Grid2X2, 
  List, 
  MoreHorizontal,
  Folder, 
  Code2, 
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const ProjectDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const currentUserId = useSelector((state) => state.user._id);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/projects/all");
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectName: 'Untitled Project',
          createdBy:currentUserId,
          html: '<div>\n  <h1>Hello World</h1>\n  <p>Start coding here</p>\n</div>',
          css: 'body {\n  font-family: sans-serif;\n  padding: 20px;\n}\n\nh1 {\n  color: #333;\n}',
          js: '// Your JavaScript code here\nconsole.log("Hello from JavaScript!");'
        })
      });

      if (!response.ok) throw new Error('Failed to create project');
      
      const {project} = await response.json();
      toast.success('Project created successfully');
      navigate(`/project-editor/${project._id}`);
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => 
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const ProjectCardSkeleton = () => (
    <Card className="overflow-hidden">
      <div className="h-[120px] bg-muted/50"></div>
      <CardContent className="p-4">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">Projects</h1>
          
          <div className="flex w-full sm:w-auto gap-2 items-center">
            <div className="relative flex-1 sm:flex-initial max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-9 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="hidden sm:flex border border-border rounded-md overflow-hidden">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-secondary' : 'bg-background hover:bg-secondary/50'}`}
              >
                <Grid2X2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-secondary' : 'bg-background hover:bg-secondary/50'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            
            <Button 
              onClick={handleCreateProject}
              disabled={isLoading}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              New
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-4`}>
            {[...Array(8)].map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <Folder className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium">No projects found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try a different search term' : 'Get started by creating a new project'}
            </p>
            {!searchQuery && (
              <Button onClick={handleCreateProject}>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProjects.map((project) => (
              <Card key={project._id} className="overflow-hidden group hover:shadow-md transition-all duration-300 border-border/50">
                <Link to={`/project-editor/${project._id}`} className="block h-[120px] overflow-hidden bg-muted/30 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code2 className="h-10 w-10 text-primary/10 group-hover:text-primary/20 transition-colors" />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link to={`/project-editor/${project._id}`} className="block">
                    <h2 className="font-medium truncate group-hover:text-primary transition-colors">
                      {project.projectName}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(project.lastEditedTime || project.createdTime)}

                    </p>
                  </Link>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    Last edited {formatDate(project.lastEditedTime || project.createdTime)}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => {
                          /* Rename functionality would go here */
                          toast.info("Rename feature coming soon");
                        }}
                      >
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={async () => {
                          try {
                            const response = await fetch(`http://localhost:3000/api/projects/delete-project/${project._id}`, {
                              method: 'DELETE',
                              headers: {
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({ currentUserId })
                            });
                            
                            
                            if (!response.ok) throw new Error('Failed to delete project');
                            
                            setProjects(projects.filter(p => p._id !== project._id));
                            toast.success('Project deleted successfully');
                          } catch (error) {
                            console.error('Error deleting project:', error);
                            toast.error('Failed to delete project');
                          }
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredProjects.map((project) => (
              <div 
                key={project._id} 
                className="flex items-center justify-between p-3 bg-card border border-border/50 rounded-lg hover:shadow-sm group"
              >
                <Link to={`/project-editor/${project._id}`} className="flex items-center flex-1 min-w-0">
                  <div className="h-10 w-10 bg-muted/30 rounded flex items-center justify-center mr-3">
                    <Code2 className="h-5 w-5 text-primary/30" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                      {project.projectName}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Last edited {formatDate(project.lastEditedTime || project.createdTime)}
                    </p>
                  </div>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={() => {
                        /* Rename functionality would go here */
                        toast.info("Rename feature coming soon");
                      }}
                    >
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onClick={async () => {
                        try {
                          const response = await fetch(`http://localhost:3000/api/projects/delete-project/${project._id}`, {
                            method: 'DELETE',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ currentUserId })
                          });
                          
                          if (!response.ok) throw new Error('Failed to delete project');
                          
                          setProjects(projects.filter(p => p._id !== project._id));
                          toast.success('Project deleted successfully');
                        } catch (error) {
                          console.error('Error deleting project:', error);
                          toast.error('Failed to delete project');
                        }
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectDashboard;
