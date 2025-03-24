import React, { useState, useEffect } from "react";
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import { Link, useParams, useNavigate } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import { Home, Save, Settings, Play, Eye, Download, Share2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import useSaveProjectOnExit from "./useSaveProjectOnExit";

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

  // Auto-save timer
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/projects/getproject/${projectId}`);
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
  
  // Set up auto-save
  useEffect(() => {
    if (isEdited && autoUpdate) {
      // Clear any existing timer
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
      
      // Set a new timer
      const timer = setTimeout(() => {
        handleSave();
      }, 3000); // Auto-save after 3 seconds of inactivity
      
      setAutoSaveTimer(timer);
    }
    
    // Clean up on unmount
    return () => {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
    };
  }, [html, css, js, isEdited, autoUpdate]);

  // Mark as edited when code changes
  useEffect(() => {
    if (project) {
      if (html !== project.html || css !== project.css || js !== project.js) {
        setIsEdited(true);
      }
    }
  }, [html, css, js, project]);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Make the API call to save project content
      const response = await fetch(`http://localhost:3000/api/projects/edit-content/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ html, css, js })
      });
      
      if (!response.ok) {
        throw new Error("Error saving project");
      }
      
      // Optionally update the local project state with the new content
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
  

  const handleDownload = () => {
    // Create HTML file content
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
    
    // Create download link
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
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
            to="/" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Home"
          >
            <Home className="h-5 w-5" />
          </Link>
          
          <div className="h-6 border-r border-border"></div>
          
          <h1 className="text-lg font-medium truncate max-w-[200px] sm:max-w-sm">
            {projectName}
            {isEdited && !isSaving && (
              <span className="ml-2 text-xs text-muted-foreground">(unsaved)</span>
            )}
          </h1>
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
              disabled={isSaving || !isEdited}
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




