import React, { useEffect, useState } from 'react';
import ToggleButton from '../../../common/ToggleButton'; // Ensure this path is correct
import { GripVertical, Pencil, Trash2 } from 'lucide-react';

const WhyEnrollCard = ({ item, onDelete, onToggle, onEdit }) => {
  const [imgSrc, setImgSrc] = useState(null);

  // Logic to handle Image Preview (File object vs URL string)
  useEffect(() => {
    if (item.icon instanceof File) {
      const url = URL.createObjectURL(item.icon);
      setImgSrc(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImgSrc(item.icon);
    }
  }, [item.icon]);

  return (
    <div
      className="
        flex w-full items-center justify-between px-5 py-4 
        rounded-2xl border border-gray-200 shadow-sm 
        bg-white/70 backdrop-blur-md 
        hover:shadow-md hover:bg-white/90 
        transition-all duration-300
      "
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Drag Handle */}
        <div className="cursor-grab text-gray-400 hover:text-gray-600 flex-shrink-0">
          <GripVertical size={18} />
        </div>

        {/* Image Display (Replaces the Order Number) */}
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-50">
          {imgSrc ? (
            <img src={imgSrc} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 text-center leading-tight">
              No Img
            </div>
          )}
        </div>

        {/* Title & Text */}
        <div className="min-w-0 flex flex-col">
          <h3
            title={item.title}
            className="text-base font-semibold text-gray-900 truncate max-w-[200px]"
          >
            {item.title}
          </h3>
          {/* Optional: Show a snippet of the text below the title */}
          <p className="text-xs text-gray-500 truncate max-w-[200px]">{item.text}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0 ml-4">
        {/* Status Badge */}
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium
            ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}
          `}
        >
          {item.is_active ? 'Active' : 'Inactive'}
        </span>

        {/* Toggle Button */}
        <ToggleButton
          handleToggle={(value) => onToggle(item.id, value)}
          id={item.id}
          isActive={item.is_active}
        />

        {/* Edit Button */}
        <button
          onClick={() => onEdit(item.id)}
          type="button"
          className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition"
        >
          <Pencil className="w-5 h-5" />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(item.id)}
          type="button"
          className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default WhyEnrollCard;
