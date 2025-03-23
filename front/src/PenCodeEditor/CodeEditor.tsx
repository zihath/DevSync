import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";


interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

const getLanguageExtension = (language: string) => {
  switch (language.toLowerCase()) {
    case "js":
      return javascript();
    case "html":
      return html();
    case "css":
      return css();
    default:
      return [];
  }
};

const CodeEditor: React.FC<CodeEditorProps> = ({ language, value, onChange }) => {
  return (
    <div className="border border-gray-300 m-2 flex-1 rounded-lg overflow-hidden">
      <div className="bg-gray-200 p-2 border-b border-gray-300 font-bold uppercase text-sm">
        {language}
      </div>
      <CodeMirror
        value={value}
        onChange={onChange}
        theme={vscodeDark}
        height="256px"
        extensions={[getLanguageExtension(language)]}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightActiveLine: true,
          foldGutter: true,
        }}
        placeholder={`Enter ${language} code here...`}
      />
    </div>
  );
};

export default CodeEditor;