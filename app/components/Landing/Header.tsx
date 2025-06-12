"use client"
import React, { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import { LuMoon } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import Link from 'next/link';


export default function Header({ onExploreAllCards }: { onExploreAllCards?: () => void }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = theme === "dark";
  if (!mounted) return null;
  return (
    <nav className={`w-full border-b transition-colors duration-300 ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-4">
        {/* Logo/Brand */}
        <span className={`font-semibold text-2xl ${isDark ? 'text-white' : 'text-black'}`}>Cardify</span>
        {/* Centered nav (empty for now, but space reserved for future) */}
        <div className="flex-1 flex justify-center">
          {/* Add nav links here if needed */}
        </div>
        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`rounded-md p-2 cursor-pointer transition-colors ${isDark ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-neutral-100 text-black hover:bg-neutral-200'}`}
            aria-label="Toggle dark mode"
          >
            {isDark ? (
               <LuMoon className="w-5 h-5" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.657 17.657l1.061 1.061M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.657 6.343l1.061-1.061M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
              </svg>
            )}
          </button>
          <button
            className={`ml-2 rounded-md px-4 py-2 cursor-pointer text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'}`}
            onClick={onExploreAllCards}
          >
            Explore All Cards
          </button>
        </div>
        <div className='flex items-center gap-5 ml-5'>
          <Link href="https://github.com/dodaa08/Find-Creditcards" target='_blank'>
          <button className={`text-2xl cursor-pointer rounded-full p-2 ${isDark ? 'border-2 border-gray-800' : 'border-2 border-gray-100'}`}>
            <FaGithub />
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}