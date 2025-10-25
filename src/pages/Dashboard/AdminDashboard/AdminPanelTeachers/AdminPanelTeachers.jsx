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
import { clearMessage } from '@/redux/teachers/teacherSlice';
import SwalUtils from '@/utils/sweetAlert';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const AdminPanelTeachers = () => {
  const { teachers, loadingTeachers, pageSize, teacherPagination, error, message, teacher } =
    useSelector((state) => state.teacher);

  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add' or 'edit'
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || null;
  const search = searchParams.get('search') || '';
  const order = searchParams.get('order') || '';

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
    dispatch(fetchSingleTeacher(id));
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
    if (file instanceof File) {
      formData.append('profile.image', file);
    }

    console.log(Object.fromEntries(formData));

    // 🔹 Redux dispatch
    dispatch(updateTeacher({ id: data.id, teacherData: formData })).then((res) => {
      if (res.type.endsWith('/fulfilled')) {
        setModal(false);
      }
    });
  };

  // ✅ কলাম ডেফিনিশন
  const columns = [
    {
      key: 'sl',
      label: 'SL',
      render: (_, __, index) => (currentPage - 1) * pageSize + (index + 1), // index+1 দেখাবে
    },
    { key: 'full_name', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'education',
      label: 'Education',
      render: (row) => row.profile?.education || 'N/A',
    },
  ];

  // show error  message
  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearMessage());
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
        })
      );
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [search, category, currentPage, dispatch, order, message]);

  return (
    <div>
      {modal && (
        <Modal setModal={setModal} noClose={true}>
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
      <DataTables
        data={teachers}
        columns={columns}
        paginationType={teacherPagination}
        pageSize={pageSize}
        error={error || null}
        deleteButton={false}
        handelEdit={singleTeacher}
      />
    </div>
  );
};

export default AdminPanelTeachers;
