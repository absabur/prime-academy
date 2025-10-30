import Modal from '@/components/common/Modal';
import SwalUtils from '@/utils/sweetAlert';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import { FaPlus } from 'react-icons/fa';
import UpdateFooter from '@/components/Dashboard/AdminDashboard/AdminPanelFooter/UpdateFooter';
import { clearError } from '@/redux/footer/footerSlice';
import FooterDataDisplay from '../../../../components/Dashboard/AdminDashboard/AdminPanelFooter/FooterDataDisplay';
import LoadingDashboard from '../../../../components/Dashboard/common/LoadingDashboard';

const AdminPanelFooter = () => {
  const { error, loadingFooters } = useSelector((state) => state.footer);

  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  // show error  message
  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearError());
    }
  }, [error]);

  return (
    <div>
      <LoadingDashboard loading={loadingFooters} />
      {modal && (
        <Modal setModal={setModal} noClose={true}>
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            <UpdateFooter setModal={setModal} />
          </div>
        </Modal>
      )}

      <DashBoardHeader
        buttonText={'Edit Footer'}
        title={'Footer Preview'}
        prefixIcon={<FaPlus />}
        handeleAdd={() => setModal(true)}
        searchBar={false}
      />
      <div className="rounded-md overflow-hidden">
        <FooterDataDisplay />
      </div>
    </div>
  );
};

export default AdminPanelFooter;
