"use client";
import { useState } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor from "@/components/CodeEditor";

export default function BuilderPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! How can I help you improve your website?" },
  ]);

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    setLoading(true);

    const userMsg = { role: "user", text: prompt };
    const aiResponse = {
      role: "ai",
      text: `Sure! I'll add that for you: "${prompt}".`,
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      setMessages((prev) => [...prev, aiResponse]);
      setPrompt("");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white font-mono">
      <PanelGroup direction="horizontal">
        {/* LEFT: Prompt Panel */}
        <Panel defaultSize={35} minSize={25} maxSize={50}>
          <div className="h-screen flex flex-col bg-[#252526] border-r border-[#333]">
            <div className="p-4 border-b border-[#333]">
              <h2 className="text-xl font-semibold text-cyan-400">💬 Ask for Changes</h2>
              <p className="text-gray-400 text-sm">
                Describe any changes you'd like to see in your website.
              </p>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-cyan-700/20 text-cyan-300 self-end text-right"
                      : "bg-[#1e1e1e] border border-[#333] text-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Prompt Input */}
            <div className="p-4 border-t border-[#333]">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Add a contact form"
                rows={3}
                className="w-full p-3 rounded-lg bg-[#1e1e1e] border border-[#444] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none mb-2"
              />
              <button
                onClick={handleSubmit}
                disabled={loading || !prompt}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Generating..." : "Submit Prompt →"}
              </button>
            </div>
          </div>
        </Panel>

        {/* Resizer */}
        <PanelResizeHandle className="w-[4px] bg-[#333] cursor-col-resize" />

        {/* RIGHT: Code Editor */}
        <Panel defaultSize={65} minSize={40}>
          <div className="h-screen overflow-hidden">
            <CodeEditor />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
