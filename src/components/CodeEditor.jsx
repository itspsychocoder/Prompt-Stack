"use client"
import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  const [files] = useState({
    "index.html": "<!DOCTYPE html>\n<html>\n<head>\n  <title>My Site</title>\n</head>\n<body>\n  <h1>Hello, world!</h1>\n</body>\n</html>",
    "style.css": "body { font-family: sans-serif; background: #111; color: white; }",
    "script.js": "console.log('Hello, world!');",
  });

  const [activeFile, setActiveFile] = useState("index.html");
  const [codeMap, setCodeMap] = useState({ ...files });

  const handleCodeChange = (value) => {
    setCodeMap({ ...codeMap, [activeFile]: value });
  };

  return (
    <div className="flex min-h-screen bg-[#1e1e1e] text-white font-mono">
      {/* File Explorer */}
      <div className="w-[200px] bg-[#252526] border-r border-[#333] p-3 space-y-2">
        <h3 className="text-sm text-gray-400 mb-2">FILES</h3>
        {Object.keys(files).map((file) => (
          <button
            key={file}
            onClick={() => setActiveFile(file)}
            className={`w-full text-left px-3 py-1 rounded-md text-sm ${
              activeFile === file
                ? "bg-[#333] text-cyan-400"
                : "hover:bg-[#2d2d2d] text-gray-300"
            }`}
          >
            {file}
          </button>
        ))}
      </div>

      {/* Editor Section */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="flex bg-[#2d2d2d] border-b border-[#333] px-4">
          {Object.keys(files).map((file) => (
            <div
              key={file}
              onClick={() => setActiveFile(file)}
              className={`px-4 py-2 cursor-pointer text-sm ${
                activeFile === file
                  ? "bg-[#1e1e1e] border-t-2 border-cyan-500 text-cyan-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {file}
            </div>
          ))}
        </div>

        {/* Monaco Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            defaultLanguage={
              activeFile.endsWith(".html")
                ? "html"
                : activeFile.endsWith(".css")
                ? "css"
                : "javascript"
            }
            theme="vs-dark"
            value={codeMap[activeFile]}
            onChange={handleCodeChange}
            options={{
              fontSize: 14,
              minimap: { enabled: true },
              fontFamily: "monospace",
            }}
          />
        </div>
      </div>
    </div>
  );
}
