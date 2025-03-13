import React, { useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  XCircle,
  Copy,
  AlertTriangle,
  Play,
  LoaderCircle,
} from "lucide-react";

interface OutputPanelProps {
  stdin?: string;
  code?: string;
  language?: string;
  className?: string;
}

const OutputPanel: React.FC<OutputPanelProps> = ({
  stdin,
  code,
  language,
  className,
}) => {
  const [output, setOutput] = useState<string>("");
  const [executing, setExecuting] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "warning"
  >("idle");
  const outputRef = useRef<HTMLPreElement>(null);

  const handleExecute = async () => {
    if (!code?.trim()) {
      toast.error("Please enter some code to execute");
      return;
    }

    setExecuting(true);
    setStatus("idle");
    setOutput("Executing...");

    const finalLanguage = language ?? "python";
    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: finalLanguage,
          version: "*",
          files: [{ name: `main.${finalLanguage}`, content: code }],
          stdin,
        }
      );
      setOutput(response.data.run.output);
      console.log(response.data.run);
      setStatus(response.data.run.code === 0 ? "success" : "warning");
      toast.success("Code executed successfully");
    } catch (error: any) {
      console.error(
        "Error executing code:",
        error.response?.data || error.message
      );
      setOutput("Error executing code");
      setStatus("error");
      toast.error("Execution failed");
    } finally {
      setExecuting(false);
    }
  };

  const copyToClipboard = () => {
    if (output !== "Executing...") {
      navigator.clipboard.writeText(output);
      toast.success("Output copied to clipboard", {
        style: {
          backgroundColor: "#ffffff",
          color: "#22c55e",
          fontWeight: "bold",
          borderRadius: "8px",
          padding: "12px 16px",
        },
      });
    }
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-editor-panelBg border-b border-white/10">
        <div className="flex items-center space-x-2">
          <h2 className="text-sm font-medium text-white/80">Output</h2>
          {status === "success" && (
            <CheckCircle size={16} className="text-editor-success" />
          )}
          {status === "error" && (
            <XCircle size={16} className="text-editor-error" />
          )}
          {status === "warning" && (
            <AlertTriangle size={16} className="text-editor-warning" />
          )}
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={copyToClipboard}
            size="sm"
            variant="ghost"
            className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
            disabled={executing || output === "Executing..."}
          >
            <Copy size={16} />
          </Button>
          <Button
            onClick={handleExecute}
            size="sm"
            className="h-8 bg-editor-accent hover:bg-editor-accent/90 text-white flex items-center space-x-1"
            disabled={executing}
          >
            {executing ? (
              <>
                <LoaderCircle size={16} className="animate-spin mr-1" />
                <span>Running</span>
              </>
            ) : (
              <>
                <Play size={16} className="mr-1" />
                <span>Execute</span>
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="flex-1 p-2 bg-editor-panelBg overflow-auto">
        <pre
          ref={outputRef}
          className={cn(
            "p-3 rounded-md bg-editor-inputBg text-white/90 font-mono text-sm whitespace-pre-wrap border border-white/10 h-full overflow-auto",
            status === "success" && "border-l-4 border-l-editor-success",
            status === "error" && "border-l-4 border-l-editor-error",
            status === "warning" && "border-l-4 border-l-editor-warning"
          )}
        >
          {output || "Output will appear here..."}
        </pre>
      </div>
    </div>
  );
};

export default OutputPanel;
