import React, { useState, useEffect } from "react";
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import { Link, useParams, useNavigate } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import { Home, ArrowLeft, Save, Settings, Play, Eye, Download, Share2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const ProjectEditor = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [projectName, setProjectName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [isEdited, setIsEdited] = useState(false);

  // New state for saving project name
  const [isSavingName, setIsSavingName] = useState(false);
  const [isNameEdited, setIsNameEdited] = useState(false);
  const [autoSaveNameTimer, setAutoSaveNameTimer] = useState(null);

  // Auto-save timer for code content
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);

  // Hypothetical current user; in your real app this should come from your auth context or props.
  const currentUserId = useSelector((state) => state.user._id);

  // Determine if the current user is the owner of the project
  // console.log(currentUserId);
  // if(project){
  //   console.log(project.createdBy._id.toString());
  // }
  
  const isOwner = project?.createdBy?._id?.toString() === currentUserId;


  // console.log(isOwner);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`https://devsync-taek.onrender.com/api/projects/getproject/${projectId}`);
        if (!response.ok) throw new Error("Project not found");
        const data = await response.json();
  
        setProject(data);
        setHtml(data.html || "");
        setCss(data.css || "");
        setJs(data.js || "");
        setProjectName(data.projectName || "Untitled");
      } catch (error) {
        console.error(error);
        toast.error("Failed to load project");
      }
    };
  
    fetchProject();
  }, [projectId]);
  
  // Auto-save for code content
  useEffect(() => {
    if (isEdited && autoUpdate && isOwner) {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
      const timer = setTimeout(() => {
        handleSave();
      }, 3000);
      
      setAutoSaveTimer(timer);
    }
    
    return () => {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
    };
  }, [html, css, js, isEdited, autoUpdate, isOwner]);

  // Mark as edited when code changes
  useEffect(() => {
    if (project) {
      if (html !== project.html || css !== project.css || js !== project.js) {
        setIsEdited(true);
      }
    }
  }, [html, css, js, project]);

  // Mark project name as edited if it changes
  useEffect(() => {
    if (project && projectName !== project.projectName) {
      setIsNameEdited(true);
    }
  }, [projectName, project]);

  // Auto-save for project name changes
  useEffect(() => {
    if (isNameEdited && isOwner) {
      if (autoSaveNameTimer) clearTimeout(autoSaveNameTimer);
      const timer = setTimeout(() => {
        handleSaveProjectName();
      }, 3000);
      setAutoSaveNameTimer(timer);
    }
    return () => {
      if (autoSaveNameTimer) clearTimeout(autoSaveNameTimer);
    };
  }, [projectName, isNameEdited, isOwner]);

  const handleSave = async () => {
    if (!isOwner) {
      toast.error("Only the project owner can save changes");
      return;
    }
    setIsSaving(true);
    
    try {
      const response = await fetch(`https://devsync-taek.onrender.com/api/projects/edit-content/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ html, css, js })
      });
      
      if (!response.ok) {
        throw new Error("Error saving project");
      }
      
      if (project) {
        setProject({
          ...project,
          html,
          css,
          js
        });
      }
      
      setIsEdited(false);
      toast.success("Project saved successfully");
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveProjectName = async () => {
    if (!isOwner) {
      toast.error("Only the project owner can save changes");
      return;
    }
    setIsSavingName(true);
    try {
      const response = await fetch(`https://devsync-taek.onrender.com/api/projects/edit-name/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ projectName })
      });
      if (!response.ok) {
        throw new Error("Error saving project name");
      }
      const data = await response.json();
      setProject(data);
      setIsNameEdited(false);
      toast.success("Project name saved successfully");
    } catch (error) {
      console.error("Error saving project name:", error);
      toast.error("Failed to save project name");
    } finally {
      setIsSavingName(false);
    }
  };
  
  const handleDownload = () => {
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${projectName}</title>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
      </html>
    `.trim();
    
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
    
    toast.success("Project downloaded successfully");
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      {/* Header Section */}
      <header className="bg-card border-b border-border h-14 flex items-center justify-between px-4 shadow-sm z-10">
        <div className="flex items-center space-x-4">
          <Link 
            to="/project-dashboard" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Home"
          >
            <Home className="h-5 w-5" />
          </Link>
          
          <div className="h-6 border-r border-border"></div>
          
          {/* Editable Project Name */}
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="text-lg font-medium truncate max-w-[200px] sm:max-w-sm bg-transparent border-none focus:outline-none"
          />
          {isNameEdited && !isSavingName && (
            <span className="ml-2 text-xs text-muted-foreground">(unsaved)</span>
          )}
          {isSavingName && (
            <span className="ml-2 text-xs text-muted-foreground">Saving...</span>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex gap-1">
            <button 
              onClick={() => setAutoUpdate(!autoUpdate)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                autoUpdate 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
              title={autoUpdate ? "Disable auto-updates" : "Enable auto-updates"}
            >
              <Play className="h-3 w-3" />
              {autoUpdate ? "Auto" : "Manual"}
            </button>
            
            <button 
              onClick={handleSave}
              disabled={!isOwner || isSaving || !isEdited}
              className="px-3 py-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded text-xs font-medium transition-colors flex items-center gap-1 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-3 w-3" />
                  Save
                </>
              )}
            </button>
          </div>
          
          <div className="hidden sm:flex items-center space-x-3">
            <button 
              onClick={handleDownload}
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Download"
            >
              <Download className="h-4 w-4" />
            </button>
            
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
            
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content (Resizable Panels) */}
      <div className="flex-grow overflow-hidden">
        <ResizablePanelGroup direction="vertical" className="h-full">
          {/* Top panel: Horizontal resizable group for three editors */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel defaultSize={33} minSize={15}>
                <CodeEditor language="html" value={html} onChange={setHtml} />
              </ResizablePanel>
              <ResizableHandle className="w-[2px] bg-border" />
              <ResizablePanel defaultSize={34} minSize={15}>
                <CodeEditor language="css" value={css} onChange={setCss} />
              </ResizablePanel>
              <ResizableHandle className="w-[2px] bg-border" />
              <ResizablePanel defaultSize={33} minSize={15}>
                <CodeEditor language="js" value={js} onChange={setJs} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle className="h-[2px] bg-border" />
          {/* Bottom panel: Preview */}
          <ResizablePanel defaultSize={40} minSize={20}>
            <div className="h-full relative">
              <div className="absolute top-2 right-2 z-10 bg-card rounded-full px-3 py-1 text-xs font-medium shadow-md flex items-center gap-1 overflow-hidden">
                <Eye className="h-3 w-3" />
                Preview
              </div>
              <Preview html={html} css={css} js={js} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ProjectEditor;
