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
// import ProgrammingLanguages from "@/components/SelectLanguages";
import { Button } from "@/components/ui/button";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { OutputPanel } from "./OutputPanel";
import { useLocation } from "react-router-dom";

const fixedSizeTheme = EditorView.theme({
  "&": { width: "full", height: "100vh" },
  ".cm-scroller": { overflow: "hidden" },
});

const LiveCode = ({ language }: { language: string | null }) => {
  const room = useRoom();
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  const [ydoc, setYDoc] = useState<Y.Doc | null>(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get("room");

  console.log(roomId);
  console.log(language);

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

  return (
    <div className="w-full h-full flex flex-col p-2 bg-black">
      <div className="flex justify-between items-center">
        <h1 className="text-white pl-10 font-medium">
          {language && language.toUpperCase()}
        </h1>
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

        <ResizablePanel>
          <OutputPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default LiveCode;
