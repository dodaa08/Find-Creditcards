"use client"
import React, { useState, useEffect } from 'react';
import HeroSection from "@/app/components/Landing/HeroSection"
import { useTheme } from "next-themes";
import CreditCardList from "@/app/components/Landing/CreditCardList"
import SidebarFilter from "@/app/components/Landing/SidebarFilter";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { creditCardsData, CreditCard } from "@/app/Data/data";

export default function LandingPage() {
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Filter state
    const [search, setSearch] = useState("");
    const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedFees, setSelectedFees] = useState<string[]>([]);
    const [selectedSalaries, setSelectedSalaries] = useState<string[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Handlers
    const handleBankChange = (bank: string) => {
        setSelectedBanks(prev => prev.includes(bank) ? prev.filter(b => b !== bank) : [...prev, bank]);
    };
    const handleTypeChange = (type: string) => {
        setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
    };
    const handleFeeChange = (fee: string) => {
        setSelectedFees(prev => prev.includes(fee) ? prev.filter(f => f !== fee) : [...prev, fee]);
    };
    const handleSalaryChange = (salary: string) => {
        setSelectedSalaries(prev => prev.includes(salary) ? prev.filter(s => s !== salary) : [...prev, salary]);
    };
    const handleFeatureChange = (feature: string) => {
        setSelectedFeatures(prev => prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]);
    };
    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    };

    // Filtering logic
    const filteredCards = creditCardsData.filter(card => {
        // Search
        const matchesSearch = search.trim() === "" ||
            card.name.toLowerCase().includes(search.toLowerCase()) ||
            card.bank.toLowerCase().includes(search.toLowerCase()) ||
            card.type.toLowerCase().includes(search.toLowerCase());
        // Banks
        const matchesBank = selectedBanks.length === 0 || selectedBanks.includes(card.bank);
        // Types
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(card.type) || selectedTypes.includes(card.type.charAt(0).toUpperCase() + card.type.slice(1));
        // Fees
        let matchesFee = true;
        if (selectedFees.length > 0) {
            matchesFee = false;
            for (const fee of selectedFees) {
                if (fee === "No Annual Fee" && card.annualFee === 0) matchesFee = true;
                if (fee === "₹500 - ₹1000" && card.annualFee >= 500 && card.annualFee <= 1000) matchesFee = true;
                if (fee === "₹1000+" && card.annualFee > 1000) matchesFee = true;
            }
        }
        // Salary
        let matchesSalary = true;
        if (selectedSalaries.length > 0) {
            matchesSalary = false;
            for (const sal of selectedSalaries) {
                if (sal === "₹25,000+" && card.minSalary >= 25000) matchesSalary = true;
                if (sal === "₹50,000+" && card.minSalary >= 50000) matchesSalary = true;
            }
        }
        // Features
        let matchesFeature = true;
        if (selectedFeatures.length > 0) {
            matchesFeature = false;
            for (const feature of selectedFeatures) {
                if (feature === "Lounge Access" && card.loungeAccess) matchesFeature = true;
                if (feature === "Cashback" && card.categories.map(c => c.toLowerCase()).includes("cashback")) matchesFeature = true;
                if (feature === "Travel" && card.categories.map(c => c.toLowerCase()).includes("travel")) matchesFeature = true;
            }
        }
        // Categories
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(cat => card.categories.map(c => c.toLowerCase()).includes(cat.toLowerCase()));
        return matchesSearch && matchesBank && matchesType && matchesFee && matchesSalary && matchesFeature && matchesCategory;
    });

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
            </div>
            <div className="flex flex-row">
                {/* Sidebar: visible on md+, overlay on mobile */}
                <div className={`hidden md:flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-72'} max-w-full`}>
                    <div className={`flex items-center justify-between p-4  ${isDark ? 'bg-neutral-900 border-b border-neutral-900' : 'bg-white  border-b border-neutral-200'}`}>
                        
                        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-2 rounded  items-center gap-2 cursor-pointer  ${isDark ? 'bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-800' : 'bg-white border-2 border-neutral-200'}`}>
                            {sidebarCollapsed ? <> <FiChevronRight size={24} /> </> : <FiChevronLeft size={24} />}
                        </button>
                    </div>
                            <h1 className='text-xl font-semibold flex items-center gap-2 mt-4 ml-4'>Filters</h1>
                    <div className={`${sidebarCollapsed ? 'hidden' : 'block'}`}> 
                        <SidebarFilter
                            search={search}
                            onSearchChange={setSearch}
                            selectedBanks={selectedBanks}
                            onBankChange={handleBankChange}
                            selectedTypes={selectedTypes}
                            onTypeChange={handleTypeChange}
                            selectedFees={selectedFees}
                            onFeeChange={handleFeeChange}
                            selectedSalaries={selectedSalaries}
                            onSalaryChange={handleSalaryChange}
                            selectedFeatures={selectedFeatures}
                            onFeatureChange={handleFeatureChange}
                            selectedCategories={selectedCategories}
                            onCategoryChange={handleCategoryChange}
                        />
                    </div>
                </div>
                {sidebarOpen && (
                    <div className="fixed inset-0 z-50 flex">
                        <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
                        <SidebarFilter
                            search={search}
                            onSearchChange={setSearch}
                            selectedBanks={selectedBanks}
                            onBankChange={handleBankChange}
                            selectedTypes={selectedTypes}
                            onTypeChange={handleTypeChange}
                            selectedFees={selectedFees}
                            onFeeChange={handleFeeChange}
                            selectedSalaries={selectedSalaries}
                            onSalaryChange={handleSalaryChange}
                            selectedFeatures={selectedFeatures}
                            onFeatureChange={handleFeatureChange}
                            selectedCategories={selectedCategories}
                            onCategoryChange={handleCategoryChange}
                            onClose={() => setSidebarOpen(false)}
                        />
                    </div>
                )}
                {/* Main content */}
                <div className="flex-1">
                    <HeroSection />
                    <CreditCardList cards={filteredCards.slice(0, 6)} />
                    {filteredCards.length > 6 && (
                        <div className="w-full max-w-5xl mx-auto text-center text-sm text-neutral-500 pb-8">
                            +{filteredCards.length - 6} more cards
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}   
