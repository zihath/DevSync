import React, { useState } from "react";
import axios from "axios";

interface OutputPanelProps {
  stdin?: string;
  code?: string;
  language?: string;
}

export const OutputPanel = ({ stdin, code, language }: OutputPanelProps) => {
  const [output, setOutput] = useState<string>("");

  const handleExecute = async () => {
    // code = "print(1234)";
    // console.log("code" , code);
    // console.log("langua", language);
    // console.log("Stdin", stdin);
    const finalLanguage = language ?? "python";
    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: finalLanguage,
          version: "*",
          files: [
            {
              name: finalLanguage === "main.txt", // Adjust for other languages as needed
              content: code,
            },
          ],
          stdin,
        }
      );
      setOutput(response.data.run.output);
    } catch (error: any) {
      console.error(
        "Error executing code:",
        error.response?.data || error.message
      );
      setOutput("Error executing code");
    }
  };

  return (
    <div>
      <button
        onClick={handleExecute}
        className="absolute top-4 right-50 px-4 py-2 text-black font-semibold bg-white rounded-lg shadow-md hover:bg-white-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white-500 focus:ring-offset-2"
      >
        Execute
      </button>
      <h2>Output</h2>
      <pre>{output}</pre>
    </div>
  );
};

export default OutputPanel;
