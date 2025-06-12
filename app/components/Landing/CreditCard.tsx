"use client";
import React from "react";
import { CreditCard } from "@/app/Data/data";
import { useTheme } from "next-themes";

// Utility to strip markdown formatting and leading bullet chars
function stripMarkdown(text: string) {
  return text
    .replace(/^\s*([*-]|•)\s*/, '') // remove leading bullet or dash
    .replace(/\*\*|__|\*|_/g, '') // remove bold/italic
    .replace(/`/g, '') // remove code
    .replace(/\[|\]|\(|\)/g, '') // remove brackets/parentheses
    .trim();
}


export default function CreditCardCard({ card }: { card: CreditCard }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState<'summary' | 'benefits' | 'basics' | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [summary, setSummary] = React.useState("");

  const handleViewDetails = async () => {
    setShowModal(true);
    setModalType('summary');
    setLoading(true);
    setError(null);
    setSummary("");
    try {
      const response = await fetch("/api/card-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardId: card.id }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSummary(data.summary);
    } catch (e) {
      setError("An error occurred while fetching the summary.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewBenefits = () => {
    setShowModal(true);
    setModalType('benefits');
  };

  const handleViewBasics = () => {
    setShowModal(true);
    setModalType('basics');
  };

  return (
    <div className="relative w-full max-w-sm aspect-[16/10] rounded-2xl shadow-xl overflow-auto h-56 dark:border-neutral-800 mx-auto " style={{ background: isDark ? card.color :  card.color }}>
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-white/10 dark:bg-black/30 backdrop-blur-md z-0" />
      {/* Card content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          {/* Chip */}
          <svg width="38" height="28" viewBox="0 0 38 28" fill="none" className="drop-shadow-sm">
            <rect x="1" y="1" width="36" height="26" rx="6" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="8" y="8" width="22" height="12" rx="3" fill="#cbd5e1" />
          </svg>
          {/* Card type */}
          <span className="uppercase text-xs font-bold tracking-widest text-white/80 dark:text-white/60">{card.type}</span>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <span className="tracking-widest font-mono text-lg md:text-xl text-white/90 drop-shadow-sm select-none">
            {card.name}
          </span>
          <div className="flex items-center justify-between text-xs text-white/80">
            <span className="uppercase font-semibold tracking-wider">{card.bank}</span>
          </div>
            <span className="flex text-white/80 items-center justify-center text-sm">{card.annualFee > 0 ? `₹${card.annualFee}/yr` : 'Free'}</span>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-white/80">
          <span>⭐ {card.rating}</span>
          <span>{card.loungeAccess ? 'Lounge Access' : ''}</span>
        </div>
        <div className="flex items-center justify-between bottom-0 text-xs text-white/80">
        <button className="bg-white text-black px-4 py-2 rounded-md cursor-pointer mb-2" onClick={handleViewBasics}>Basics</button>
             
             <button className="bg-white text-black px-4 py-2 rounded-md cursor-pointer mb-2" onClick={handleViewBenefits}>Benefits</button>
             <button className="bg-white text-black px-4 py-2 rounded-md cursor-pointer mb-2" onClick={handleViewDetails}>
                AI Summary
             </button>
             
        </div>
      </div>
      
      {/* Modal for AI summary */}
      {showModal && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center  ${isDark ? 'bg-black/40 text-white' : 'bg-white/40 text-black'}`}>
          <div className={`  rounded-lg shadow-xl max-w-lg w-full p-6 relative max-h-[80vh] overflow-y-auto ${isDark ? 'bg-black/90 text-white' : 'bg-white text-gray-900'}`}>
            <button
              className="absolute top-2 cursor-pointer right-2 text-2xl text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">{card.name} {modalType === 'summary' ? 'Summary' : modalType === 'benefits' ? 'Benefits' : 'Basics'}</h2>
            {modalType === 'summary' ? (
              loading ? (
                <div className="flex items-center justify-center py-8">
                  <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                </div>
              ) : error ? (
                <div className="text-red-600 dark:text-red-400">{error}</div>
              ) : (
                <div className="mb-4">
                  {summary.trim().startsWith('|') ? (
                    // Markdown table rendering
                    (() => {
                      const lines = summary.trim().split(/\r?\n/).filter(l => l.trim().startsWith('|'));
                      if (lines.length < 2) return null;
                      const headers = lines[0].split('|').map(h => h.trim()).filter(Boolean);
                      const rows = lines.slice(2).map(row => row.split('|').map(cell => cell.trim()).filter(Boolean));
                      return (
                        <table className={`min-w-full text-sm md:text-base border rounded overflow-hidden ${isDark ? 'border-neutral-700' : 'border-neutral-200'}`}>
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
                      );
                    })()
                  ) : (
                    // Fallback: key-value or bullet rendering
                    <table className={`min-w-full text-sm md:text-base border rounded overflow-hidden ${isDark ? 'border-neutral-700' : 'border-neutral-200'}`}>
                      <tbody>
                        {summary.split(/\n|\r/).filter(Boolean).map((line, idx) => {
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
                  )}
                </div>
              )
            ) : modalType === 'benefits' ? (
              <div className="mb-4">
                <table className={`min-w-full text-sm md:text-base border rounded overflow-hidden ${isDark ? 'border-neutral-700' : 'border-neutral-200'}`}>
                  <thead>
                    <tr>
                      <th className={`font-bold px-4 py-2 ${isDark ? 'bg-neutral-900 text-neutral-100' : 'bg-neutral-50 text-neutral-800'}`}>Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {card.benefits.map((benefit, idx) => (
                      <tr key={idx} className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                        <td className={`px-4 py-2 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`}>{benefit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mb-4">
                <table className={`min-w-full text-sm md:text-base border rounded overflow-hidden ${isDark ? 'border-neutral-700' : 'border-neutral-200'}`}>
                  <tbody>
                    <tr className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                      <td className={`font-semibold pr-4 py-2 whitespace-nowrap ${isDark ? 'text-neutral-100 bg-neutral-900' : 'text-neutral-800 bg-neutral-50'}`}>Name</td>
                      <td className={`py-2 pl-2 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`}>{card.name}</td>
                    </tr>
                    <tr className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                      <td className={`font-semibold pr-4 py-2 whitespace-nowrap ${isDark ? 'text-neutral-100 bg-neutral-900' : 'text-neutral-800 bg-neutral-50'}`}>Bank</td>
                      <td className={`py-2 pl-2 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`}>{card.bank}</td>
                    </tr>
                    <tr className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                      <td className={`font-semibold pr-4 py-2 whitespace-nowrap ${isDark ? 'text-neutral-100 bg-neutral-900' : 'text-neutral-800 bg-neutral-50'}`}>Type</td>
                      <td className={`py-2 pl-2 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`}>{card.type}</td>
                    </tr>
                    <tr className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                      <td className={`font-semibold pr-4 py-2 whitespace-nowrap ${isDark ? 'text-neutral-100 bg-neutral-900' : 'text-neutral-800 bg-neutral-50'}`}>Annual Fee</td>
                      <td className={`py-2 pl-2 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`}>{card.annualFee > 0 ? `₹${card.annualFee}/yr` : 'Free'}</td>
                    </tr>
                    <tr className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                      <td className={`font-semibold pr-4 py-2 whitespace-nowrap ${isDark ? 'text-neutral-100 bg-neutral-900' : 'text-neutral-800 bg-neutral-50'}`}>Joining Fee</td>
                      <td className={`py-2 pl-2 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`}>{card.joiningFee > 0 ? `₹${card.joiningFee}` : 'Free'}</td>
                    </tr>
                    <tr className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                      <td className={`font-semibold pr-4 py-2 whitespace-nowrap ${isDark ? 'text-neutral-100 bg-neutral-900' : 'text-neutral-800 bg-neutral-50'}`}>Reward Rate</td>
                      <td className={`py-2 pl-2 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`}>{card.rewardRate}</td>
                    </tr>
                    <tr className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                      <td className={`font-semibold pr-4 py-2 whitespace-nowrap ${isDark ? 'text-neutral-100 bg-neutral-900' : 'text-neutral-800 bg-neutral-50'}`}>Welcome Bonus</td>
                      <td className={`py-2 pl-2 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`}>{card.welcomeBonus}</td>
                    </tr>
                    <tr className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                      <td className={`font-semibold pr-4 py-2 whitespace-nowrap ${isDark ? 'text-neutral-100 bg-neutral-900' : 'text-neutral-800 bg-neutral-50'}`}>Lounge Access</td>
                      <td className={`py-2 pl-2 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`}>{card.loungeAccess ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                      <td className={`font-semibold pr-4 py-2 whitespace-nowrap ${isDark ? 'text-neutral-100 bg-neutral-900' : 'text-neutral-800 bg-neutral-50'}`}>Fuel Surcharge</td>
                      <td className={`py-2 pl-2 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`}>{card.fuelSurcharge ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                      <td className={`font-semibold pr-4 py-2 whitespace-nowrap ${isDark ? 'text-neutral-100 bg-neutral-900' : 'text-neutral-800 bg-neutral-50'}`}>Min. Salary</td>
                      <td className={`py-2 pl-2 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`}>{card.minSalary ? `₹${card.minSalary}` : 'N/A'}</td>
                    </tr>
                    <tr className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                      <td className={`font-semibold pr-4 py-2 whitespace-nowrap ${isDark ? 'text-neutral-100 bg-neutral-900' : 'text-neutral-800 bg-neutral-50'}`}>Categories</td>
                      <td className={`py-2 pl-2 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`}>{card.categories.join(', ')}</td>
                    </tr>
                    <tr className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                      <td className={`font-semibold pr-4 py-2 whitespace-nowrap ${isDark ? 'text-neutral-100 bg-neutral-900' : 'text-neutral-800 bg-neutral-50'}`}>Rating</td>
                      <td className={`py-2 pl-2 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`}>{card.rating}</td>
                    </tr>
                    <tr className={`${isDark ? 'border-b border-neutral-800' : 'border-b border-neutral-100'}`}>
                      <td className={`font-semibold pr-4 py-2 whitespace-nowrap ${isDark ? 'text-neutral-100 bg-neutral-900' : 'text-neutral-800 bg-neutral-50'}`}>Description</td>
                      <td className={`py-2 pl-2 ${isDark ? 'text-white bg-neutral-800' : 'text-neutral-900 bg-white'}`}>{card.description}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 