import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createWhyEnrollItem,
  deleteWhyEnrollItem,
  updateWhyEnrollItem,
} from '../../../../../redux/courseWizard/courseWizardAction';
import SwalUtils from '../../../../../utils/sweetAlert';
import Modal from '../../../../common/Modal';
import PreNextButtonSection from '../PreNextButtonSection';
import WhyEnrollAddEditForm from './WhyEnrollAddEditForm';
import WhyEnrollCard from './WhyEnrollsCard';

export default function WhyEnrollThisCourse({ defaultValues }) {
  const detail = defaultValues?.detail;
  const dispatch = useDispatch();
  const whyEnrollList = detail?.why_enrol || [];
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' | 'edit'
  const [editingItem, setEditingItem] = useState(null);

  // ---------- Add Item ----------
  const addItem = async (data) => {
    try {
      await dispatch(createWhyEnrollItem(data)).unwrap();
      SwalUtils.success('Item added successfully');
      setModalOpen(false);
    } catch (err) {
      SwalUtils.error(err.data.message || err.message || 'Failed to add item');
    }
  };

  // ---------- Edit Item ----------
  const openEdit = (id) => {
    const found = whyEnrollList.find((item) => item.id === id);
    if (!found) return;
    setEditingItem(found);
    setModalType('edit');
    setModalOpen(true);
  };

  const handleEditSubmit = async (data, id) => {
    try {
      await dispatch(updateWhyEnrollItem({ id: id, itemData: data })).unwrap();
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
        await dispatch(deleteWhyEnrollItem(id)).unwrap();
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
        await dispatch(updateWhyEnrollItem({ id: id, itemData: { is_active: status } })).unwrap();
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
              course_detail_id={detail?.id}
            />
          </div>
        </Modal>
      )}

      <div className="space-y-sm">
        {whyEnrollList?.length ? (
          whyEnrollList?.map((item, index) => (
            <WhyEnrollCard
              key={item?.id + index}
              item={item}
              onEdit={() => openEdit(item?.id)}
              onDelete={() => deleteItem(item?.id)}
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
        Add Why Enroll Item
      </button>

      <PreNextButtonSection className={'mt-xl'} isForm={false} />
    </div>
  );
}
