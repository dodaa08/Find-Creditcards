"use client"
import React, { useState, useEffect } from 'react';
import HeroSection from "@/app/components/Landing/HeroSection"
import { useTheme } from "next-themes";
import CreditCardList from "@/app/components/Landing/CreditCardList"
import SidebarFilter from "@/app/components/Landing/SidebarFilter";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { creditCardsData, CreditCard } from "@/app/Data/data";
import Header from "@/app/components/Landing/Header";

// Utility to strip markdown formatting and leading bullet chars
function stripMarkdown(text: string) {
  return text
    .replace(/^\s*([*-]|•)\s*/, '')
    .replace(/\*\*|__|\*|_/g, '')
    .replace(/`/g, '')
    .replace(/\[|\]|\(|\)/g, '')
    .trim();
}

export default function LandingPage() {
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    // Filter state
    const [search, setSearch] = useState("");
    const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedFees, setSelectedFees] = useState<string[]>([]);
    const [selectedSalaries, setSelectedSalaries] = useState<string[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Gemini AI integration state
    const [isLoading, setIsLoading] = useState(false);
    const [resultMessage, setResultMessage] = useState("");
    const [aiCardResults, setAiCardResults] = useState<CreditCard[]>([]);

    // Comparison modal state
    const [showCompareModal, setShowCompareModal] = useState(false);
    const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
    const [compareResult, setCompareResult] = useState("");
    const [compareLoading, setCompareLoading] = useState(false);

    // Show all cards toggle
    const [showAllCards, setShowAllCards] = useState(false);

    const cardListRef = React.useRef<HTMLDivElement>(null);

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

    // Handler for AI query
    async function handleQuerySubmit(query: string) {
        setIsLoading(true);
        setResultMessage("");
        setAiCardResults([]);
        try {
            const response = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query })
            });
            const data = await response.json();
            if (data.cardNames && Array.isArray(data.cardNames)) {
                const foundCards = creditCardsData.filter(card => data.cardNames.includes(card.name));
                setAiCardResults(foundCards);
                setResultMessage(data.message);
            } else if (data.cardName) {
                const found = creditCardsData.find(card => card.name === data.cardName);
                setAiCardResults(found ? [found] : []);
                setResultMessage(data.message);
            } else {
                setResultMessage(data.message);
                setAiCardResults([]);
            }
        } catch (e) {
            setResultMessage("There was an error contacting Gemini. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    // Handler for AI comparison
    async function handleCompare() {
        setCompareLoading(true);
        setCompareResult("");
        try {
            const response = await fetch("/api/compare-cards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cardIds: selectedCompareIds })
            });
            const data = await response.json();
            setCompareResult(data.result);
        } catch (e) {
            setCompareResult("There was an error contacting Gemini for comparison.");
        } finally {
            setCompareLoading(false);
        }
    }

    // Handler for Explore All Cards
    const handleExploreAllCards = () => {
        setShowAllCards(true);
        setTimeout(() => {
            cardListRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100); // wait for render
    };

    // Handler for cross button
    const handleHideAllCards = () => {
        setShowAllCards(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => setMounted(true), []);  
    if (!mounted) return null;
    return (
        <div className={`${isDark ? 'bg-neutral-900 text-white' : 'bg-white text-black'} min-h-screen`}>  
            <Header onExploreAllCards={handleExploreAllCards} />
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
                    <div className={`flex items-center justify-between p-4  ${isDark ? 'bg-neutral-900 border-b border-neutral-900' : 'bg-white '}`}>
                        
                        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-2 rounded  items-center gap-2 cursor-pointer  ${isDark ? 'bg-neutral-900 border-2 hover:border-neutral-800 border-neutral-900' : 'bg-white border-2 hover:border-neutral-200 border-neutral-100'}`}>
                            {sidebarCollapsed ? <> <FiChevronRight size={24} /> </> : <FiChevronLeft size={24} />}
                        </button>
                    </div>
                            <h1 className='text-lg font-semibold flex items-center gap-2 mt-4 ml-4'>Filters</h1>
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
                    <HeroSection onQuerySubmit={handleQuerySubmit} isLoading={isLoading} resultMessage={resultMessage} />
                    <div ref={cardListRef} />
                    <div className="w-full max-w-5xl mx-auto text-center mb-2">
                      <button
                        className={`text-lg cursor-pointer   text-sm font-medium rounded-lg px-4 py-2 transition duration-300 ${isDark ? 'bg-neutral-900 text-blue-400 hover:bg-gray-800' : 'bg-white text-blue-400 hover:bg-gray-200'}`}
                        onClick={() => setShowCompareModal(true)}
                        type="button"
                      >
                        Advanced AI Based Comparison →
                      </button>
                    </div>
                    {/* Show all cards logic */}
                    {isLoading ? null : aiCardResults.length > 0 ? (
                        <div className="w-full max-w-5xl mx-auto mb-4">
                            <div className="rounded-lg p-4 mb-2 text-blue-900 dark:text-blue-100 font-semibold flex items-center justify-between">
                                <span className={`text-lg ${isDark ? 'text-white' : 'text-black'}`}>AI Recommendation:</span>
                                <button
                                    className="ml-4 px-3 py-2 rounded bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-xs font-semibold hover:bg-red-200 dark:hover:bg-red-800 transition cursor-pointer text-2xl"
                                    onClick={() => { setAiCardResults([]); setResultMessage(""); }}
                                >
                                    Clear Response
                                </button>
                            </div>
                            <div className="mb-4">
                                <CreditCardList cards={aiCardResults} />
                            </div>
                        </div>
                    ) : (
                        <>
                            {showAllCards && (
                                <div className="w-full max-w-5xl mx-auto flex justify-end mb-2">
                                    <button
                                        className="text-2xl cursor-pointer text-neutral-500 hover:text-neutral-800 dark:hover:text-white px-2 py-1 rounded"
                                        onClick={handleHideAllCards}
                                        aria-label="Show fewer cards"
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
                            <CreditCardList cards={showAllCards ? filteredCards : filteredCards.slice(0, 6)} />
                            {!showAllCards && filteredCards.length > 6 && (
                                <div className="w-full max-w-5xl mx-auto text-center text-sm text-neutral-500 pb-8">
                                    +{filteredCards.length - 6} more cards
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            {/* Comparison Modal */}
            {showCompareModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className={` rounded-lg shadow-xl max-w-xl w-full p-6 relative max-h-[80vh] overflow-y-auto ${isDark ? 'bg-black/90 text-white' : 'bg-white text-black'}`}>
                        <button
                            className="absolute top-2 right-2 cursor-pointer text-2xl text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
                            onClick={() => { setShowCompareModal(false); setSelectedCompareIds([]); setCompareResult(""); }}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">Select Cards to Compare</h2>
                        <div className="mb-4 space-y-2">
                            {filteredCards.slice(0, 6).map(card => (
                                <label key={card.id} className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}> 
                                    <input
                                        type="checkbox"
                                        checked={selectedCompareIds.includes(card.id)}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setSelectedCompareIds(prev => [...prev, card.id]);
                                            } else {
                                                setSelectedCompareIds(prev => prev.filter(id => id !== card.id));
                                            }
                                        }}
                                    />
                                    {card.name}
                                </label>
                            ))}
                        </div>
                        <button
                            className="mt-2 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                            onClick={handleCompare}
                            disabled={selectedCompareIds.length < 2 || compareLoading}
                        >
                            {compareLoading ? 'Comparing...' : 'Compare'}
                        </button>
                        {compareResult && (
                            <div className="mt-4">
                                {(() => {
                                    const lines = compareResult.trim().split(/\r?\n/);
                                    const tableLines = lines.filter(l => l.trim().startsWith('|'));
                                    const nonTableLines = lines.filter(l => !l.trim().startsWith('|') && l.trim() !== '');
                                    // Table rendering
                                    let table = null;
                                    if (tableLines.length >= 2) {
                                        const headers = tableLines[0].split('|').map(h => stripMarkdown(h.trim())).filter(Boolean);
                                        const rows = tableLines.slice(2).map(row => row.split('|').map(cell => stripMarkdown(cell.trim())).filter(Boolean));
                                        table = (
                                            <div className="overflow-x-auto">
                                                <table className={`min-w-full text-sm md:text-base border rounded overflow-hidden mb-4 ${isDark ? 'border-neutral-700' : 'border-neutral-200'}`}>
                                                    <thead>
                                                        <tr>
                                                            {headers.map((h, i) => (
                                                                <th key={i} className={`font-bold px-4 py-2 ${isDark ? 'bg-neutral-900 text-neutral-100' : 'bg-neutral-50 text-neutral-800'}`}>{h}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {rows.map((row, i) => (
                                                            <tr key={i} className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                                                                {row.map((cell, j) => (
                                                                    <td key={j} className={`px-4 py-2 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`}>{cell}</td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        );
                                    }
                                    // Short summary (first ~50 words after table)
                                    let summary = null;
                                    if (nonTableLines.length > 0) {
                                        const text = nonTableLines.join(' ');
                                        const words = text.split(/\s+/).slice(0, 50).join(' ');
                                        summary = (
                                            <div className={`mt-2 text-base ${isDark ? 'text-blue-200' : 'text-blue-900'}`}>{words}{text.split(/\s+/).length > 50 ? '...' : ''}</div>
                                        );
                                    }
                                    if (table) {
                                        return <>{table}{summary}</>;
                                    }
                                    // Fallback: key-value or bullet rendering
                                    return (
                                        <table className={`min-w-full text-sm md:text-base border rounded overflow-hidden ${isDark ? 'border-neutral-700' : 'border-neutral-200'}`}>
                                            <tbody>
                                                {compareResult.split(/\n|\r/).filter(Boolean).map((line, idx) => {
                                                    const cleanLine = stripMarkdown(line);
                                                    const [key, ...rest] = cleanLine.split(":");
                                                    if (rest.length > 0) {
                                                        return (
                                                            <tr key={idx} className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                                                                <td className={`font-semibold pr-4 py-2 whitespace-nowrap ${isDark ? 'text-neutral-100 bg-neutral-900' : 'text-neutral-800 bg-neutral-50'}`}>{key.trim()}</td>
                                                                <td className={`py-2 pl-2 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`}>{rest.join(":").trim()}</td>
                                                            </tr>
                                                        );
                                                    } else {
                                                        return (
                                                            <tr key={idx} className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                                                                <td className={`py-2 px-4 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`} colSpan={2}>{cleanLine}</td>
                                                            </tr>
                                                        );
                                                    }
                                                })}
                                            </tbody>
                                        </table>
                                    );
                                })()}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}   
