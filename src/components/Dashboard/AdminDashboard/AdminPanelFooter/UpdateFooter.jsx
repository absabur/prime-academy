import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
// No nanoid import needed
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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { fetchFootersAdmin, updateFooter } from '@/redux/footer/footerAction';
import { clearMessage } from '@/redux/footer/footerSlice';
import SortableLinkGroup from './SortableLinkGroup';
import SortableSocialLinkItem from './SortableSocialLinkItem';
import SwalUtils from '@/utils/sweetAlert';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { FaPlus } from 'react-icons/fa';
import { fetchFooters } from '../../../../redux/footer/footerAction';

// Main Component
const UpdateFooter = ({ setModal }) => {
  const dispatch = useDispatch();
  const { adminPanelFooter, message } = useSelector((state) => state.footer);

  const [data, setData] = useState(null);

  // D&D Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    dispatch(fetchFootersAdmin());
  }, [dispatch]);

  // show message  message
  useEffect(() => {
    if (message) {
      setModal(false);
      SwalUtils.success(message);
      dispatch(clearMessage());
      dispatch(fetchFootersAdmin());
      dispatch(fetchFooters());
    }
  }, [message]);

  // Process data on load to add unique IDs
  useEffect(() => {
    if (adminPanelFooter) {
      const processedFooter = {
        ...adminPanelFooter,
        // ✅ FIX 1: Use crypto.randomUUID() as a fallback
        social_links: adminPanelFooter.social_links.map((link) => ({
          ...link,
          id: link.id || crypto.randomUUID(),
        })),
        link_groups: adminPanelFooter.link_groups.map((group) => ({
          ...group,
          id: group.id || crypto.randomUUID(),
          links: group.links.map((link) => ({
            ...link,
            id: link.id || crypto.randomUUID(),
          })),
        })),
      };
      setData(processedFooter);
    }
  }, [adminPanelFooter]);

  // ✅ FIX 2 (Rules of Hooks): Move useMemo hooks *before* the early return
  const socialLinkIds = useMemo(() => (data ? data.social_links.map((s) => s.id) : []), [data]);
  const groupIds = useMemo(() => (data ? data.link_groups.map((g) => g.id) : []), [data]);

  // Early return MUST come *after* all hooks
  if (!data) return <p>Loading...</p>;

  // ✅ Update field handler
  const updateField = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Update Social Link
  const updateSocialLink = (index, key, value) => {
    const newLinks = [...data.social_links];
    newLinks[index][key] = value;
    setData({ ...data, social_links: newLinks });
  };

  // ✅ Delete Social Link
  const deleteSocialLink = (index) => {
    const newLinks = data.social_links.filter((_, i) => i !== index);
    setData({ ...data, social_links: newLinks });
  };

  // ✅ Add Social (now with ID)
  const addSocial = () => {
    setData({
      ...data,
      social_links: [
        ...data.social_links,
        {
          platform: '',
          url: '',
          order: data.social_links.length + 1,
          id: crypto.randomUUID(), // ✅ FIX 3: Use crypto.randomUUID()
        },
      ],
    });
  };

  // ... (Group update/delete functions) ...
  const updateGroup = (gIndex, key, value) => {
    setData((prev) => {
      const groups = prev.link_groups.map((group, idx) =>
        idx === gIndex ? { ...group, [key]: value } : group
      );
      return { ...prev, link_groups: groups };
    });
  };

  const updateGroupLink = (gIndex, iIndex, key, value) => {
    setData((prev) => {
      const groups = prev.link_groups.map((group, idx) => {
        if (idx === gIndex) {
          const links = group.links.map((link, i) =>
            i === iIndex ? { ...link, [key]: value } : link
          );
          return { ...group, links };
        }
        return group;
      });
      return { ...prev, link_groups: groups };
    });
  };

  const deleteGroupLink = (gIndex, iIndex) => {
    setData((prev) => {
      const groups = prev.link_groups.map((group, idx) => {
        if (idx === gIndex) {
          const links = group.links.filter((_, i) => i !== iIndex);
          return { ...group, links };
        }
        return group;
      });
      return { ...prev, link_groups: groups };
    });
  };

  // ✅ Add Link to group (now with ID)
  const addGroupLink = (gIndex) => {
    setData((prev) => {
      const groups = prev.link_groups.map((group, idx) => {
        if (idx === gIndex) {
          const links = [
            ...group.links,
            {
              label: '',
              url: '',
              is_external: false,
              order: group.links.length + 1,
              id: crypto.randomUUID(), // ✅ FIX 3: Use crypto.randomUUID()
            },
          ];
          return { ...group, links };
        }
        return group;
      });
      return { ...prev, link_groups: groups };
    });
  };

  // Delete entire group
  const deleteGroup = (gIndex) => {
    setData((prev) => ({
      ...prev,
      link_groups: prev.link_groups.filter((_, i) => i !== gIndex),
    }));
  };

  // ✅ Add new group (now with ID)
  const addGroup = () => {
    setData((prev) => ({
      ...prev,
      link_groups: [
        ...prev.link_groups,
        {
          title: 'New Section',
          order: prev.link_groups.length + 1,
          links: [],
          id: crypto.randomUUID(), // ✅ FIX 3: Use crypto.randomUUID()
        },
      ],
    }));
  };

  // ✅ D&D Handlers
  const handleSocialDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setData((prev) => {
        const oldIndex = prev.social_links.findIndex((item) => item.id === active.id);
        const newIndex = prev.social_links.findIndex((item) => item.id === over.id);
        return {
          ...prev,
          social_links: arrayMove(prev.social_links, oldIndex, newIndex),
        };
      });
    }
  };

  const handleGroupDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setData((prev) => {
        const oldIndex = prev.link_groups.findIndex((item) => item.id === active.id);
        const newIndex = prev.link_groups.findIndex((item) => item.id === over.id);
        return {
          ...prev,
          link_groups: arrayMove(prev.link_groups, oldIndex, newIndex),
        };
      });
    }
  };

  // ✅ handleSubmit
  const handleSubmit = () => {
    const payload = {
      ...data,
      social_links: data.social_links.map((link, index) => ({
        ...link,
        order: index + 1,
      })),
      link_groups: data.link_groups.map((group, gIndex) => ({
        ...group,
        order: gIndex + 1,
        links: group.links.map((link, lIndex) => ({
          ...link,
          order: lIndex + 1,
        })),
      })),
    };
    dispatch(updateFooter({ ...payload, logo_url: null }));
  };

  return (
    <div className="text-black pb-xl w-full bg-white rounded-md p-sm">
      <h2 className="text-center font-bold text-xl py-lg">Update Footer Section</h2>

      <div className="flex flex-col">
        {/* Contact & Brand */}
        <div className="flex gap-lg items-start flex-wrap rounded-md py-md px-sm border border-black/10">
          <div className="w-full md:w-[47%]">
            <label>Phone:</label>
            <input
              className="border border-black/10 px-lg py-xs rounded-md w-full"
              value={data.phone}
              onChange={(e) => updateField('phone', e.target.value)}
            />
          </div>

          <div className="w-full md:w-[47%]">
            <label>Email:</label>
            <input
              className="border border-black/10 px-lg py-xs rounded-md w-full"
              value={data.email}
              onChange={(e) => updateField('email', e.target.value)}
            />
          </div>

          <div className="w-full md:w-[47%]">
            <label>Copy Right Name:</label>
            <input
              className="border border-black/10 px-lg py-xs rounded-md w-full"
              value={data.copyright_name}
              onChange={(e) => updateField('copyright_name', e.target.value)}
            />
          </div>

          <div className="w-full rounded-md">
            <h4>Social Links</h4>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleSocialDragEnd}
            >
              <SortableContext items={socialLinkIds} strategy={verticalListSortingStrategy}>
                {data.social_links.map((item, idx) => (
                  <SortableSocialLinkItem
                    key={item.id}
                    item={item}
                    idx={idx}
                    updateSocialLink={updateSocialLink}
                    deleteSocialLink={deleteSocialLink}
                  />
                ))}
              </SortableContext>
            </DndContext>
            <button
              className="w-full flex items-center justify-center gap-sm p-sm rounded-md border border-black/10 hover:border-primary hover:border-dashed"
              onClick={addSocial}
            >
              <FaPlus /> Add Social Link
            </button>
          </div>
        </div>

        {/* Link Groups D&D Context */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleGroupDragEnd}
        >
          <SortableContext items={groupIds} strategy={verticalListSortingStrategy}>
            {data.link_groups.map((group, gIndex) => (
              <SortableLinkGroup
                key={group.id}
                group={group}
                gIndex={gIndex}
                updateGroup={updateGroup}
                deleteGroup={deleteGroup}
                addGroupLink={addGroupLink}
                updateGroupLink={updateGroupLink}
                deleteGroupLink={deleteGroupLink}
                setData={setData}
              />
            ))}
          </SortableContext>
        </DndContext>
        <button
          className="text-lg font-semibold mt-lg p-xl flex items-center justify-center gap-sm border rounded-md mb-md border-black/10 hover:border-primary hover:border-dashed"
          onClick={addGroup}
        >
          <FaPlus /> Add New Section
        </button>

        {/* About & Address */}
        <div className="md:col-span-2">
          <label>Description</label>
          <textarea
            value={data.description}
            onChange={(e) => updateField('description', e.target.value)}
            className="w-full p-md text-whie border border-black/10 px-lg py-xs rounded-md mt-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label>Address</label>
          <textarea
            value={data.address}
            onChange={(e) => updateField('address', e.target.value)}
            className="w-full p-md text-whie border border-black/10 px-lg py-xs rounded-md mt-sm"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-xl text-center flex items-center justify-center gap-lg flex-wrap">
        <SecondaryButton
          className="text-black border-primary hover:bg-secondary hover:text-white hover:border-secondary"
          onClick={() => setModal(false)}
          text={`Cancel`}
        />
        <PrimaryButton onClick={handleSubmit} text={`Save All Footer Changes`}></PrimaryButton>
      </div>
    </div>
  );
};

export default UpdateFooter;
