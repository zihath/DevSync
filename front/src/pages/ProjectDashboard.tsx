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
import Preview from "@/PenCodeEditor/Preview";

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
        const response = await fetch("https://devsync-taek.onrender.com/api/projects/all");
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
      const response = await fetch('https://devsync-taek.onrender.com/api/projects/create', {
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
        <a
          href="/"
          className="text-white font-bold text-xl flex items-center"
        >
          <span className="text-primary mr-2">&lt;</span>
          DevSync
          <span className="text-primary ml-1">/&gt;</span>
        </a>
          <h1 className="text-2xl font-bold">Project</h1>
          
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
                   <Preview html={project.html} css={project.css} js={project.js} />
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
                            const response = await fetch(`https://devsync-taek.onrender.com/api/projects/delete-project/${project._id}`, {
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
                          const response = await fetch(`https://devsync-taek.onrender.com/api/projects/delete-project/${project._id}`, {
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
