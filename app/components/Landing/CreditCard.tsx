"use client";
import React from "react";
import { CreditCard } from "@/app/Data/data";
import { useTheme } from "next-themes";

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
    <div className="relative  w-full max-w-xs aspect-[16/10] rounded-2xl shadow-xl overflow-auto h-64  dark:border-neutral-800 mx-auto " style={{ background: isDark ? card.color :  card.color }}>
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
                View Details
             </button>
             
        </div>
      </div>
      
      {/* Modal for AI summary */}
      {showModal && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center  ${isDark ? 'bg-black/40 text-white' : 'bg-white/40 text-black'}`}>
          <div className={`  rounded-lg shadow-xl max-w-lg w-full p-6 relative max-h-[80vh] overflow-y-auto ${isDark ? 'bg-black/90 text-white' : 'bg-white text-gray-900'}`}>
            <button
              className="absolute top-2 right-2 text-2xl text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
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
                <div className={`whitespace-pre-line text-base mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{summary}</div>
              )
            ) : modalType === 'benefits' ? (
              <div className={`space-y-2 text-sm ${isDark ? 'text-white' : 'text-black'}`}>
                <ul className="list-disc pl-5">
                  {card.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className={`space-y-2 text-sm ${isDark ? 'text-white' : 'text-black'}`}>
                <div><strong>Name:</strong> {card.name}</div>
                <div><strong>Bank:</strong> {card.bank}</div>
                <div><strong>Type:</strong> {card.type}</div>
                <div><strong>Annual Fee:</strong> {card.annualFee > 0 ? `₹${card.annualFee}/yr` : 'Free'}</div>
                <div><strong>Joining Fee:</strong> {card.joiningFee > 0 ? `₹${card.joiningFee}` : 'Free'}</div>
                <div><strong>Reward Rate:</strong> {card.rewardRate}</div>
                <div><strong>Welcome Bonus:</strong> {card.welcomeBonus}</div>
                <div><strong>Lounge Access:</strong> {card.loungeAccess ? 'Yes' : 'No'}</div>
                <div><strong>Fuel Surcharge:</strong> {card.fuelSurcharge ? 'Yes' : 'No'}</div>
                <div><strong>Min. Salary:</strong> {card.minSalary ? `₹${card.minSalary}` : 'N/A'}</div>
                <div><strong>Categories:</strong> {card.categories.join(', ')}</div>
                <div><strong>Rating:</strong> {card.rating}</div>
                <div><strong>Description:</strong> {card.description}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 