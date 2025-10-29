import Modal from '@/components/common/Modal';
import AddEditPolicyForm from '@/components/Dashboard/AdminDashboard/AdminPanelPolicies/AddEditPolicyForm';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import DataTables from '@/components/Dashboard/common/DataTables';
import { createPolicy, fetchPolicies, updatePolicy } from '@/redux/policies/policiesAction';
import { clearError, clearMessage } from '@/redux/policies/policiesSlice';

import SwalUtils from '@/utils/sweetAlert';
import { useEffect, useState } from 'react';
import { FaEye, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import ViewPolicy from '../../../../components/Dashboard/AdminDashboard/AdminPanelPolicies/ViewPolicy';
import LoadingDashboard from '../../../../components/Dashboard/common/LoadingDashboard';

const AdminPanelPolicies = () => {
  const { policies, loadingPolicies, error, message } = useSelector((state) => state.policies);

  const dispatch = useDispatch();
  const [policy, setPolicy] = useState({});
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // addPolicy Function
  const handleAddPolicy = async (data) => {
    dispatch(createPolicy(data)).then((res) => {
      if (res.type === 'policy/createPolicy/fulfilled') {
        setModal(false);
      }
    });
  };

  // editPolicy Function
  const singlePolicy = async (page_name) => {
    setPolicy(policies.find((item) => item.page_name == page_name));
    setModal(true);
    setModalType('edit');
  };

  // handleView Function
  const handleView = async (page_name) => {
    setPolicy(policies.find((item) => item.page_name == page_name));
    setModal(true);
    setModalType('view');
  };

  const handelEditPolicy = async (data, page_name) => {
    if (!page_name) return;
    // 🔹 Redux dispatch
    dispatch(updatePolicy({ page_name, policyData: data })).then((res) => {
      if (res.type.endsWith('/fulfilled')) {
        setModal(false);
      }
    });
  };

  // ✅ কলাম ডেফিনিশন
  const columns = [
    {
      key: 'page_name',
      label: 'Page Name',
    },
    { key: 'title', label: 'Title' },
    {
      key: 'content',
      label: 'Content',
      render: (r, c, i) => (
        <div
          className="policy-wrapper text-sm text-gray-700 leading-relaxed line-clamp-3 max-w-[300px]"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(r[c.key]),
          }}
        />
      ),
    },
  ];

  // show error  message
  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearError());
    }
  }, [error]);

  // show error  message
  useEffect(() => {
    if (message) {
      SwalUtils.success(message);
      dispatch(fetchPolicies());
      dispatch(clearMessage());
    }
  }, [message]);

  // ✅ Debounce সহ ডেটা ফেচ
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(fetchPolicies());
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [dispatch]);

  return (
    <div>
      {loadingPolicies && <LoadingDashboard />}
      {modal && (
        <Modal setModal={setModal} noClose={true}>
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            {modalType === 'add' && (
              <AddEditPolicyForm
                onCancel={() => setModal(false)}
                title="Add New Policy"
                onSubmit={handleAddPolicy}
              />
            )}
            {modalType === 'edit' && (
              <AddEditPolicyForm
                title="Edit Policy Data"
                onCancel={() => setModal(false)}
                onSubmit={handelEditPolicy}
                defaultValues={policy}
              />
            )}
            {modalType === 'view' && <ViewPolicy data={policy} />}
          </div>
        </Modal>
      )}
      <DashBoardHeader
        buttonText={'Add Policy'}
        title={'Policies'}
        prefixIcon={<FaPlus />}
        handeleAdd={() => {
          setModal(true);
          setModalType('add');
        }}
      />
      <DataTables
        data={policies}
        columns={columns}
        error={error || null}
        deleteButton={false}
        handelEdit={singlePolicy}
        paginationShow={false}
        statusShow={false}
        handleView={handleView}
      />
    </div>
  );
};

export default AdminPanelPolicies;
