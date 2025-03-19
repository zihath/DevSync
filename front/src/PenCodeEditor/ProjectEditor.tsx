import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState , useEffect } from "react";
import CodeEditor from "./CodeEditor"
import Preview from "./Preview";
import useSaveProjectOnExit from "./useSaveProjectOnExit";

export default function ResizableEditors() {
    const {projectId} = useParams();
    const [project, setProject] = useState(null);
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");
    const [projectName, setprojectName] = useState("");

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
            setprojectName(data.projectName || "Untitled");
          } catch (err) {
            return (err.message);
          } finally {
            // setLoading(false);
          }
        };
    
        fetchProject();
      }, [projectId]);
      console.log(project);

      useSaveProjectOnExit(projectId, html, css, js);
  return (
    <div className="h-screen w-screen flex flex-col">
      {/* ✅ Header Section */}
      <header className="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">
        {projectName}
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-400">Home</Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-gray-400">Projects</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-400">About</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* ✅ Main Content (Resizable Panels) */}
      <div className="flex-grow">
        <ResizablePanelGroup direction="vertical" className="h-full">
          {/* Top panel: Horizontal resizable group for three editors */}
          <ResizablePanel defaultSize={60}>
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel defaultSize={33}>
                <CodeEditor language="html" value={html} onChange={setHtml} />
              </ResizablePanel>
              <ResizableHandle className="w-1 bg-gray-300 cursor-col-resize" />
              <ResizablePanel defaultSize={34}>
                <CodeEditor language="css" value={css} onChange={setCss} />
              </ResizablePanel>
              <ResizableHandle className="w-1 bg-gray-300 cursor-col-resize" />
              <ResizablePanel defaultSize={33}>
                <CodeEditor language="js" value={js} onChange={setJs} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle className="h-1 bg-gray-300 cursor-row-resize" />
          {/* Bottom panel: Common resizable panel */}
          <ResizablePanel defaultSize={40}>
            <Preview html={html} css={css} js={js} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}