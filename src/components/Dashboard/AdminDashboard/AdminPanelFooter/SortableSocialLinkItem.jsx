import { capitalizeFirst } from '@/utils/capitalizeFirst';
import SwalUtils from '@/utils/sweetAlert';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaGripVertical, FaTrash } from 'react-icons/fa';

const SortableSocialLinkItem = ({ item, idx, updateSocialLink, deleteSocialLink }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const socialIcons = [
    'x',
    'twitter',
    'facebook',
    'linkedin',
    'instagram',
    'youtube',
    'tiktok',
    'snapchat',
    'spotify',
    'thread',
    'threads',
    'pinterest',
    'discord',
    'telegram',
  ];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="hover:bg-black/5 flex flex-wrap justify-between gap-sm items-center my-sm p-sm rounded-md border border-black/10 "
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-move p-xs text-black/50"
        aria-label="Drag social link"
      >
        <FaGripVertical />
      </button>
      <select
        onChange={(e) => updateSocialLink(idx, 'platform', e.target.value)}
        value={item.platform}
        className="border border-black/10 px-lg py-xs rounded-md w-full lg:w-[43%]"
      >
        <option value="">Select Icon</option>
        {socialIcons.map((item) => (
          <option key={item} value={item}>
            {capitalizeFirst(item)}
          </option>
        ))}
      </select>

      <input
        placeholder="URL"
        className="border border-black/10 px-lg py-xs rounded-md w-full lg:w-[43%]"
        value={item.url}
        onChange={(e) => updateSocialLink(idx, 'url', e.target.value)}
      />
      <button
        className="text-red-400 cursor-pointer text-xl"
        onClick={() => SwalUtils.confirm(() => deleteSocialLink(idx))}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default SortableSocialLinkItem;
