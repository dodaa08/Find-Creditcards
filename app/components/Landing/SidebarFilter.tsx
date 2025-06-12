import React from 'react';
import { useTheme } from 'next-themes';

interface SidebarFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedBanks: string[];
  onBankChange: (bank: string) => void;
  selectedTypes: string[];
  onTypeChange: (type: string) => void;
  selectedFees: string[];
  onFeeChange: (fee: string) => void;
  selectedSalaries: string[];
  onSalaryChange: (salary: string) => void;
  selectedFeatures: string[];
  onFeatureChange: (feature: string) => void;
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  onClose?: () => void;
}

const banks = ["Axis Bank", "Citi Bank", "HDFC", "Standard Chartered", "State Bank of India"];
const types = ["entry-level", "mid-tier", "premium"];
const fees = ["No Annual Fee", "₹500 - ₹1000", "₹1000+"];
const salaries = ["₹25,000+", "₹50,000+"];
const features = ["Lounge Access", "Cashback", "Travel"];
const categories = ["Shopping", "Dining", "Fuel", "Bill Payments", "EMI Offers"];

const SidebarFilter = ({
  search,
  onSearchChange,
  selectedBanks,
  onBankChange,
  selectedTypes,
  onTypeChange,
  selectedFees,
  onFeeChange,
  selectedSalaries,
  onSalaryChange,
  selectedFeatures,
  onFeatureChange,
  selectedCategories,
  onCategoryChange,
  onClose
}: SidebarFilterProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <aside className={`w-60 max-w-full h-full p-4 flex flex-col gap-6 shadow-lg z-40 transition-colors duration-300 ${isDark ? 'bg-neutral-900 text-white border-r border-neutral-800' : 'bg-white text-black border-r border-neutral-200'}`}>
      <div className="flex justify-between items-center mb-4">
        {/* <h2 className="text-xl font-semibold">Filters</h2> */}
        {onClose && (
          <button onClick={onClose} className="md:hidden p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800">
            <span className="sr-only">Close sidebar</span>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        )}
      </div>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search cards..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className={`w-full px-3 py-2 rounded    text-sm  focus:outline-none  transition-colors duration-300 ${isDark ? 'bg-neutral-900 text-white border border-neutral-700' : 'bg-white text-black border border-neutral-300'}`}
        />
      </div>
      {/* Bank Filter */}
      <div>
        <h3 className="font-medium mb-2">Banks</h3>
        <div className="flex flex-col gap-1">
          {banks.map(bank => (
            <label key={bank}><input type="checkbox" checked={selectedBanks.includes(bank)} onChange={() => onBankChange(bank)} /> {bank}</label>
          ))}
        </div>
      </div>
      {/* Card Type Filter */}
      <div>
        <h3 className="font-medium mb-2">Card Type</h3>
        <div className="flex flex-col gap-1">
          {types.map(type => (
            <label key={type}><input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => onTypeChange(type)} /> {type}</label>
          ))}
        </div>
      </div>
      {/* Fee Range Filter */}
      <div>
        <h3 className="font-medium mb-2">Fee Range</h3>
        <div className="flex flex-col gap-1">
          {fees.map(fee => (
            <label key={fee}><input type="checkbox" checked={selectedFees.includes(fee)} onChange={() => onFeeChange(fee)} /> {fee}</label>
          ))}
        </div>
      </div>
      {/* Salary Filter */}
      <div>
        <h3 className="font-medium mb-2">Min. Salary</h3>
        <div className="flex flex-col gap-1">
          {salaries.map(sal => (
            <label key={sal}><input type="checkbox" checked={selectedSalaries.includes(sal)} onChange={() => onSalaryChange(sal)} /> {sal}</label>
          ))}
        </div>
      </div>
      {/* Features Filter */}
      <div>
        <h3 className="font-medium mb-2">Features</h3>
        <div className="flex flex-col gap-1">
          {features.map(feature => (
            <label key={feature}><input type="checkbox" checked={selectedFeatures.includes(feature)} onChange={() => onFeatureChange(feature)} /> {feature}</label>
          ))}
        </div>
      </div>
      {/* Categories Filter */}
      <div>
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="flex flex-col gap-1">
          {categories.map(cat => (
            <label key={cat}><input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => onCategoryChange(cat)} /> {cat}</label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilter; 