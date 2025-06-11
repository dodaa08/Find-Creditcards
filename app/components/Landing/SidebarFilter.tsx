import React from 'react';

const SidebarFilter = ({ onClose }: { onClose?: () => void }) => {
  return (
    <aside className="w-72 max-w-full bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 h-full p-6 flex flex-col gap-6 shadow-lg z-40">
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
          className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none "
        />
      </div>
      {/* Bank Filter */}
      <div>
        <h3 className="font-medium mb-2">Banks</h3>
        <div className="flex flex-col gap-1">
          <label><input type="checkbox" /> HDFC</label>
          <label><input type="checkbox" /> ICICI</label>
          <label><input type="checkbox" /> SBI</label>
        </div>
      </div>
      {/* Card Type Filter */}
      <div>
        <h3 className="font-medium mb-2">Card Type</h3>
        <div className="flex flex-col gap-1">
          <label><input type="checkbox" /> Credit</label>
          <label><input type="checkbox" /> Debit</label>
        </div>
      </div>
      {/* Fee Range Filter */}
      <div>
        <h3 className="font-medium mb-2">Fee Range</h3>
        <div className="flex flex-col gap-1">
          <label><input type="checkbox" /> No Annual Fee</label>
          <label><input type="checkbox" /> ₹500 - ₹1000</label>
          <label><input type="checkbox" /> ₹1000+</label>
        </div>
      </div>
      {/* Salary Filter */}
      <div>
        <h3 className="font-medium mb-2">Min. Salary</h3>
        <div className="flex flex-col gap-1">
          <label><input type="checkbox" /> ₹25,000+</label>
          <label><input type="checkbox" /> ₹50,000+</label>
        </div>
      </div>
      {/* Features Filter */}
      <div>
        <h3 className="font-medium mb-2">Features</h3>
        <div className="flex flex-col gap-1">
          <label><input type="checkbox" /> Lounge Access</label>
          <label><input type="checkbox" /> Cashback</label>
          <label><input type="checkbox" /> Travel</label>
        </div>
      </div>
      {/* Categories Filter */}
      <div>
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="flex flex-col gap-1">
          <label><input type="checkbox" /> Shopping</label>
          <label><input type="checkbox" /> Dining</label>
          <label><input type="checkbox" /> Fuel</label>
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilter; 