"use client"
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const suggestions = [
  "Show me cards that offer lounge access and high cashback",
  "Best credit cards for first-time users with no annual fee",
  "Compare Axis Magnus vs HDFC Regalia with benefits summary",
  "Cards with highest reward points for online shopping",
  "Premium cards under ₹10,000 annual fee with travel benefits"
];

export default function HeroSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = theme === "dark";
  if (!mounted) return null;
  return (
    <section className={`flex flex-col items-center text-center py-16 px-4 transition-colors duration-300 ${isDark ? 'bg-neutral-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
        AI-Powered Credit Card <span className="text-blue-500">Discovery</span>
      </h1>
      <form className="w-full max-w-2xl flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Ask about credit cards in natural language..."
          className={`flex-1 rounded-md px-4 py-3 focus:outline-none transition ${isDark ? 'bg-neutral-800 text-white placeholder-neutral-400' : 'bg-neutral-200 text-black placeholder-neutral-500'}`}
        />
        <button
          type="submit"
          className={`font-bold px-5 py-3 cursor-pointer rounded-md transition-colors flex items-center justify-center ${isDark ? 'bg-gray-200 hover:bg-gray-500 text-black' : 'bg-gray-300 hover:bg-yellow-400 text-black'}`}
          aria-label="Send query"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 4l8 8-8 8" />
          </svg>
        </button>
      </form>
      <div className="w-full max-w-2xl text-left">
        <div className={`mb-2 font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>Try these sample queries:</div>
        <div className="flex flex-col gap-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              className={`w-full text-left rounded-md px-4 py-3 transition-colors text-sm md:text-base ${isDark ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'}`}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
} 