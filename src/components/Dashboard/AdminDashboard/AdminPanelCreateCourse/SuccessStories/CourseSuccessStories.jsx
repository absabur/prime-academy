import { useState } from 'react';
import SwalUtils from '../../../../../utils/sweetAlert';
import { useDispatch } from 'react-redux';
import { Plus } from 'lucide-react';
import WhyEnrollCard from '../WhyEnroll/WhyEnrollsCard';
import PreNextButtonSection from '../PreNextButtonSection';
import WhyEnrollAddEditForm from '../WhyEnroll/WhyEnrollAddEditForm';
import Modal from '../../../../common/Modal';
import {
  createSuccessStories,
  deleteSuccessStories,
  updateSuccessStories,
} from '../../../../../redux/courseWizard/courseWizardAction';
import SuccessStoriesForm from './SuccessStoriesForm';

const CourseSuccessStories = ({ defaultValues }) => {
  const detail = defaultValues?.detail;
  const dispatch = useDispatch();

  const successStoriesList = detail?.success_stories || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' | 'edit'
  const [editingItem, setEditingItem] = useState(null);

  // ---------- Add Item ----------
  const addItem = async (data) => {
    try {
      await dispatch(createSuccessStories(data)).unwrap();
      SwalUtils.success('Item added successfully');
      setModalOpen(false);
    } catch (err) {
      SwalUtils.error(err.data.message || err.message || 'Failed to add item');
    }
  };

  // ---------- Edit Item ----------
  const openEdit = (id) => {
    const found = successStoriesList.find((item) => item?.id === id);
    if (!found) return;
    setEditingItem(found);
    setModalType('edit');
    setModalOpen(true);
  };

  const handleEditSubmit = async (data, id) => {
    try {
      await dispatch(updateSuccessStories({ id: id, itemData: data })).unwrap();
      SwalUtils.success('Update Successful');
      setModalOpen(false);
    } catch (err) {
      SwalUtils.error(err?.data?.message || err?.message || 'Fail To Update');
    }
  };

  // ---------- Delete Item ----------
  const deleteItem = (id) => {
    const performDelete = async () => {
      try {
        await dispatch(deleteSuccessStories(id)).unwrap();
        SwalUtils.success('Item Delete Succesfull');
      } catch (err) {
        SwalUtils.error(err.data.message || err.message || 'Failed to add item');
      }
    };
    SwalUtils.confirm(performDelete, 'Yes, delete it');
  };

  // ---------- Toggle Active ----------
  const toggleItem = (id, status) => {
    const performToggle = async () => {
      try {
        await dispatch(updateSuccessStories({ id: id, itemData: { is_active: status } })).unwrap();
        SwalUtils.success('Update Successful');
        setModalOpen(false);
      } catch (err) {
        SwalUtils.error(err?.data?.message || err?.message || 'Fail To Update');
      }
    };
    SwalUtils.confirm(performToggle, 'Yes, update status');
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-md space-y-sm">
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm mb-4">
        Success Stories
      </h2>

      {modalOpen && (
        <Modal setModal={setModalOpen} noClose={true}>
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            <SuccessStoriesForm
              course_detail_id={detail?.id}
              onCancel={() => {
                setEditingItem(null);
                setModalOpen(false);
              }}
              onSubmit={modalType === 'edit' ? handleEditSubmit : addItem}
              title={modalType === 'edit' ? 'Edit Success Stories' : 'Add Success Stories'}
              defaultValues={modalType === 'edit' ? editingItem : undefined}
            />
          </div>
        </Modal>
      )}

      <div className="space-y-sm">
        {successStoriesList.length ? (
          successStoriesList.map((item) => (
            <WhyEnrollCard
              key={item.id}
              item={item}
              onEdit={() => openEdit(item.id)}
              onDelete={() => deleteItem(item.id)}
              onToggle={toggleItem}
            />
          ))
        ) : (
          <div className="text-sm text-gray-500">No items added yet.</div>
        )}
      </div>

      <button
        onClick={() => {
          setModalType('add');
          setEditingItem(null);
          setModalOpen(true);
        }}
        className="p-3 flex gap-xs justify-center items-center border-2 border-black/30 rounded-lg w-full border-dashed text-black/30 hover:border-primary hover:text-primary"
      >
        <Plus size={15} />
        Add Success Stories
      </button>

      <PreNextButtonSection className={'mt-xl'} isForm={false} />
    </div>
  );
};

export default CourseSuccessStories;
