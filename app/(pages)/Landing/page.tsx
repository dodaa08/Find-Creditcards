"use client"
import React, { useState, useEffect } from 'react';
import HeroSection from "@/app/components/Landing/HeroSection"
import { useTheme } from "next-themes";
import CreditCardList from "@/app/components/Landing/CreditCardList"
import SidebarFilter from "@/app/components/Landing/SidebarFilter";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function LandingPage() {
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return (
        <div className={`${isDark ? 'bg-neutral-900 text-white' : 'bg-white text-black'} min-h-screen`}>  
            {/* Hamburger menu for mobile */}
            <div className="md:hidden flex items-center p-4 border-b border-neutral-200 dark:border-neutral-800">
                <button onClick={() => setSidebarOpen(true)} className="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800">
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
                    <span className="sr-only">Open sidebar</span>
                </button>
                <span className="ml-3 text-lg font-semibold">Filters</span>
            </div>
            <div className="flex flex-row">
                {/* Sidebar: visible on md+, overlay on mobile */}
                <div className={`hidden md:flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-28' : 'w-72'} max-w-full`}>
                    <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
                        {/* <h2 className="text-xl font-semibold truncate">Filters</h2> */}
                        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-2 rounded dark:hover:bg-neutral-800 cursor-pointer flex items-center justify-center gap-2 ">
                            {sidebarCollapsed ? <div className='flex gap-2'> Filters <FiChevronRight size={20} /> </div> : <div className='flex gap-2'> Filters <FiChevronLeft size={20} /> </div>}
                        </button>
                    </div>
                    <div className={`${sidebarCollapsed ? 'hidden' : 'block'}`}>
                        <SidebarFilter />
                    </div>
                </div>

                {sidebarOpen && (
                    <div className="fixed inset-0 z-50 flex">
                        <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
                        <SidebarFilter onClose={() => setSidebarOpen(false)} />
                    </div>
                )}
                {/* Main content */}
                <div className="flex-1">
                    <HeroSection />
                    <CreditCardList />
                </div>
            </div>
        </div>
    )
}   