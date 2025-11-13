import React from 'react';
import { ChevronDown } from 'lucide-react';

const StatusSelect = ({ currentValue, statusChange, options = [] }) => {
  // Determine colors dynamically
  const colorMap = {
    published: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
    draft: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
    archived: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
    true: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
    false: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
  };

  const colors = colorMap[currentValue] || {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    dot: 'bg-gray-500',
  };

  return (
    <div
      className={`relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-colors duration-200 ${colors.bg} ${colors.text}`}
    >
      {/* Status Dot */}
      <span className={`h-2 w-2 rounded-full ${colors.dot}`}></span>

      {/* Select */}
      <select
        onChange={(e) => statusChange(e.target.value)}
        value={currentValue}
        className="appearance-none bg-transparent border-none p-0 focus:outline-none focus:ring-0 pr-5 cursor-pointer text-sm font-medium text-center"
      >
        {options.map((opt) => (
          <option key={opt.value.toString()} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Chevron */}
      <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <ChevronDown size={16} className="opacity-70" />
      </span>
    </div>
  );
};

export default StatusSelect;
