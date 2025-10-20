import React from 'react';
import './css/tabButton.css';

const TabButtons = ({ data, selected, setSelected }) => {
  return (
    <div>
      {/* Desktop tabs */}
      <div className="hidden md:flex border-b-primary border-b-1 space-x-5 flex-wrap mb-xl">
        {data?.map((item, index) => (
          <button
            key={index}
            className={`tab-button cursor-pointer h-10 w-30 px-md flex items-center justify-center w-[fit-content] min-w-[180px] rounded relative top-0.5 text-black text-base ${
              selected === item.category
                ? 'bg-secondary/30 text-black font-bold text-base border-b-5 border-b-secondary'
                : 'border-b-5 border-b-transparent'
            } ${selected == null ? 'bg-secondary/30 text-black font-bold text-base' : ''}`}
            onClick={() => setSelected(item.category)}
          >
            {item.category}
          </button>
        ))}
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden mb-4">
        <select
          className="w-full border px-4 py-2 rounded"
          onChange={(e) => setSelected(e.target.value)}
        >
          {data?.map((item, index) => (
            <option key={index} value={item.category}>
              {item.category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TabButtons;
