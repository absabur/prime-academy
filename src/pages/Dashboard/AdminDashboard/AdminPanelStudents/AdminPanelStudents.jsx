import Modal from '@/components/common/Modal';
import DataTable from '@/components/Dashboard/common/DataTables';
import {
  createStudent,
  fetchSingleStudent,
  fetchStudents,
  updateStudent,
} from '@/redux/students/studentAction';
import { clearError, clearMessage } from '@/redux/students/studentSlice';
import SwalUtils from '@/utils/sweetAlert';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import AddUserForm from '@/components/Dashboard/AdminDashboard/AdminPanelStudent/AddUserForm';
import EditUserForm from '@/components/Dashboard/AdminDashboard/AdminPanelStudent/EditUserForm';

const AdminPanelStudents = () => {
  const { students, loadingStudents, pageSize, studentPagination, error, message } = useSelector(
    (state) => state.student
  );

  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add' or 'edit'
  const [student, setStudent] = useState({});
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || null;
  const search = searchParams.get('search') || '';
  const order = searchParams.get('order') || '';

  // addStudent Function
  const handleAddStudent = async (data) => {
    dispatch(createStudent(data)).then((res) => {
      if (res.type === 'student/createStudent/fulfilled') {
        setModal(false);
      }
    });
  };

  // editStudent Function
  const singleStudent = async (id) => {
    const singleStudent = students.find((s) => s.id === id);
    setStudent(singleStudent);
    setModal(true);
    setModalType('edit');
  };

  const handelEditStudent = async (data) => {
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

    // 🔹 Redux dispatch
    dispatch(updateStudent({ id: data.id, studentData: formData })).then((res) => {
      if (res.type.endsWith('/fulfilled')) {
        setModal(false);
      }
    });
  };

  const handelStatus = async (id, statusKey, value) => {
    dispatch(updateStudent({ id, studentData: { [statusKey]: value } }));
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
        fetchStudents({
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
                title="Add New Student"
                onSubmit={handleAddStudent}
              />
            )}
            {modalType === 'edit' && (
              <EditUserForm
                onCancel={() => setModal(false)}
                onSubmit={handelEditStudent}
                defaultValues={student}
                loading={loadingStudents}
              />
            )}
          </div>
        </Modal>
      )}
      <DashBoardHeader
        buttonText={'Add Student'}
        title={'Students'}
        prefixIcon={<FaPlus />}
        handeleAdd={() => {
          setModal(true);
          setModalType('add');
        }}
      />
      <DataTable
        data={students}
        columns={columns}
        paginationType={studentPagination}
        pageSize={pageSize}
        error={error || null}
        deleteButton={false}
        handelEdit={singleStudent}
        statusChange={handelStatus}
        statusKey="is_enabled"
      />
    </div>
  );
};

export default AdminPanelStudents;
