// "use client";
// import React from "react";
// import { CreditCard, CreditCardData } from "../../Data/data";
// import { useTheme } from "next-themes";

// function CardTag({ tag }: { tag: string }) {
//   return (
//     <span className="inline-block bg-neutral-100 dark:bg-neutral-800 text-xs rounded px-2 py-1 mr-2 mb-1 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700">
//       {tag}
//     </span>
//   );
// }

// function CreditCard({ card }: { card: CreditCardData }) {
//   const { theme } = useTheme();
//   const isDark = theme === "dark";
//   return (
//     <div
//       className={`flex flex-col justify-between rounded-2xl shadow-md p-0 overflow-hidden border transition-all duration-300 ${card.borderColor ? card.borderColor : 'border-transparent'} ${isDark ? 'bg-neutral-900' : 'bg-white'} ${isDark ? 'text-white' : 'text-black'} mx-auto w-full max-w-xs min-h-[420px]`}
//       style={{ boxShadow: isDark ? '0 4px 24px 0 #0002' : '0 4px 24px 0 #0001' }}
//     >
//       {/* Card Top */}
//       <div className={`p-4 ${card.color} flex flex-col gap-1`}
//         style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
//       >
//         <div className="flex items-center justify-between">
//           <div className="flex flex-col">
//             <span className="text-xs opacity-80 font-medium">{card.bank}</span>
//             <span className="text-lg font-bold leading-tight">{card.name}</span>
//           </div>
//           <span className="text-white/80">
//             <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="currentColor" opacity=".1"/><rect x="6" y="7" width="12" height="2" rx="1" fill="currentColor"/><rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor"/><rect x="6" y="15" width="8" height="2" rx="1" fill="currentColor"/></svg>
//           </span>
//         </div>
//         <div className="flex items-center gap-2 mt-1">
//           <span className="text-xs">⭐ {card.rating}</span>
//         </div>
//       </div>
//       {/* Card Body */}
//       <div className="flex-1 flex flex-col justify-between p-4 gap-2">
//         <div className="flex items-center justify-between mb-1">
//           <span className="text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-neutral-700 dark:text-neutral-200">{card.type}</span>
//           <span className="text-xs font-semibold opacity-80">Annual Fee <span className="text-base font-bold">{card.fee}</span></span>
//         </div>
//         <div className="text-sm opacity-90 mb-2 line-clamp-2">{card.description}</div>
//         <ul className="text-xs mb-2 space-y-1">
//           {card.features.map((f, i) => (
//             <li key={i} className="flex items-center gap-2">
//               <span className="inline-block text-yellow-500">&#x1F4B0;</span>
//               {f}
//             </li>
//           ))}
//         </ul>
//         <div className="flex flex-wrap gap-1 mb-2">
//           {card.tags.map((tag, i) => <CardTag tag={tag} key={i} />)}
//         </div>
//         <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2 text-xs mt-2">
//           <span className="font-semibold">Welcome Bonus</span><br />
//           {card.bonus}
//         </div>
//       </div>
//       {/* Card Actions */}
//       <div className="flex gap-2 p-4 pt-0">
//         <button className="flex-1 rounded-lg border border-neutral-300 dark:border-neutral-700 py-2 font-medium bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">Compare</button>
//         <button className="flex-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 transition-colors">View Details</button>
//       </div>
//     </div>
//   );
// }

// export default function CreditCardList() {
//   return (
//     <div className="w-full flex flex-wrap justify-center gap-6 py-8">
//       {cardData.map(card => (
//         <CreditCard card={card} key={card.id} />
//       ))}
//     </div>
//   );
// } 