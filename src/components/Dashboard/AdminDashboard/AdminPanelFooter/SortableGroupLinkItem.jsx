import SwalUtils from '@/utils/sweetAlert';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaGripVertical, FaTrash } from 'react-icons/fa';

const SortableGroupLinkItem = ({ link, gIndex, iIndex, updateGroupLink, deleteGroupLink }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: link.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleIsExternal = (value) => {
    if (value) {
      SwalUtils.info('Link set as external');
    } else {
      SwalUtils.info('Link set as internal');
    }
    updateGroupLink(gIndex, iIndex, 'is_external', value);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-wrap justify-between
       gap-sm my-sm p-sm rounded-md border border-black/10 hover:bg-black/5"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-move p-xs text-black/50"
        aria-label="Drag group link"
      >
        <FaGripVertical />
      </button>
      <input
        value={link.label}
        onChange={(e) => updateGroupLink(gIndex, iIndex, 'label', e.target.value)}
        placeholder="Label"
        className="border border-black/10 px-lg py-xs rounded-md w-full lg:w-[40%]"
      />
      <input
        value={link.url}
        onChange={(e) => updateGroupLink(gIndex, iIndex, 'url', e.target.value)}
        placeholder="URL"
        className="border border-black/10 px-lg py-xs rounded-md w-full lg:w-[40%]"
      />
      <input
        checked={link.is_external}
        title="If provided link is external or want to open in new tab then check this."
        onChange={(e) => handleIsExternal(e.target.checked)}
        type="checkbox"
        className="border border-black/10 px-lg py-xs rounded-md lg:w-[3%]"
      />
      <button
        className="text-red-400 cursor-pointer text-xl"
        onClick={() => SwalUtils.confirm(() => deleteGroupLink(gIndex, iIndex))}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default SortableGroupLinkItem;
