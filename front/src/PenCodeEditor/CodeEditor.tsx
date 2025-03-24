import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { FileCode, Hash, Braces } from "lucide-react";

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

const getLanguageIcon = (language: string) => {
  switch (language.toLowerCase()) {
    case "html":
      return <FileCode className="w-4 h-4 text-syntax-html" />;
    case "css":
      return <Hash className="w-4 h-4 text-syntax-css" />;
    case "js":
      return <Braces className="w-4 h-4 text-syntax-js" />;
    default:
      return <FileCode className="w-4 h-4" />;
  }
};

const getLanguageColor = (language: string) => {
  switch (language.toLowerCase()) {
    case "html":
      return "text-syntax-html border-syntax-html";
    case "css":
      return "text-syntax-css border-syntax-css";
    case "js":
      return "text-syntax-js border-syntax-js";
    default:
      return "text-gray-400 border-gray-400";
  }
};

const CodeEditor: React.FC<CodeEditorProps> = ({ language, value, onChange }) => {
  return (
    <div className="code-panel w-full h-full flex flex-col custom-scrollbar">
      <div className={`code-header flex items-center justify-between ${getLanguageColor(language)} border-l-2`}>
        <div className="flex items-center gap-2">
          {getLanguageIcon(language)}
          <span className="font-medium uppercase">{language}</span>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        <CodeMirror
          value={value}
          onChange={onChange}
          theme={vscodeDark}
          height="100%"
          extensions={[getLanguageExtension(language)]}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightActiveLine: true,
            foldGutter: true,
            autocompletion: true,
            bracketMatching: true,
            closeBrackets: true,
            indentOnInput: true,
          }}
          className="text-sm editor-transition"
          placeholder={`Enter ${language} code here...`}
        />
      </div>
    </div>
  );
};

export default CodeEditor;