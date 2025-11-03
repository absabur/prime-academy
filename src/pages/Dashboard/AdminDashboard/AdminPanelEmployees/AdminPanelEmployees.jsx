import Modal from '@/components/common/Modal';
import AddEmployeeForm from '@/components/Dashboard/AdminDashboard/AdminEmployee/AddEmployeeForm';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import DataTables from '@/components/Dashboard/common/DataTables';
import { createEmployee, fetchEmployees, updateEmployee } from '@/redux/employee/employeeAction';
import { clearMessage } from '@/redux/employee/employeeSlice';
import { clearError } from '@/redux/teachers/teacherSlice';

import SwalUtils from '@/utils/sweetAlert';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import LoadingDashboard from '../../../../components/Dashboard/common/LoadingDashboard';
import EmployeeViewCard from '../../../../components/Dashboard/AdminDashboard/AdminEmployee/EmployeeViewCard';
import { fetchDepartments } from '../../../../redux/department/departmentAction';
import TableFilter from '../../../../components/Dashboard/common/TableFilter';

const AdminPanelEmployees = () => {
  const {
    employees,
    loadingEmployees,
    loadingActionEmployees,
    pageSize,
    employeePagination,
    error,
    message,
  } = useSelector((state) => state.employee);
  const { departments } = useSelector((state) => state.department);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add' or 'edit'
  const [employee, setEmployee] = useState({});
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const department = searchParams.get('department') || null;
  const isActive = searchParams.get('is_active') || null;
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

  const handelPreview = (id) => {
    const singelEmployee = employees.find((e) => e.id === id);
    setEmployee(singelEmployee);
    setModal(true);
    setModalType('view');
  };

  // ✅ কলাম ডেফিনিশন
  const columns = [
    {
      key: 'employee_id',
      label: 'ID',
    },
    { key: 'employee_name', label: 'Employee Name', sort: true },
    { key: 'job_title', label: 'Job Title' },
    {
      key: 'department',
      label: 'Department',
      render: (row) => row.department?.name || 'N/A',
    },
    { key: 'phone_number', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'joining_date', label: 'Joining Date' },
  ];

  const employeesFilterFields = [
    {
      name: 'search',
      type: 'text',
      label: 'Employee Name/Email',
      placeholder: 'Student Name/Email',
    },
    {
      name: 'is_active',
      type: 'select',
      label: 'Is Enabled',
      options: [
        { name: 'Enable', value: true },
        { name: 'Disable', value: false },
      ],
    },
    {
      name: 'department',
      type: 'select',
      label: 'Departments',
      options: departments.map((d) => ({ value: d.id, name: d.name })),
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
      dispatch(fetchDepartments());
      dispatch(
        fetchEmployees({
          page: currentPage,
          page_size: pageSize,
          search,
          order: !order ? 'published_at' : order,
          department,
          isActive,
        })
      );
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [search, department, currentPage, dispatch, order, message, isActive]);

  return (
    <div>
      <LoadingDashboard loading={loadingEmployees || loadingActionEmployees} />
      {modal && (
        <Modal setModal={setModal} noClose={modalType == 'view' ? false : true}>
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

            {modalType === 'view' && <EmployeeViewCard employee={employee} />}
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

      <TableFilter fields={employeesFilterFields} />
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
        handleView={handelPreview}
      />
    </div>
  );
};

export default AdminPanelEmployees;
