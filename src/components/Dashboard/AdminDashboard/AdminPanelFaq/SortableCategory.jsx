import { Disclosure, Switch } from '@headlessui/react';
import { GripVertical, ChevronUp, Pencil, Trash2, Plus } from 'lucide-react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableFaqCard } from '../../../../components/Dashboard/AdminDashboard/AdminPanelFaq/SortableFaqCard';
import { useEffect, useState } from 'react';
import Modal from '../../../common/Modal';
import AddEditFaq from './AddEditFaq';
import { useDispatch, useSelector } from 'react-redux';
import SwalUtils from '../../../../utils/sweetAlert';
import { deleteCategory, editFaq } from '../../../../redux/faqs/faqsAction';
import EditFaqCategory from './EditFaqCategory';

export function SortableCategory({
  category,
  onAddEditFaq,
  onToggleFaqActive,
  onToggleCategoryActive,
  onFaqDragEnd,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: category.faq_nav_slug,
  });
  const { message } = useSelector((state) => state.faq);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      setModal(false);
    }
  }, [message, dispatch]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const sensors = useSensors(useSensor(PointerSensor));
  const faqs = category.faqs || [];

  const updateFaqCategory = (category) => {
    dispatch(editFaq({ id: category.id, data: category }));
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-white shadow-md rounded-lg mb-4">
      {modal && (
        <Modal setModal={setModal} noClose={true}>
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            {modalType == 'add-faq' && (
              <AddEditFaq
                onCancel={() => setModal(false)}
                category={category}
                onSubmit={onAddEditFaq}
              />
            )}
            {modalType == 'edit-faq-category' && (
              <EditFaqCategory
                onCancel={() => setModal(false)}
                category={category}
                onSubmit={updateFaqCategory}
                title="Update Faq Category"
                defaultValues={{ title: category.title }}
              />
            )}
          </div>
        </Modal>
      )}
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button
              as="div"
              className="flex w-full justify-between items-center rounded-t-lg bg-gray-100 px-4 py-3 text-left text-lg font-medium text-gray-900 hover:bg-gray-200/60"
            >
              <div className="flex items-center gap-3">
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
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-4 bg-white px-3 py-1.5 rounded-md shadow-sm ml-auto mr-4"
                >
                  <span
                    className={`text-sm font-medium ${category.is_active ? 'text-green-700' : 'text-gray-500'}`}
                  >
                    {category.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <Switch
                    checked={!!category.is_active}
                    onChange={onToggleCategoryActive}
                    className={`${category.is_active ? 'bg-blue-600' : 'bg-black/10'} relative inline-flex h-5 w-10 items-center rounded-full transition-colors`}
                  >
                    <span
                      className={`${category.is_active ? 'translate-x-5' : 'translate-x-1'} inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModal(true);
                      setModalType('edit-faq-category');
                    }}
                    className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  {category?.faqs?.length == 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        SwalUtils.confirm(
                          () => dispatch(deleteCategory(category.id)),
                          'Delete FAQ?'
                        )
                      }
                      className="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <ChevronUp
                  className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-500 transition-transform`}
                />
              </div>
            </Disclosure.Button>

            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 border-t border-gray-200">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event) => onFaqDragEnd(category.faq_nav_slug, event)}
              >
                <SortableContext
                  items={faqs.map((faq) => faq.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <SortableFaqCard
                        category={category}
                        onAddEditFaq={onAddEditFaq}
                        key={faq.id}
                        faq={faq}
                        onToggleActive={() => onToggleFaqActive(category.faq_nav_slug, faq.id)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setModal(true);
                  setModalType('add-faq');
                }}
                className="w-full flex items-center justify-center border-2 border-gray-200 border-dashed hover:border-blue-500 hover:text-blue-600 text-gray-500 p-3 rounded-lg mt-4 text-sm font-medium transition-colors select-none"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Add FAQ
              </button>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
