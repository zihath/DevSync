import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import InputPanel from "./InputPanel";
import OutputPanel from "./OutputPanel";
import { Trash2, Code2, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom } from "@liveblocks/react/suspense";
import { useSearchParams } from "react-router-dom";

const fixedSizeTheme = EditorView.theme({
  "&": { height: "100%" },
  ".cm-scroller": { overflow: "auto" },
});

const LiveCodeEditor: React.FC = () => {
  const [searchParams] = useSearchParams();
  const language = searchParams.get("lang");
  const FileName = searchParams.get("filename");
  // console.log(FileName);

  const room = useRoom();
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  const [ydoc, setYDoc] = useState<Y.Doc | null>(null);

  const [text, setText] = useState("");
  const [latestText, setLatestText] = useState("");
  const [latestCode, setLatestCode] = useState("");
  const [showInput, setShowInput] = useState(false);

  const ref = useCallback((node: HTMLElement | null) => {
    if (node) setElement(node);
  }, []);

  useEffect(() => {
    setLatestText(text);
  }, [text]);

  const getLanguageExtension = (lang: string) => {
    const languageMap: Record<string, any> = {
      javascript: javascript(),
      python: python(),
      cpp: cpp(),
      java: java(),
    };
    return languageMap[lang.toLowerCase()] || javascript();
  };

  useEffect(() => {
    if (!element || !room) return;

    const newYDoc = new Y.Doc();
    const provider = new LiveblocksYjsProvider(room, newYDoc);
    const ytext = newYDoc.getText("codemirror");

    setYDoc(newYDoc);

    const state = EditorState.create({
      doc: "",
      extensions: [
        basicSetup,
        dracula,
        fixedSizeTheme,
        getLanguageExtension(language || "javascript"),
        yCollab(ytext, provider.awareness),
      ],
    });

    const view = new EditorView({ state, parent: element });
    setEditorView(view);

    return () => {
      newYDoc.destroy();
      provider.destroy();
      view.destroy();
    };
  }, [element, room, language]);

  useEffect(() => {
    if (!ydoc) return;

    const yText = ydoc.getText("codemirror");

    const updateCode = () => {
      setLatestCode(yText.toString());
    };

    updateCode();

    yText.observe(updateCode);

    return () => {
      yText.unobserve(updateCode);
    };
  }, [ydoc]);

  const handleReset = () => {
    if (ydoc) {
      ydoc.getText("codemirror").delete(0, ydoc.getText("codemirror").length);
      setLatestCode("");
      setText("");
      setLatestText("");
      toast.success("Editor reset successfully");
    }
  };

  return (
    <div className="w-full h-[calc(100vh-2rem)] flex flex-col p-2 bg-editor-background rounded-lg overflow-hidden">
      {/* Header Section */}
      <div className="flex justify-between items-center p-2 mb-2 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <Code2 className="text-white/70" size={20} />
          <h1 className="text-white font-medium">{`${FileName}.${language}`}</h1>
        </div>
        <Button
          onClick={handleReset}
          variant="ghost"
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          <Trash2 size={18} className="mr-1" />
          Reset
        </Button>
      </div>

      {/* Main Resizable Panels */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 relative">
        <ResizablePanel defaultSize={60} className="relative group">
          <div
            ref={ref}
            className="w-full h-full overflow-auto rounded-lg border border-white/10 group-hover:border-editor-accent/70 transition-colors duration-200"
          ></div>
        </ResizablePanel>

        <ResizableHandle className="bg-editor-panelBg w-2 transition-all duration-300 hover:bg-editor-accent hover:w-3 flex items-center justify-center">
          <div className="h-8 w-1 bg-white/20 rounded-full"></div>
        </ResizableHandle>

        {/* Right Panel */}
        <ResizablePanel defaultSize={40} className="relative group">
          <ResizablePanelGroup direction="vertical">
            {/* Output Panel */}
            <ResizablePanel
              defaultSize={showInput ? 50 : 100}
              className="relative group bg-gradient-to-b from-editor-dark via-editor-accent/20 to-editor-dark shadow-md rounded-lg border border-white/10"
            >
              <OutputPanel
                stdin={latestText}
                code={latestCode}
                language={language || "javascript"}
              />
            </ResizablePanel>

            {showInput && (
              <>
                <ResizableHandle className="bg-editor-panelBg h-2 transition-all duration-300 hover:bg-editor-accent hover:h-3 flex items-center justify-center">
                  <div className="w-8 h-1 bg-white/20 rounded-full"></div>
                </ResizableHandle>

                {/* Input Panel */}
                <ResizablePanel
                  defaultSize={50}
                  className="relative group bg-editor-dark/50 backdrop-blur-md shadow-lg border border-editor-accent/50 rounded-lg"
                >
                  <InputPanel setText={setText} />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>

          {/* New Animated Button for Input Panel */}
          <Button
            onClick={() => setShowInput(!showInput)}
            variant="ghost"
            size="sm"
            className="absolute bottom-4 right-4 bg-editor-accent hover:bg-editor-accent/80 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
          >
            {showInput ? <ArrowDown size={22} /> : <ArrowUp size={22} />}
          </Button>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default LiveCodeEditor;
