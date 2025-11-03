import { Disclosure, Switch } from '@headlessui/react';
import { GripVertical, ChevronUp, Pencil, Trash2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Modal from '../../../common/Modal';
import AddEditFaq from './AddEditFaq';
import SwalUtils from '../../../../utils/sweetAlert';

export function SortableFaqCard({ faq, onToggleActive, category, onAddEditFaq }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: faq.id,
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

  const sanitizedAnswer = () => ({
    __html: typeof window !== 'undefined' ? DOMPurify.sanitize(faq.answer) : faq.answer,
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-gray-200 rounded-lg bg-white shadow-sm"
    >
      {modal && (
        <Modal setModal={setModal} noClose={true}>
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            {modalType == 'edit-faq' && (
              <AddEditFaq
                onCancel={() => setModal(false)}
                category={category}
                onSubmit={onAddEditFaq}
                defaultValues={faq}
                title='Edit FAQ'
              />
            )}
          </div>
        </Modal>
      )}
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              as="div"
              role="button"
              tabIndex={0}
              className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  {...attributes}
                  {...listeners}
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
                >
                  <GripVertical className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 truncate">{faq.question}</h3>
              </div>

              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-4 flex-shrink-0 ml-4"
              >
                <span
                  className={`text-sm font-medium ${faq.is_active ? 'text-green-700' : 'text-gray-500'}`}
                >
                  {faq.is_active ? 'Active' : 'Inactive'}
                </span>
                <Switch
                  checked={!!faq.is_active}
                  onChange={onToggleActive}
                  className={`${faq.is_active ? 'bg-blue-600' : 'bg-black/10'} relative inline-flex h-5 w-10 items-center rounded-full transition-colors`}
                >
                  <span
                    className={`${faq.is_active ? 'translate-x-5' : 'translate-x-1'} inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModal(true);
                    setModalType('edit-faq');
                  }}
                  className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    SwalUtils.confirm(
                      () => onAddEditFaq(category, {}, faq.id, 'delete'),
                      'Delete Faq?'
                    )
                  }
                  className="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <ChevronUp
                  className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-500 transition-transform`}
                />
              </div>
            </Disclosure.Button>

            <Disclosure.Panel className="px-4 pb-4 pt-2">
              <div className="p-3 border border-gray-100 bg-gray-50 rounded-lg">
                <div
                  className="prose prose-sm text-gray-700 leading-relaxed max-w-none"
                  dangerouslySetInnerHTML={sanitizedAnswer()}
                />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
