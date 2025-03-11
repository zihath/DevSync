import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import clsx from "clsx";

const files: Record<string, string> = {
  "index.js": `// 🚀 Welcome to DevSync Code Editor\nfunction greet(name) {\n  return \`Hello, \${name}! 👋\`;\n}\n\nconsole.log(greet("Developer"));`,
  "app.js": `// 🏗️ App Logic Here\nconst App = () => {\n  console.log("App Loaded ✅");\n};\n\nexport default App;`,
  "styles.css": `/* 🎨 Styling Here */\nbody {\n  background-color: #121212;\n  color: white;\n  font-family: sans-serif;\n}`,
};

const CodeEditor = () => {
  const [activeFile, setActiveFile] = useState("index.js");
  const [code, setCode] = useState(files[activeFile]);

  return (
    <div className="w-full min-h-screen bg-transparent flex flex-col items-center py-10">
      <motion.div
        className="w-full text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl font-extrabold text-blue-500 font-mono"
        >
          Write, Edit & Run{" "}
          <span className="text-primary text-white">Code in Real-Time!</span>
        </motion.h1>
      </motion.div>

      <motion.div
        className="w-full max-w-5xl bg-[#1e1e1e] rounded-lg shadow-lg border relative"
        style={{
          borderImage: "linear-gradient(90deg, #00ccff, #ff00ff) 1",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{
          rotateX: -5,
          rotateY: 10,
          scale: 1.1,
          boxShadow: "0px 5px 20px rgba(0, 255, 255, 0.2)",
          marginTop: "30px",
        }}
      >
        <div className="absolute top-3 left-3 flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-700 transition" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-600 transition" />
          <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition" />
        </div>

        <div className="flex bg-[#282828] px-20 py-2 rounded-t-lg border-b border-gray-700">
          {Object.keys(files).map((filename) => (
            <motion.button
              key={filename}
              onClick={() => {
                setActiveFile(filename);
                setCode(files[filename]);
              }}
              className={clsx(
                "px-5 py-2 text-sm font-medium rounded-t-md focus:outline-none",
                activeFile === filename
                  ? "bg-[#333] text-white border-b-2 border-blue-400"
                  : "text-gray-400 hover:bg-[#444] hover:text-white"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filename}
            </motion.button>
          ))}
        </div>

        <motion.div className="p-6">
          <motion.div
            className="relative border border-gray-700 rounded-lg overflow-hidden"
            whileHover={{
              scale: 1.01,
              boxShadow: "0px 5px 20px rgba(0, 255, 255, 0.2)",
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFile}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <CodeMirror
                  value={code}
                  height="400px"
                  theme={oneDark}
                  extensions={[javascript()]}
                  onChange={(value) => setCode(value)}
                  className="rounded-md"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CodeEditor;
