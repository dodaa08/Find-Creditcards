"use client"
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const suggestions = [
  "' Show me cards that offer lounge access and high cashback '",
  "' Best credit cards for first-time users with no annual fee '",
];

interface HeroSectionProps {
  onQuerySubmit: (query: string) => void;
  isLoading: boolean;
  resultMessage: string;
}

export default function HeroSection({ onQuerySubmit, isLoading, resultMessage }: HeroSectionProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");
  useEffect(() => setMounted(true), []);
  const isDark = theme === "dark";
  if (!mounted) return null;
  return (
    <section className={`flex flex-col items-center text-center py-12 px-4 transition-colors duration-300 ${isDark ? 'bg-neutral-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Find Credit Cards <span className="text-blue-500">using AI</span>
      </h1>
      <form className="w-full max-w-2xl flex items-center gap-2 mb-6" onSubmit={e => { e.preventDefault(); onQuerySubmit(input); }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about credit cards in natural language..."
          className={`flex-1 rounded-md px-4 py-3 focus:outline-none transition ${isDark ? 'bg-neutral-800 text-white placeholder-neutral-400' : 'bg-neutral-200 text-black placeholder-neutral-500'}`}
        />
        <button
          type="submit"
          className={`font-bold px-5 py-3 cursor-pointer rounded-md transition-colors flex items-center justify-center ${isDark ? 'bg-gray-200 hover:bg-gray-500 text-black' : 'bg-gray-300 hover:bg-yellow-400 text-black'}`}
          aria-label="Send query"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-6 w-6 text-blue-500" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 4l8 8-8 8" />
            </svg>
          )}
        </button>
      </form>
      {resultMessage && (
        <div className="w-full max-w-2xl text-left mb-4 text-blue-600 dark:text-blue-400 font-medium">
          {resultMessage}
        </div>
      )}
      <div className="w-full max-w-2xl text-left">
        <div className={`mb-2 font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>Try these sample queries:</div>
        <div className="flex gap-2 mt-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              className={`w-full text-left cursor-pointer rounded-md px-4 py-3 transition-colors text-sm md:text-base ${isDark ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'}`}
              type="button"
              onClick={() => onQuerySubmit(s.replace(/'/g, ""))}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
} 