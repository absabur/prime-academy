import React from 'react';
import ToggleButton from '../../../common/ToggleButton';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';

const ModulesCard = ({ moduleitem, onDelete, onToggle, onEdit }) => {
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
        <div className="cursor-grab text-gray-400 hover:text-gray-600">
          <GripVertical size={18} />
        </div>

        <div className="text-primary font-semibold">{moduleitem?.order}.</div>

        <h3
          title={moduleitem.title}
          className="text-base font-semibold text-gray-900 truncate max-w-[200px]"
        >
          {moduleitem.title}
        </h3>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0 ml-4">
        {/* Status Badge */}
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium
            ${moduleitem.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}
          `}
        >
          {moduleitem.is_active ? 'Active' : 'Inactive'}
        </span>

        <ToggleButton
          handleToggle={(value) => onToggle(value, moduleitem.id)}
          id={moduleitem.id}
          isActive={moduleitem.is_active}
        />

        {/* Edit Button */}
        <button
          onClick={() => {
            onEdit(moduleitem.order);
          }}
          type="button"
          className="p-2 text-gray-500 hover:text-primary rounded-full hover:bg-primary/10 transition"
        >
          <Pencil className="w-5 h-5" />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete()}
          type="button"
          className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ModulesCard;
