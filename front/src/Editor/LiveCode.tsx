import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { useCallback, useEffect, useState } from "react";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom } from "@liveblocks/react/suspense";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { Button } from "@/components/ui/button";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
<<<<<<< HEAD
// import { OutputPanel } from "./OutputPanel";
import OutputPanel from "./OutputPanel";
import { useParams, useSearchParams } from "react-router-dom";
||||||| bfdcd78
import { OutputPanel } from "./OutputPanel";
import { useParams, useSearchParams } from "react-router-dom";
=======
import { OutputPanel } from "./OutputPanel";
import { useSearchParams } from "react-router-dom";
>>>>>>> origin/main

const fixedSizeTheme = EditorView.theme({
  "&": { width: "full", height: "100vh" },
  ".cm-scroller": { overflow: "hidden" },
});

const InputPanel = ({setText} : {setText : (text : string) => void }) => {
  return(
    <textarea
      className="w-full h-full p-2 border resize-none bg-black text-white"
      placeholder="Type the input here... "
      onChange={(e)=>setText(e.target.value)}
    />
  );
};



const LiveCode = () => {
  const room = useRoom();
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  const [ydoc, setYDoc] = useState<Y.Doc | null>(null);

<<<<<<< HEAD



  const { roomId } = useParams();
||||||| bfdcd78
  const { roomId } = useParams();
=======
>>>>>>> origin/main
  const [searchParams] = useSearchParams();
  const language = searchParams.get("lang");

  const [showOutput, setShowOutput] = useState(false);

  const ref = useCallback((node: HTMLElement | null) => {
    if (node) setElement(node);
  }, []);

  const initializeEditor = (
    element: HTMLElement,
    room: any,
    language: string
  ) => {
    if (!element || !room) return;

    const newYDoc = new Y.Doc();
    const provider = new LiveblocksYjsProvider(room, newYDoc);
    const ytext = newYDoc.getText("codemirror");

    setYDoc(newYDoc);

    const getLanguageExtension = (lang: string) => {
      const languageMap: Record<string, any> = {
        javascript: javascript(),
        python: python(),
        cpp: cpp(),
        java: java(),
      };
      return languageMap[lang] || javascript();
    };

    const state = EditorState.create({
      doc: "",
      extensions: [
        basicSetup,
        dracula,
        fixedSizeTheme,
        getLanguageExtension(language),
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
  };

  useEffect(() => {
    if (!element || !room) return;
    const cleanup = initializeEditor(element, room, language);
    return cleanup;
  }, [element, room, language]);

  const handleReset = () => {
    if (ydoc) {
      ydoc.getText("codemirror").delete(0, ydoc.getText("codemirror").length);
    }
  };

  const handleToggleOutput = () => {
    setShowOutput((prev) => !prev);
  };

  const [text, setText] = useState("");
  const [showInput, setShowInput] = useState(false);
  
  const [latestText, setLatestText] = useState(text);
  const [latestCode, setLatestCode] = useState('');
  useEffect(() => {
    setLatestText(text);
  }, [text]);

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

  return (
    <div className="w-full h-full flex flex-col p-2 bg-black">
      <div className="flex justify-between items-center">
        <h1 className="text-white pl-10 font-medium">
          {language && language.toUpperCase()}
        </h1>
        <div className="flex gap-2">
          <Button onClick={handleToggleOutput} className="p-4 m-2">
            {showOutput ? "Hide Output" : "Show Output"}
          </Button>
        </div>
        <Button onClick={handleReset} className="p-4 m-2">
          Reset
        </Button>
      </div>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div
            ref={ref}
            className="w-full h-fulloverflow-auto scrollbar-hide"
          ></div>
        </ResizablePanel>

        <ResizableHandle className="border-[2px] border-black" />

        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={showInput ? 50 : 100}>
                <OutputPanel 
                  stdin={latestText} 
                  code={latestCode}
                  language = {language}
                />
              </ResizablePanel>

              {showInput && (
                <>
                  {/* Resizable Handle Between Output & Input Panels */}
                  <ResizableHandle className="border-[2px] border-black" />

                  {/* Input Panel (Appears on Button Click) */}
                  <ResizablePanel defaultSize={50}>
                    <InputPanel setText={setText} />
                  </ResizablePanel>
                </>
              )}


            </ResizablePanelGroup>
          
            <div className="absolute bottom-2 right-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => setShowInput(!showInput)}
              >
                {showInput ? "Hide Input" : "Show Input"}
              </button>
            </div>

          </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default LiveCode;
