"use client"
import React, { useState, useEffect } from 'react';
import HeroSection from "@/app/components/Landing/HeroSection"
import { useTheme } from "next-themes";
import CreditCardList from "@/app/components/Landing/CreditCardList"
export default function LandingPage() {
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return (
        <div className={`${isDark ? 'bg-neutral-900 text-white' : 'bg-white text-black'} h-max`}>
            <HeroSection />
            <CreditCardList />
        </div>
    )
}   