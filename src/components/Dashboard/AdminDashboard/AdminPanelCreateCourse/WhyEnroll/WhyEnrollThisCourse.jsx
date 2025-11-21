import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import SwalUtils from '../../../../../utils/sweetAlert';
import Modal from '../../../../common/Modal';
import { updateFormData } from '../../../../../redux/courseWizard/courseWizardSlice';
import WhyEnrollAddEditForm from './WhyEnrollAddEditForm';
import WhyEnrollCard from './WhyEnrollsCard';
import PreNextButtonSection from '../PreNextButtonSection';

export default function WhyEnrollThisCourse() {
  const dispatch = useDispatch();
  // Redux key: 'why_enroll'
  const enrollList = useSelector((state) => state.courseWizard.formData.whyEnrol || []);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' | 'edit'
  const [editingItem, setEditingItem] = useState(null);

  // Save to Redux
  const saveList = (newList) => {
    dispatch(updateFormData({ key: 'whyEnrol', data: newList }));
  };

  // ---------- Add Item ----------
  const addItem = (data) => {
    console.log(data);
    // Generate ID
    const newItem = {
      ...data,
      id: data.id || crypto.randomUUID(),
    };

    const newList = [...enrollList, newItem];
    saveList(newList);
    setModalOpen(false);
  };

  // ---------- Edit Item ----------
  const openEdit = (id) => {
    const found = enrollList.find((item) => item.id === id);
    if (!found) return;
    setEditingItem(found);
    setModalType('edit');
    setModalOpen(true);
  };

  const handleEditSubmit = (data) => {
    const updated = enrollList.map((item) =>
      item.id === editingItem.id ? { ...item, ...data } : item
    );
    saveList(updated);
    setEditingItem(null);
    setModalOpen(false);
  };

  // ---------- Delete Item ----------
  const deleteItem = (id) => {
    const performDelete = () => {
      const updated = enrollList.filter((item) => item.id !== id);
      saveList(updated);
    };
    SwalUtils.confirm(performDelete, 'Yes, delete it');
  };

  // ---------- Toggle Active ----------
  const toggleItem = (id, status) => {
    const performToggle = () => {
      const updated = enrollList.map((item) =>
        item.id === id ? { ...item, is_active: status } : item
      );
      saveList(updated);
    };
    SwalUtils.confirm(performToggle, 'Yes, update status');
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-md space-y-sm">
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm mb-4">
        Why Enroll
      </h2>

      {modalOpen && (
        <Modal setModal={setModalOpen} noClose={true}>
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            <WhyEnrollAddEditForm
              onCancel={() => {
                setEditingItem(null);
                setModalOpen(false);
              }}
              onSubmit={modalType === 'edit' ? handleEditSubmit : addItem}
              title={modalType === 'edit' ? 'Edit Why Enroll' : 'Add Why Enroll'}
              defaultValues={modalType === 'edit' ? editingItem : undefined}
            />
          </div>
        </Modal>
      )}

      <div className="space-y-sm">
        {enrollList.length ? (
          enrollList.map((item) => (
            <WhyEnrollCard
              key={item.id}
              item={item}
              onEdit={() => openEdit(item.id)}
              onDelete={() => deleteItem(item.id)}
              onToggle={(status) => toggleItem(item.id, status)}
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
        Add Why Enroll Item
      </button>

      <PreNextButtonSection className={'mt-xl'} isForm={false} />
    </div>
  );
}
