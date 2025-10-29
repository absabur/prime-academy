import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
// --- Helper Component for Sortable Slides ---
// We create this component to encapsulate the dnd-kit logic
export default function SortableSlideItem({ id, field, index, register, remove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 bg-gray-50 p-2 rounded-md border"
    >
      {/* Drag Handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab p-1 text-gray-500 hover:text-gray-800"
      >
        <GripVertical size={18} />
      </button>

      {/* Slide Text Input */}
      <input
        type="text"
        {...register(`slides.${index}.text`, { required: 'Slide text cannot be empty' })}
        className="w-full border border-black/10 px-md py-sm rounded-md focus:shadow-lg focus:outline-none"
        placeholder="Enter slide text"
        defaultValue={field.text} // Important for default value
      />

      {/* Hidden ID input (if needed, otherwise RHF handles it) */}
      {/* <input type="hidden" {...register(`slides.${index}.id`)} defaultValue={field.id} /> */}

      {/* Delete Button */}
      <button
        type="button"
        onClick={() => remove(index)}
        className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-md"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
