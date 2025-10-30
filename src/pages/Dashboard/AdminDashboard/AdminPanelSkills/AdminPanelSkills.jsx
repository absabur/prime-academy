import Modal from '@/components/common/Modal';
import AddSkillForm from '@/components/Dashboard/AdminDashboard/AdminPanelSkills/AddSkillForm';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import DataTables from '@/components/Dashboard/common/DataTables';
import { createSkill, fetchSkills, fetchSingleSkill, updateSkill } from '@/redux/skill/skillAction';
import { clearError, clearMessage } from '@/redux/skill/skillSlice';

import SwalUtils from '@/utils/sweetAlert';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import LoadingDashboard from '../../../../components/Dashboard/common/LoadingDashboard';

const AdminPanelSkills = () => {
  const { skills, loadingSkills, pageSize, skillPagination, error, message, skill } = useSelector(
    (state) => state.skill
  );

  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add' or 'edit'
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const order = searchParams.get('order') || '';

  // addSkill Function
  const handleAddSkill = async (data) => {
    dispatch(createSkill(data)).then((res) => {
      if (res.type === 'skill/createSkill/fulfilled') {
        setModal(false);
      }
    });
  };

  // editSkill Function
  const singleSkill = async (id) => {
    dispatch(fetchSingleSkill(id));
    setModal(true);
    setModalType('edit');
  };

  const handelEditSkill = async (data, id) => {
    if (!id) return;
    // 🔹 Redux dispatch
    dispatch(updateSkill({ id, skillData: data })).then((res) => {
      if (res.type.endsWith('/fulfilled')) {
        setModal(false);
      }
    });
  };

  const statusChange = (id, key, value) => {
    if (!id) return;

    SwalUtils.confirm(
      () =>
        dispatch(updateSkill({ id, skillData: { [key]: value } })).then((res) => {
          if (res.type.endsWith('/fulfilled')) {
            setModal(false);
          }
        }),
      'Change Status'
    );
  };

  // ✅ কলাম ডেফিনিশন
  const columns = [
    {
      key: 'id',
      label: 'ID',
      render: (_, __, index) => (currentPage - 1) * pageSize + (index + 1),
    },
    { key: 'name', label: 'Skill Name' },
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
      dispatch(
        fetchSkills({
          page: currentPage,
          page_size: pageSize,
          search,
          order: !order ? 'published_at' : order,
        })
      );
      dispatch(clearMessage());
    }
  }, [message]);

  // ✅ Debounce সহ ডেটা ফেচ
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(
        fetchSkills({
          page: currentPage,
          page_size: pageSize,
          search,
          order: !order ? 'published_at' : order,
        })
      );
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [search, pageSize, currentPage, dispatch, order]);

  return (
    <div>
      <LoadingDashboard loading={loadingSkills} />
      {modal && (
        <Modal setModal={setModal} noClose={true}>
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            {modalType === 'add' && (
              <AddSkillForm
                onCancel={() => setModal(false)}
                title="Add New Skill"
                onSubmit={handleAddSkill}
              />
            )}
            {modalType === 'edit' && (
              <AddSkillForm
                title="Edit Skill Data"
                onCancel={() => setModal(false)}
                onSubmit={handelEditSkill}
                defaultValues={skill}
              />
            )}
          </div>
        </Modal>
      )}
      <DashBoardHeader
        buttonText={'Add Skill'}
        title={'Skills'}
        prefixIcon={<FaPlus />}
        handeleAdd={() => {
          setModal(true);
          setModalType('add');
        }}
      />
      <DataTables
        data={skills}
        columns={columns}
        paginationType={skillPagination}
        pageSize={pageSize}
        error={error || null}
        deleteButton={false}
        handelEdit={singleSkill}
        statusChange={statusChange}
        statusKey="is_active"
        StatusShow={true}
        paginationShow={true}
      />
    </div>
  );
};

export default AdminPanelSkills;
