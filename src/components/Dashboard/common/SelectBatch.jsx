import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react'; // <-- Import from lucide-react

const SelectBatch = ({ batches }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(batches[0]);
  const dropdownRef = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (batch) => {
    setSelectedBatch(batch);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-100" ref={dropdownRef}>
      {/* --- Dropdown Trigger Button --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex items-center justify-between w-full px-4 py-3 bg-white border border-black/10 rounded-lg shadow-sm text-black/80 focus:outline-none"
      >
        <span className="font-medium truncate">{selectedBatch}</span>
        {/* --- Replaced SVG with Lucide icon --- */}
        <span className="w-5 h-5 flex items-center justify-center border border-black/20 rounded-full">
          <ChevronDown
            className={`text-black/50 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            aria-hidden="true"
          />
        </span>
      </button>

      {/* --- Dropdown Menu List --- */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-black/10 rounded-lg shadow-xl overflow-hidden">
          <ul className="py-1">
            {batches.map((batch) => (
              <li
                key={batch}
                onClick={() => handleSelect(batch)}
                className="px-4 py-3 text-black/80 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
              >
                {batch}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="mt-sm">*Select your batch*</p>
    </div>
  );
};

export default SelectBatch;
