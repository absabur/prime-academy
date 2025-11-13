import React from 'react';

const ToggleButton = ({ isActive, handleToggle, id }) => {
  // Track color changes based on active state
  const trackClasses = isActive
    ? 'bg-primary' // Active Blue
    : 'bg-black/20'; // Inactive Yellow

  // Thumb translation for smooth movement
  const thumbPositionClass = isActive
    ? 'translate-x-6' // 24px for Tailwind spacing (6 * 4px)
    : 'translate-x-0'; // Default start

  return (
    <div className="flex items-center">
      <label
        htmlFor={id}
        role="switch"
        aria-checked={isActive}
        className={`relative inline-flex items-center w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${trackClasses}`}
      >
        {/* Hidden input for accessibility */}
        <input
          type="checkbox"
          id={id}
          className="sr-only" // better than hidden for accessibility
          checked={isActive}
          onChange={(e) => handleToggle(e.target.checked)}
        />

        {/* Thumb */}
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${thumbPositionClass}`}
        ></span>
      </label>
    </div>
  );
};

export default ToggleButton;
