import Modal from '@/components/common/Modal';
import AddUserForm from '@/components/Dashboard/AdminDashboard/AdminPanelStudent/AddUserForm';
import EditUserForm from '@/components/Dashboard/AdminDashboard/AdminPanelStudent/EditUserForm';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import DataTables from '@/components/Dashboard/common/DataTables';
import {
  createTeacher,
  fetchSingleTeacher,
  fetchTeachers,
  updateTeacher,
} from '@/redux/teachers/teacherAction';
import { clearError, clearMessage } from '@/redux/teachers/teacherSlice';
import SwalUtils from '@/utils/sweetAlert';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import LoadingDashboard from '../../../../components/Dashboard/common/LoadingDashboard';
import UserProfileCard from '../../../../components/Dashboard/common/UserProfileCard';
import TableFilter from '../../../../components/Dashboard/common/TableFilter';

const AdminPanelTeachers = () => {
  const {
    teachers,
    loadingTeachers,
    loadingActionTeachers,
    pageSize,
    teacherPagination,
    error,
    message,
  } = useSelector((state) => state.teacher);

  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add' or 'edit'
  const [teacher, setTeacher] = useState({});
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || null;
  const search = searchParams.get('search') || '';
  const order = searchParams.get('order') || '';
  const date_joined_before = searchParams.get('date_joined_before') || '';
  const is_enabled = searchParams.get('is_enabled') || null;
  const date_joined_after = searchParams.get('date_joined_after') || '';

  // addTeacher Function
  const handleAddTeacher = async (data) => {
    dispatch(createTeacher(data)).then((res) => {
      if (res.type === 'teacher/createTeacher/fulfilled') {
        setModal(false);
      }
    });
  };

  // editTeacher Function
  const singleTeacher = async (id) => {
    const singelTeacher = teachers.find((t) => t.id == id);
    setTeacher(singelTeacher);
    setModal(true);
    setModalType('edit');
  };

  const handelEditTeacher = async (data) => {
    const formData = new FormData();

    // 🔹 object কে সহজে FormData তে যোগ করা
    Object.entries({
      first_name: data.first_name,
      last_name: data.last_name,
      'profile.title': data.profile?.title,
      'profile.education': data.profile?.education,
      'profile.bio': data.profile?.bio,
    }).forEach(([key, value]) => {
      formData.append(key, value || '');
    });

    // 🔹 ফাইল থাকলে যুক্ত করা
    const file = data.profile?.image?.[0];
    if (file && (file instanceof File || file.name)) {
      formData.append('profile.image', file, file.name || 'profile.jpg');
    }

    // 🔹 Redux dispatch
    dispatch(updateTeacher({ id: data.id, teacherData: formData })).then((res) => {
      if (res.type.endsWith('/fulfilled')) {
        setModal(false);
      }
    });
  };

  const handelStatus = async (id, statusKey, value) => {
    dispatch(updateTeacher({ id, teacherData: { [statusKey]: value } }));
  };

  const handelPreview = (id) => {
    const singleTeacher = teachers.find((s) => s.id === id);
    setTeacher(singleTeacher);
    setModal(true);
    setModalType('view');
  };

  // ✅ কলাম ডেফিনিশন
  const columns = [
    {
      key: 'sl',
      label: 'SL',
      render: (_, __, index) => (currentPage - 1) * pageSize + (index + 1), // index+1 দেখাবে
    },
    { key: 'full_name', label: 'Full Name' },
    { key: 'email', label: 'Email', sort: true },
    { key: 'phone', label: 'Phone' },
    {
      key: 'education',
      label: 'Education',
      render: (row) => row.profile?.education || 'N/A',
    },
  ];

  const teachersFilterFields = [
    {
      name: 'search',
      type: 'text',
      label: 'Teacher Name/ID/Email',
      placeholder: 'Teacher Name/ID/Email',
    },
    {
      name: 'is_enabled',
      type: 'select',
      label: 'Is Enabled',
      options: [
        { name: 'Enable', value: true },
        { name: 'Disable', value: false },
      ],
    },
    { name: 'date_joined_after', type: 'date', label: 'Joined After Date' },
    { name: 'date_joined_before', type: 'date', label: 'Joined Before Date' },
  ];

  // show error  message
  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearError());
    }
  }, [error]);

  // ✅ Debounce সহ ডেটা ফেচ
  useEffect(() => {
    if (message) {
      SwalUtils.success(message);
      dispatch(clearMessage());
    }
    const handler = setTimeout(() => {
      dispatch(
        fetchTeachers({
          page: currentPage,
          page_size: pageSize,
          search,
          order: !order ? 'published_at' : order,
          date_joined_before,
          date_joined_after,
          is_enabled,
        })
      );
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [
    search,
    category,
    currentPage,
    dispatch,
    order,
    message,
    date_joined_before,
    date_joined_after,
    is_enabled,
  ]);

  return (
    <div>
      <LoadingDashboard loading={loadingTeachers || loadingActionTeachers} />
      {modal && (
        <Modal setModal={setModal} noClose={modalType == 'view' ? false : true}>
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            {modalType === 'add' && (
              <AddUserForm
                onCancel={() => setModal(false)}
                title="Add New Teacher"
                onSubmit={handleAddTeacher}
              />
            )}
            {modalType === 'edit' && (
              <EditUserForm
                title="Edit Teacher"
                onCancel={() => setModal(false)}
                onSubmit={handelEditTeacher}
                defaultValues={teacher}
                loading={loadingTeachers}
              />
            )}
            {modalType === 'view' && <UserProfileCard user={teacher} />}
          </div>
        </Modal>
      )}
      <DashBoardHeader
        buttonText={'Add Teacher'}
        title={'Teachers'}
        prefixIcon={<FaPlus />}
        handeleAdd={() => {
          setModal(true);
          setModalType('add');
        }}
      />
      <TableFilter fields={teachersFilterFields} />
      <DataTables
        data={teachers}
        columns={columns}
        paginationType={teacherPagination}
        pageSize={pageSize}
        error={error || null}
        deleteButton={false}
        handelEdit={singleTeacher}
        statusChange={handelStatus}
        statusKey="is_enabled"
        handleView={handelPreview}
      />
    </div>
  );
};

export default AdminPanelTeachers;
