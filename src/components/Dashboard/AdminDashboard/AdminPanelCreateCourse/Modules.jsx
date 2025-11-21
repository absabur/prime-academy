import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../../../redux/courseWizard/courseWizardSlice';
import { Plus } from 'lucide-react';
import Modal from '../../../common/Modal';
import ModuleAddEditFrom from './CourseModules/ModuleAddEditFrom';
import ModulesCard from './CourseModules/ModulesCard';
import SwalUtils from '../../../../utils/sweetAlert';
import PreNextButtonSection from './PreNextButtonSection';

export default function Modules() {
  const dispatch = useDispatch();
  const modules = useSelector((state) => state.courseWizard.formData.modules || []);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' | 'edit'
  const [editingModule, setEditingModule] = useState(null); // holds original module object when editing

  // helper: return modules sorted by order (immutable)
  const getSorted = (arr) => [...arr].sort((a, b) => a.order - b.order);

  // save modules to redux (always save sorted)
  const saveModules = (newModules) => {
    dispatch(updateFormData({ key: 'modules', data: getSorted(newModules) }));
  };

  // ---------- Add Module ----------
  const addModule = (data) => {
    // if user didn't set order, auto assign next
    const nextOrder = modules.length ? Math.max(...modules.map((m) => m.order)) + 1 : 1;
    const orderToUse = data.order ?? nextOrder;

    // check conflict
    const conflict = modules.some((m) => m.order === orderToUse);
    if (conflict) {
      SwalUtils.error('Module order already exists. Choose another order.');
      return;
    }

    const newModules = [...modules, { ...data, order: orderToUse }];
    saveModules(newModules);
    setModalOpen(false);
  };

  // ---------- Edit Module ----------
  const openEdit = (order) => {
    const found = modules.find((m) => m.order === order);
    if (!found) return;
    setEditingModule(found);
    setModalType('edit');
    setModalOpen(true);
  };

  const handleEditSubmit = (data) => {
    // editingModule holds original module (may be null if something odd)
    const originalOrder = editingModule?.order;
    // if user didn't set order in form, keep original
    const orderToUse = data.order ?? originalOrder;
    // check conflict: allow if the only matching one is the original module
    const conflict = modules.some((m) => m.order === orderToUse && m.order !== originalOrder);
    if (conflict) {
      SwalUtils.error('Module order already exists. Choose another order.');
      return;
    }

    const updated = modules.map((m) =>
      m.order === originalOrder ? { ...m, ...data, order: orderToUse } : m
    );
    saveModules(updated);
    setEditingModule(null);
    setModalOpen(false);
  };

  // ---------- Delete Module ----------
  const deleteModule = (order) => {
    const performDelete = () => {
      const updated = modules.filter((m) => m.order !== order);
      saveModules(updated);
    };
    SwalUtils.confirm(performDelete, 'Yes, delete it');
  };

  // ---------- Toggle Active ----------
  const toggleModule = (order, status) => {
    const performToggle = () => {
      const updated = modules.map((m) => (m.order === order ? { ...m, is_active: status } : m));
      saveModules(updated);
    };
    SwalUtils.confirm(performToggle, 'Yes, update it');
  };

  // sorted for render
  const shortModules = getSorted(modules);

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-md space-y-sm">
      {modalOpen && (
        <Modal setModal={setModalOpen} noClose={true}>
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            <ModuleAddEditFrom
              onCancel={() => {
                setEditingModule(null);
                setModalOpen(false);
              }}
              onSubmit={modalType === 'edit' ? handleEditSubmit : addModule}
              title={modalType === 'edit' ? 'Edit Module' : 'Add Module'}
              defaultValues={modalType === 'edit' ? editingModule : undefined}
            />
          </div>
        </Modal>
      )}

      <div className="space-y-sm">
        {shortModules.length ? (
          shortModules.map((moduleitem) => (
            <ModulesCard
              key={moduleitem.order}
              moduleitem={moduleitem}
              onEdit={() => openEdit(moduleitem.order)}
              onDelete={() => deleteModule(moduleitem.order)}
              onToggle={(status) => toggleModule(moduleitem.order, status)}
            />
          ))
        ) : (
          <div className="text-sm text-gray-500">No modules added yet.</div>
        )}
      </div>

      <button
        onClick={() => {
          setModalType('add');
          setEditingModule(null);
          setModalOpen(true);
        }}
        className="p-3 flex gap-xs justify-center items-center border-2 border-black/30 rounded-lg w-full border-dashed text-black/30 hover:border-primary hover:text-primary"
      >
        <Plus size={15} />
        Add Module
      </button>

      <PreNextButtonSection className={'mt-xl'} isForm={false} />
    </div>
  );
}
