import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface InputPanelProps {
  setText: (text: string) => void;
  className?: string;
}

const InputPanel = ({ setText, className }: InputPanelProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setText(value);
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-editor-panelBg border-b border-white/10">
        <h2 className="text-sm font-medium text-white/80">Input</h2>
      </div>
      <div className="flex-1 p-2 bg-editor-panelBg">
        <textarea
          className="w-full h-full p-3 rounded-md resize-none bg-editor-inputBg text-white border border-white/10 focus:outline-none focus:ring-1 focus:ring-editor-accent focus:border-editor-accent transition-colors"
          placeholder="Type your input here..."
          onChange={handleChange}
          value={inputValue}
        />
      </div>
    </div>
  );
};

export default InputPanel;
