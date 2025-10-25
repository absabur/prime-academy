import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SortableGroupLinkItem from './SortableGroupLinkItem';
import { FaGripVertical, FaTrash } from 'react-icons/fa';
import { useMemo } from 'react';
import SwalUtils from '@/utils/sweetAlert';

// ... SortableLinkGroup component (no changes)
const SortableLinkGroup = ({
  group,
  gIndex,
  updateGroup,
  deleteGroup,
  addGroupLink,
  updateGroupLink,
  deleteGroupLink,
  setData,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: group.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const linkIds = useMemo(() => group.links.map((l) => l.id), [group.links]);

  const handleGroupLinkDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setData((prev) => {
        const newGroups = prev.link_groups.map((g) => {
          if (g.id === group.id) {
            const oldIndex = g.links.findIndex((l) => l.id === active.id);
            const newIndex = g.links.findIndex((l) => l.id === over.id);
            const reorderedLinks = arrayMove(g.links, oldIndex, newIndex);
            return { ...g, links: reorderedLinks };
          }
          return g;
        });
        return { ...prev, link_groups: newGroups };
      });
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="col-span-4 mt-lg rounded-md shadow-md py-md px-sm border border-black/20"
    >
      <div className="flex items-center gap-sm">
        <button
          {...attributes}
          {...listeners}
          className="cursor-move p-xs text-black/50"
          aria-label="Drag link group"
        >
          <FaGripVertical />
        </button>
        <input
          value={group.title}
          onChange={(e) => updateGroup(gIndex, 'title', e.target.value)}
          className="font-bold w-full shadow-sm border border-black/20 px-lg py-xs rounded-md"
        />
        <button
          className="text-red-400 cursor-pointer text-xl"
          onClick={() => SwalUtils.confirm(() => deleteGroup(gIndex))}
        >
          <FaTrash />
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleGroupLinkDragEnd}
      >
        <SortableContext items={linkIds} strategy={verticalListSortingStrategy}>
          {group.links.map((link, iIndex) => (
            <SortableGroupLinkItem
              key={link.id}
              link={link}
              gIndex={gIndex}
              iIndex={iIndex}
              updateGroupLink={updateGroupLink}
              deleteGroupLink={deleteGroupLink}
            />
          ))}
        </SortableContext>
      </DndContext>

      <button className="ml-md mt-sm" onClick={() => addGroupLink(gIndex)}>
        ➕ Add Link
      </button>
    </div>
  );
};

export default SortableLinkGroup;
