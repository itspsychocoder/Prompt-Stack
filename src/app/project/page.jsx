"use client";
import { useState } from "react";

export default function PromptPage({ onSubmit }) {
  const [prompt, setPrompt] = useState("");

  const examples = [
    "A personal portfolio in dark mode",
    "Landing page for an AI product",
    "Blog for a software engineer",
    "Resume with project showcase",
    "Product page with reviews",
  ];

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex items-center justify-center px-4 font-mono">
      <div className="bg-[#252526] border border-[#333] rounded-2xl p-8 max-w-2xl w-full shadow-md">
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          💻 What do you want to build today?
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Type your idea and let the system do the rest — versioned, deployed, and live.
        </p>

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Portfolio with projects and contact form"
          className="w-full px-4 py-3 rounded-lg bg-[#1e1e1e] border border-[#444] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-6"
        />

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setPrompt(ex)}
              className="bg-[#373737] text-cyan-300 hover:bg-[#3f3f3f] px-4 py-1.5 rounded-full text-sm transition-all duration-200"
            >
              {ex}
            </button>
          ))}
        </div>

        <button
          onClick={() => onSubmit(prompt)}
          disabled={!prompt}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Generate →
        </button>
      </div>
    </div>
  );
}
