// import * as Y from "yjs";
// import { yCollab } from "y-codemirror.next";
// import { EditorView, basicSetup } from "codemirror";
// import { EditorState } from "@codemirror/state";
// import { javascript } from "@codemirror/lang-javascript";
// import { python } from "@codemirror/lang-python";
// import { cpp } from "@codemirror/lang-cpp";
// import { java } from "@codemirror/lang-java";
// import { useCallback, useEffect, useState } from "react";
// import { LiveblocksYjsProvider } from "@liveblocks/yjs";
// import { useRoom } from "@liveblocks/react/suspense";
// import { dracula } from "@uiw/codemirror-theme-dracula";
// import { Button } from "@/components/ui/button";

// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable";
// import OutputPanel from "./OutputPanel";
// import { useSearchParams } from "react-router-dom";
// import InputPanel from "./InputPanel";
// import { toast } from "sonner";



// const fixedSizeTheme = EditorView.theme({
//   "&": { width: "full", height: "100vh" },
//   ".cm-scroller": { overflow: "hidden" },
// });

// const LiveCode = () => {
//   const room = useRoom();
//   const [element, setElement] = useState<HTMLElement | null>(null);
//   const [editorView, setEditorView] = useState<EditorView | null>(null);
//   const [ydoc, setYDoc] = useState<Y.Doc | null>(null);

//   const [searchParams] = useSearchParams();
//   const language = searchParams.get("lang");

//   const [showOutput, setShowOutput] = useState(false);

//   const ref = useCallback((node: HTMLElement | null) => {
//     if (node) setElement(node);
//   }, []);

//   const initializeEditor = (
//     element: HTMLElement,
//     room: any,
//     language: string
//   ) => {
//     if (!element || !room) return;

//     const newYDoc = new Y.Doc();
//     const provider = new LiveblocksYjsProvider(room, newYDoc);
//     const ytext = newYDoc.getText("codemirror");

//     setYDoc(newYDoc);

//     const getLanguageExtension = (lang: string) => {
//       const languageMap: Record<string, any> = {
//         javascript: javascript(),
//         python: python(),
//         cpp: cpp(),
//         java: java(),
//       };
//       return languageMap[lang] || javascript();
//     };

//     const state = EditorState.create({
//       doc: "",
//       extensions: [
//         basicSetup,
//         dracula,
//         fixedSizeTheme,
//         getLanguageExtension(language),
//         yCollab(ytext, provider.awareness),
//       ],
//     });

//     const view = new EditorView({ state, parent: element });
//     setEditorView(view);

//     return () => {
//       newYDoc.destroy();
//       provider.destroy();
//       view.destroy();
//     };
//   };

//   useEffect(() => {
//     if (!element || !room) return;
//     const cleanup = initializeEditor(element, room, language);
//     return cleanup;
//   }, [element, room, language]);

//   const handleReset = () => {
//     if (ydoc) {
//       ydoc.getText("codemirror").delete(0, ydoc.getText("codemirror").length);
//     }
//   };

//   const handleToggleOutput = () => {
//     setShowOutput((prev) => !prev);
//   };

//   const [text, setText] = useState("");
//   const [showInput, setShowInput] = useState(false);

//   const [latestText, setLatestText] = useState(text);
//   const [latestCode, setLatestCode] = useState("");
//   useEffect(() => {
//     setLatestText(text);
//   }, [text]);

//   useEffect(() => {
//     if (!ydoc) return;

//     const yText = ydoc.getText("codemirror");

//     const updateCode = () => {
//       setLatestCode(yText.toString());
//     };

//     updateCode();

//     yText.observe(updateCode);

//     return () => {
//       yText.unobserve(updateCode);
//     };
//   }, [ydoc]);

//   return (
//     <div className="w-full h-full flex flex-col p-2 bg-black">
//       <div className="flex justify-between items-center">
//         <h1 className="text-white pl-10 font-medium">
//           {language && language.toUpperCase()}
//         </h1>
//         <Button onClick={handleReset} className="p-4 m-2">
//           Reset
//         </Button>
//       </div>

//       <ResizablePanelGroup direction="horizontal">
//         <ResizablePanel minSize={30}>
//           <div
//             ref={ref}
//             className="w-full h-fulloverflow-auto scrollbar-hide"
//           ></div>
//         </ResizablePanel>

//         <ResizableHandle className="border-[4px] border-black" />

//         <ResizablePanel minSize={30} defaultSize={40}>
//           <ResizablePanelGroup direction="vertical">
//             <ResizablePanel defaultSize={showInput ? 50 : 100}>
//               <OutputPanel
//                 stdin={latestText}
//                 code={latestCode}
//                 language={language}
//               />
//             </ResizablePanel>

//             {showInput && (
//               <>
//                 {/* Resizable Handle Between Output & Input Panels */}
//                 <ResizableHandle className="border-[4px] border-black" />

//                 {/* Input Panel (Appears on Button Click) */}
//                 <ResizablePanel defaultSize={50}>
//                   <InputPanel setText={setText} />
//                 </ResizablePanel>
//               </>
//             )}
//           </ResizablePanelGroup>

//           <div className="absolute bottom-2 right-2">
//             <button
//               className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//               onClick={() => setShowInput(!showInput)}
//             >
//               {showInput ? "Hide Input" : "Show Input"}
//             </button>
//           </div>
//         </ResizablePanel>
//       </ResizablePanelGroup>
//     </div>
//   );
// };

// export default LiveCode;

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import InputPanel from './InputPanel';
import OutputPanel from './OutputPanel';
import { Trash2, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import * as Y from 'yjs';
import { yCollab } from 'y-codemirror.next';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import { useRoom } from '@liveblocks/react/suspense';
import { useSearchParams } from 'react-router-dom';



const fixedSizeTheme = EditorView.theme({
  '&': { height: '100%' },
  '.cm-scroller': { overflow: 'auto' },
});

// interface EditorProps {
//   language: string;
// }

const Editor: React.FC = () => {

  const [searchParams] = useSearchParams();
    const language = searchParams.get("lang");


  const room = useRoom();
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  const [ydoc, setYDoc] = useState<Y.Doc | null>(null);
  
  const [text, setText] = useState('');
  const [latestText, setLatestText] = useState('');
  const [latestCode, setLatestCode] = useState('');
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
    const ytext = newYDoc.getText('codemirror');

    setYDoc(newYDoc);

    const state = EditorState.create({
      doc: '',
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
  }, [element, room, language]);

  useEffect(() => {
    if (!ydoc) return;

    const yText = ydoc.getText('codemirror');

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
      ydoc.getText('codemirror').delete(0, ydoc.getText('codemirror').length);
      setLatestCode('');
      setText('');
      setLatestText('');
      toast.success('Editor reset successfully');
    }
  };

  return (
    <div className="w-full h-[calc(100vh-2rem)] flex flex-col p-2 bg-editor-background rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-2 mb-2 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <Code2 className="text-white/70" size={20} />
          <h1 className="text-white font-medium">
            {language && language.toUpperCase()} Editor
          </h1>
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

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel 
          minSize={30} 
          defaultSize={60} 
          className="transition-all duration-300 ease-in-out"
        >
          <div
            ref={ref}
            className="w-full h-full overflow-auto rounded-lg border border-white/10"
          ></div>
        </ResizablePanel>

        <ResizableHandle className="bg-editor-panelBg w-1.5 transition-all duration-300 hover:bg-editor-accent" />

        <ResizablePanel 
          minSize={30} 
          defaultSize={40}
          className="transition-all duration-300 ease-in-out"
        >
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel 
              defaultSize={showInput ? 50 : 100}
              className="transition-all duration-300 ease-in-out"
            >
              <OutputPanel
                stdin={latestText}
                code={latestCode}
                language={language}
              />
            </ResizablePanel>

            {showInput && (
              <>
                <ResizableHandle className="bg-editor-panelBg h-1.5 transition-all duration-300 hover:bg-editor-accent" />
                <ResizablePanel 
                  defaultSize={50}
                  className="transition-all duration-300 ease-in-out"
                >
                  <InputPanel setText={setText} />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>

          <Button
            onClick={() => setShowInput(!showInput)}
            variant="ghost"
            size="sm"
            className="absolute bottom-4 right-4 bg-editor-accent/90 hover:bg-editor-accent text-white rounded-full h-10 w-10 p-0 flex items-center justify-center shadow-lg z-10"
          >
            {showInput ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Editor;

