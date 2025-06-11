"use client";
import React from "react";
import { CreditCard } from "@/app/Data/data";
import { useTheme } from "next-themes";

export default function CreditCardCard({ card }: { card: CreditCard }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="relative  w-full max-w-xs aspect-[16/10] rounded-2xl shadow-xl overflow-auto h-64 border border-neutral-200 dark:border-neutral-800 mx-auto " style={{ background: isDark ? card.color :  card.color }}>
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
             <button className="bg-white text-black px-4 py-2 rounded-md cursor-pointer mb-2">
                View Details
             </button>
             <button className="bg-white text-black px-4 py-2 rounded-md cursor-pointer mb-2">Visit Bank</button>
        </div>
      </div>
    </div>
  );
} 