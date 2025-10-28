import Modal from '@/components/common/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import { FaPlus } from 'react-icons/fa';
import AllPertners from '@/components/Dashboard/AdminDashboard/AdminPanelPartners/AllPertners';
import AddEditPartner from '@/components/Dashboard/AdminDashboard/AdminPanelPartners/AddEditPartner';
import { createBrand, updateBrand } from '@/redux/brands/brandsAction';

import { clearError, clearMessage } from '@/redux/brands/brandsSlice';
import SwalUtils from '@/utils/sweetAlert';

const AdminPanelPartner = () => {
  const { message, error } = useSelector((state) => state.brands);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [singlePartner, setSinglePartner] = useState({});
  const [modalType, setModalType] = useState('');

  // add Function
  const handleAddPartner = async (data) => {
    const formData = new FormData();

    // 🔹 ফাইল থাকলে যুক্ত করা
    const file = data?.image?.[0];
    if (file instanceof File) {
      formData.append('logo', file);
    }
    dispatch(createBrand(formData));
  };

  // handle edit
  const handleEditPartner = async (data) => {
    const formData = new FormData();

    // 🔹 ফাইল থাকলে যুক্ত করা
    const file = data?.image?.[0];
    if (file instanceof File) {
      formData.append('logo', file);
    }
    dispatch(updateBrand({ id: data.id, data: formData }));
  };

  useEffect(() => {
    if (message) {
      SwalUtils.success(message);
      dispatch(clearMessage());
      setModal(false);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearError());
    }
  }, [error]);

  return (
    <div>
      {modal && (
        <Modal setModal={setModal} noClose={true}>
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            {modalType === 'add' && (
              <AddEditPartner
                onCancel={() => setModal(false)}
                title="Add New"
                onSubmit={handleAddPartner}
              />
            )}
            {modalType === 'edit' && (
              <AddEditPartner
                title="Update"
                defaultValues={singlePartner}
                onCancel={() => setModal(false)}
                onSubmit={handleEditPartner}
              />
            )}
          </div>
        </Modal>
      )}

      <DashBoardHeader
        buttonText={'Add Partner'}
        title={'Partners'}
        prefixIcon={<FaPlus />}
        handeleAdd={() => {
          setModal(true);
          setModalType('add');
        }}
        searchBar={false}
      />
      <AllPertners
        setSinglePartner={setSinglePartner}
        setModal={setModal}
        setModalType={setModalType}
      />
    </div>
  );
};

export default AdminPanelPartner;
