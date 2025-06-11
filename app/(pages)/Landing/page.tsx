"use client"
import React, { useState, useEffect } from 'react';
import HeroSection from "@/app/components/Landing/HeroSection"

export default function LandingPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return (
        <div className="min-h-screen bg-neutral-900 text-white dark:bg-white dark:text-black">
            <HeroSection />
        </div>
    )
}