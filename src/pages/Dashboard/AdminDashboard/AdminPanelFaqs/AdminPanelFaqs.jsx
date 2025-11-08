import { useEffect, useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFaqsAdmin, addFaqs, editFaq } from '@/redux/faqs/faqsAction';
import { clearError, clearMessage } from '@/redux/faqs/faqsSlice';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import LoadingDashboard from '@/components/Dashboard/common/LoadingDashboard';
import SwalUtils from '@/utils/sweetAlert';
import { Plus } from 'lucide-react';
import { SortableCategory } from '../../../../components/Dashboard/AdminDashboard/AdminPanelFaq/SortableCategory';
import { updateFaqCategoryOrder } from '../../../../redux/faqs/faqsAction';

// --- Main Component ---
export default function FaqManager() {
  const { adminPanelFaqs, loadingFaqs, loadingActionFaqs, error, message } = useSelector(
    (state) => state.faq
  );
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const sensors = useSensors(useSensor(PointerSensor));
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (message) {
      SwalUtils.success(message);
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  useEffect(() => {
    dispatch(fetchFaqsAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(adminPanelFaqs)) {
      setCategories(adminPanelFaqs);
    }
  }, [adminPanelFaqs]);

  const handleAddCategory = () => {
    if (!newCategoryName) {
      SwalUtils.warning('Enter Category Name', 'Category Required');
      return;
    }
    const newCategory = {
      faq_nav: newCategoryName,
      faq_nav_order: categories?.length + 1,
      title: newCategoryName,
      faqs: [],
      is_active: true,
    };
    dispatch(addFaqs(newCategory));
    setNewCategoryName('');
  };

  const handleCategoryDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = categories?.findIndex((c) => c.faq_nav_slug === active.id);
    const newIndex = categories?.findIndex((c) => c.faq_nav_slug === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = arrayMove(categories, oldIndex, newIndex).map((cat, i) => ({
      ...cat,
      faq_nav_order: i + 1,
    }));

    setCategories(newOrder);
    dispatch(updateFaqCategoryOrder(newOrder));
  };

  const handleAddEditFaq = (category, faq, id, status = '') => {
    let updatedCategory;
    if (id) {
      if (status == 'edit') {
        // Edit existing FAQ
        updatedCategory = {
          ...category,
          faqs: category.faqs.map((item) =>
            item.id === id ? { ...item, question: faq.question, answer: faq.answer } : item
          ),
        };
      }
      if (status == 'delete') {
        // Edlete FAQ
        updatedCategory = {
          ...category,
          faqs: category.faqs.filter((item) => item.id !== id),
        };
      }
    } else {
      //  Add new FAQ
      updatedCategory = {
        ...category,
        faqs: [...(category.faqs || []), faq],
      };
    }

    // ✅ Dispatch updated category
    dispatch(editFaq({ id: category.id, data: updatedCategory }));
  };

  const handleFaqDragEnd = (categorySlug, event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const catIndex = categories?.findIndex((c) => c.faq_nav_slug === categorySlug);
    if (catIndex === -1) return;

    const currentCategory = categories[catIndex];
    const faqs = currentCategory.faqs || [];

    const oldIndex = faqs.findIndex((f) => f.id === active.id);
    const newIndex = faqs.findIndex((f) => f.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newFaqs = arrayMove(faqs, oldIndex, newIndex).map((faq, i) => ({
      ...faq,
      order: i + 1,
    }));

    const updatedCategory = { ...currentCategory, faqs: newFaqs };
    const updatedCats = [...categories];
    updatedCats[catIndex] = updatedCategory;
    setCategories(updatedCats);
    dispatch(editFaq({ id: updatedCategory.id, data: updatedCategory }));
  };

  const handleToggleActive = (categoryId, faqId) => {
    const catIndex = categories.findIndex((item) => item.faq_nav_slug == categoryId);
    if (catIndex === -1) return;

    const findCategory = categories[catIndex];
    const faqs = findCategory.faqs || [];

    const updateFaqStatus = faqs.map((item) =>
      item.id == faqId ? { ...item, is_active: !item.is_active } : item
    );

    const updateCategory = { ...findCategory, faqs: updateFaqStatus };
    const updatedCats = [...categories];
    updatedCats[catIndex] = updateCategory;
    setCategories(updatedCats);
    dispatch(editFaq({ id: updateCategory.id, data: updateCategory }));
  };

  const handleToggleCategoryActive = (categorySlug) => {
    const catIndex = categories.findIndex((c) => c.faq_nav_slug === categorySlug);
    if (catIndex === -1) return;

    const updatedCategory = {
      ...categories[catIndex],
      is_active: !categories[catIndex].is_active,
    };

    const updatedCats = [...categories];
    updatedCats[catIndex] = updatedCategory;
    setCategories(updatedCats);
    dispatch(editFaq({ id: updatedCategory.id, data: updatedCategory }));
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen p-4">
      <LoadingDashboard loading={loadingFaqs || loadingActionFaqs} />
      <DashBoardHeader title={'FAQs Management'} searchBar={false} />

      <div className="mx-auto">
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
                onAddEditFaq={handleAddEditFaq}
                onToggleFaqActive={handleToggleActive}
                onToggleCategoryActive={() => handleToggleCategoryActive(category.faq_nav_slug)}
                onFaqDragEnd={handleFaqDragEnd}
              />
            ))}
          </SortableContext>
        </DndContext>

        <div className="bg-white rounded-lg p-4 shadow-lg mt-4">
          <input
            className="shadow-inner rounded-lg px-4 py-3 w-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter New Category Name"
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="w-full mt-3 text-lg font-semibold rounded-lg flex items-center justify-center border-2 border-gray-300 border-dashed hover:border-blue-500 hover:text-blue-600 text-gray-600 p-3 transition-colors select-none"
          >
            <Plus className="w-5 h-5 mr-2" /> Add Category
          </button>
        </div>
      </div>
    </div>
  );
}
