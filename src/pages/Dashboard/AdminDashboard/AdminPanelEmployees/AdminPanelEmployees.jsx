import Modal from '@/components/common/Modal';
import AddEmployeeForm from '@/components/Dashboard/AdminDashboard/AdminEmployee/AddEmployeeForm';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import DataTables from '@/components/Dashboard/common/DataTables';
import {
  createEmployee,
  fetchEmployees,
  fetchSingleEmployee,
  updateEmployee,
} from '@/redux/employee/employeeAction';
import { clearMessage } from '@/redux/employee/employeeSlice';
import { clearError } from '@/redux/teachers/teacherSlice';

import SwalUtils from '@/utils/sweetAlert';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const AdminPanelEmployees = () => {
  const { employees, loadingEmployees, pageSize, employeePagination, error, message } = useSelector(
    (state) => state.employee
  );

  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add' or 'edit'
  const [employee, setEmployee] = useState({});
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
    const singelEmployee = employees.find((e) => e.id === id);
    setEmployee(singelEmployee);
    setModal(true);
    setModalType('edit');
  };

  const handelEditEmployee = async (data, id) => {
    if (!id) return;
    // 🔹 Redux dispatch
    dispatch(updateEmployee({ id, employeeData: data })).then((res) => {
      if (res.type.endsWith('/fulfilled')) {
        setModal(false);
      }
    });
  };

  const handelStatus = async (id, statusKey, value) => {
    dispatch(updateEmployee({ id, employeeData: { [statusKey]: value } }));
  };

  // ✅ কলাম ডেফিনিশন
  const columns = [
    {
      key: 'employee_id',
      label: 'ID',
    },
    { key: 'employee_name', label: 'Employee Name' },
    { key: 'job_title', label: 'Job Title' },
    { key: 'department', label: 'Department', render: (row) => row.department?.name || 'N/A' },
    { key: 'phone_number', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'joining_date', label: 'Joining Date' },
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
              <AddEmployeeForm
                onCancel={() => setModal(false)}
                title="Add New Employee"
                onSubmit={handleAddEmployee}
              />
            )}
            {modalType === 'edit' && (
              <AddEmployeeForm
                title="Edit Employee Data"
                onCancel={() => setModal(false)}
                onSubmit={handelEditEmployee}
                defaultValues={employee}
              />
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
        statusChange={handelStatus}
        statusKey="is_active"
      />
    </div>
  );
};

export default AdminPanelEmployees;
