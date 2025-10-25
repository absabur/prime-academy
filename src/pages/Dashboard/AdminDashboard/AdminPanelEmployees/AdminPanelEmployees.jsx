import Modal from '@/components/common/Modal';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import DataTables from '@/components/Dashboard/common/DataTables';
import {
  createEmployee,
  fetchEmployees,
  fetchSingleEmployee,
  updateEmployee,
} from '@/redux/employee/employeeAction';
import { clearMessage } from '@/redux/students/studentSlice';
import SwalUtils from '@/utils/sweetAlert';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const AdminPanelEmployees = () => {
  const { employees, loadingEmployees, pageSize, employeePagination, error, message, employee } =
    useSelector((state) => state.employee);

  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add' or 'edit'
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || null;
  const search = searchParams.get('search') || '';
  const order = searchParams.get('order') || '';

  // addEmployee Function
  const handleAddEmployee = async (data) => {
    dispatch(createEmployee(data)).then((res) => {
      if (res.type === 'employee/createEmployee/fulfilled') {
        setModal(false);
      }
    });
  };

  // editEmployee Function
  const singleEmployee = async (id) => {
    dispatch(fetchSingleEmployee(id));
    setModal(true);
    setModalType('edit');
  };

  const handelEditEmployee = async (data) => {
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
    dispatch(updateEmployee({ id: data.id, employeeData: formData })).then((res) => {
      if (res.type.endsWith('/fulfilled')) {
        setModal(false);
      }
    });
  };

  // ✅ কলাম ডেফিনিশন
  const columns = [
    {
      key: 'employee_id',
      label: 'ID',
    },
    { key: 'employee_name', label: 'Employee Name' },
    { key: 'job_title', label: 'Job Title' },
    { key: 'phone_number', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'joining_date', label: 'Joining Date' },
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
        fetchEmployees({
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
              <EmployeeForm
                onCancel={() => setModal(false)}
                title="Add New Employee"
                onSubmit={handleAddEmployee}
              />
            )}
            {modalType === 'edit' && (
              <EditEmployeeForm onCancel={() => setModal(false)} onSubmit={handelEditEmployee} />
            )}
          </div>
        </Modal>
      )}
      <DashBoardHeader
        buttonText={'Add Employee'}
        title={'Employees'}
        prefixIcon={<FaPlus />}
        handeleAdd={() => {
          setModal(true);
          setModalType('add');
        }}
      />
      <DataTables
        data={employees}
        columns={columns}
        paginationType={employeePagination}
        pageSize={pageSize}
        error={error || null}
        deleteButton={false}
        handelEdit={singleEmployee}
        paginationShow={false}
      />
    </div>
  );
};

export default AdminPanelEmployees;
