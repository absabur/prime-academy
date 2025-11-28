import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SwalUtils from '../../../../../utils/sweetAlert';
import Modal from '../../../../common/Modal';
import SideSectionAddUpdateForm from './SideSectionAddUpdateForm';
import WhyEnrollCard from '../WhyEnroll/WhyEnrollsCard';
import { Plus } from 'lucide-react';
import PreNextButtonSection from '../PreNextButtonSection';
import {
  createSideSection,
  deleteSideSection,
  updateSideSection,
} from '../../../../../redux/courseWizard/courseWizardAction';

const CourseSideSection = ({ defaultValues }) => {
  const detail = defaultValues?.detail;
  const dispatch = useDispatch();
  const sideImageSectionList = detail?.side_image_sections || [];
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' | 'edit'
  const [editingItem, setEditingItem] = useState(null);

  // ---------- Add Item ----------
  const addItem = async (data) => {
    if (sideImageSectionList.length >= 2) {
      SwalUtils.error('Maximum Two Item Allow');
      return;
    }
    try {
      await dispatch(createSideSection(data)).unwrap();
      SwalUtils.success('Item added successfully');
      setModalOpen(false);
    } catch (err) {
      SwalUtils.error(err.data.message || err.message || 'Failed to add item');
    }
  };

  // ---------- Edit Item ----------
  const openEdit = (id) => {
    const found = sideImageSectionList.find((item) => item.id === id);
    if (!found) return;
    setEditingItem(found);
    setModalType('edit');
    setModalOpen(true);
  };

  const handleEditSubmit = async (data, id) => {
    try {
      await dispatch(updateSideSection({ id: id, itemData: data })).unwrap();
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
        await dispatch(deleteSideSection(id)).unwrap();
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
        await dispatch(updateSideSection({ id: id, itemData: { is_active: status } })).unwrap();
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
        Side Section
      </h2>

      {modalOpen && (
        <Modal setModal={setModalOpen} noClose={true}>
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            <SideSectionAddUpdateForm
              onCancel={() => {
                setEditingItem(null);
                setModalOpen(false);
              }}
              onSubmit={modalType === 'edit' ? handleEditSubmit : addItem}
              title={modalType === 'edit' ? 'Edit Why Enroll' : 'Add Why Enroll'}
              defaultValues={modalType === 'edit' ? editingItem : undefined}
              course_detail_id={detail?.id}
            />
          </div>
        </Modal>
      )}

      <div className="space-y-sm">
        {sideImageSectionList.length ? (
          sideImageSectionList.map((item) => (
            <WhyEnrollCard
              key={item?.id}
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
        Add A Side Item
      </button>

      <PreNextButtonSection className={'mt-xl'} isForm={false} />
    </div>
  );
};

export default CourseSideSection;
