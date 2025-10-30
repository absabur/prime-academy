'use client';
import { useEffect, useState } from 'react';
import { Disclosure, Switch } from '@headlessui/react';
import { GripVertical, ChevronUp, Pencil, Trash2, Plus, FolderPlus } from 'lucide-react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFaqs } from '@/redux/faqs/faqsAction';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';

// --- Main Component ---
export default function FaqManager() {
  const { faqs, loadingFaqs } = useSelector((state) => state.faq);
  const [categories, setCategories] = useState([]);
  const sensors = useSensors(useSensor(PointerSensor));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFaqs());
  }, []);

  useEffect(() => {
    setCategories(faqs);
  }, [faqs]);

  if (!categories.length) return;

  // ✅ Add new category
  const handleAddCategory = () => {
    const newCategory = {
      faq_nav: `New Category ${categories?.length + 1}`,
      faq_nav_slug: `new-category-${Date.now()}`,
      faq_nav_order: categories?.length + 1,
      faqs: [],
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleCategoryDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = categories?.findIndex((c) => c.faq_nav_slug === active.id);
    const newIndex = categories?.findIndex((c) => c.faq_nav_slug === over.id);

    const newOrder = arrayMove(categories, oldIndex, newIndex).map((cat, i) => ({
      ...cat,
      faq_nav_order: i + 1,
    }));

    setCategories(newOrder);
  };

  const handleFaqDragEnd = (categorySlug, event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const catIndex = categories?.findIndex((c) => c.faq_nav_slug === categorySlug);
    const faqs = categories[catIndex].faqs;

    const oldIndex = faqs.findIndex((f) => f.id === active.id);
    const newIndex = faqs.findIndex((f) => f.id === over.id);

    const newFaqs = arrayMove(faqs, oldIndex, newIndex).map((faq, i) => ({
      ...faq,
      order: i + 1,
    }));

    const updatedCats = [...categories];
    updatedCats[catIndex] = { ...categories[catIndex], faqs: newFaqs };
    setCategories(updatedCats);
  };

  const handleToggleActive = (categoryId, faqId) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.faq_nav_slug === categoryId
          ? {
              ...cat,
              faqs: cat.faqs.map((faq) =>
                faq.id === faqId ? { ...faq, is_active: !faq.is_active } : faq
              ),
            }
          : cat
      )
    );
  };

  return (
    <div className="w-full bg-gray-50">
      <LoadingDashboard loading={loadingFaqs} />
      <DashBoardHeader title={'FAQs Management'} searchBar={false} />

      {/* Category Drag Context */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleCategoryDragEnd}
      >
        <SortableContext
          items={categories?.map((cat) => cat.faq_nav_slug)}
          strategy={verticalListSortingStrategy}
        >
          {categories?.map((category) => (
            <SortableCategory
              key={category.faq_nav_slug}
              category={category}
              onAddFaq={() => console.log('Add FAQ', category.faq_nav_slug)}
              onToggleActive={handleToggleActive}
              onFaqDragEnd={handleFaqDragEnd}
            />
          ))}
          <div className="bg-white rounded-lg p-sm shadow-lg">
            <div
              onClick={(e) => {
                console.log('Add category');
              }}
              className="w-full text-lg font-semibold rounded-lg flex items-center justify-center border border-black/5 hover:border-primary hover:border-dashed p-md rounded-lgtext-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer select-none"
            >
              <Plus className="w-4 h-4" /> Add Category
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

// --- Sortable Category Component ---
function SortableCategory({ category, onAddFaq, onToggleActive, onFaqDragEnd }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: category.faq_nav_slug,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div ref={setNodeRef} style={style} className="bg-white shadow-md rounded-lg mb-4">
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between items-center rounded-lg bg-gray-100 px-4 py-3 text-left text-lg font-medium text-gray-900 hover:bg-black/5">
              <div className="flex items-center gap-2">
                {/* 👇 Drag handle (div, not button) */}
                <div
                  {...attributes}
                  {...listeners}
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
                >
                  <GripVertical className="w-5 h-5" />
                </div>
                <span>{category.faq_nav}</span>
              </div>

              <div className="flex items-center gap-4">
                <ChevronUp
                  className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-500 transition-transform`}
                />
              </div>
            </Disclosure.Button>

            <Disclosure.Panel className="px-4 pt-4 pb-2">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event) => onFaqDragEnd(category.faq_nav_slug, event)}
              >
                <SortableContext
                  items={category.faqs.map((faq) => faq.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {category.faqs.map((faq) => (
                      <SortableFaqCard
                        key={faq.id}
                        faq={faq}
                        onToggleActive={() => onToggleActive(category.faq_nav_slug, faq.id)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onAddFaq();
                }}
                className="w-full flex items-center justify-center border border-black/5 hover:border-primary hover:border-dashed p-md rounded-lg mt-md text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer select-none"
              >
                <Plus className="w-4 h-4" /> Add FAQ
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

import DOMPurify from 'dompurify';
import LoadingDashboard from '../../../../components/Dashboard/common/LoadingDashboard';
function SortableFaqCard({ faq, onToggleActive }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: faq.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-black/5 rounded-lg bg-white shadow-sm"
    >
      <Disclosure>
        {({ open }) => (
          <>
            {/* Header */}
            <Disclosure.Button className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-black/5 rounded-lg">
              <div className="flex items-center gap-2">
                {/* Drag handle */}
                <div
                  {...attributes}
                  {...listeners}
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
                >
                  <GripVertical className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">{faq.question}</h3>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`text-sm font-medium ${
                    faq.is_active ? 'text-green-700' : 'text-gray-500'
                  }`}
                >
                  {faq.is_active ? 'Active' : 'Inactive'}
                </span>
                <Switch
                  checked={faq.is_active}
                  onChange={onToggleActive}
                  onClick={(e) => e.stopPropagation()}
                  className={`${
                    faq.is_active ? 'bg-blue-600' : 'bg-black/10'
                  } relative inline-flex h-5 w-10 items-center rounded-full transition-colors`}
                >
                  <span
                    className={`${
                      faq.is_active ? 'translate-x-5' : 'translate-x-1'
                    } inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  <Pencil className="w-5 h-5" />
                </div>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </div>

                <ChevronUp
                  className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-500 transition-transform`}
                />
              </div>
            </Disclosure.Button>

            {/* Collapsible Answer */}
            <Disclosure.Panel className="px-4 pb-4 pt-2">
              <div className="p-3 border border-black/5 bg-black/5 rounded-lg">
                <div
                  className="policy-wrapper text-sm text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(faq.answer),
                  }}
                />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
