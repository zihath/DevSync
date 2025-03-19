import React from "react";

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language, value, onChange }) => {
  return (
    <div className="border border-gray-300 m-2 flex-1 rounded-lg overflow-hidden">
      <div className="bg-gray-200 p-2 border-b border-gray-300 font-bold uppercase text-sm">
        {language}
      </div>
      <textarea
        className="w-full h-64 p-3 border-none text-black resize-none font-mono bg-gray-100 focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${language} code here...`}
      />
    </div>
  );
};

export default CodeEditor;