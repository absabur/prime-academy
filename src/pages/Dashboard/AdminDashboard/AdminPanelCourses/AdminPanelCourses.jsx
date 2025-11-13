import DataTables from '@/components/Dashboard/common/DataTables';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import LoadingDashboard from '../../../../components/Dashboard/common/LoadingDashboard';
import { useEffect } from 'react';
import SwalUtils from '@/utils/sweetAlert';
import {
  fetchAdminCourses,
  fetchCourseCategories,
  updateCourse,
} from '../../../../redux/courses/courseAction';
import { useSearchParams } from 'react-router-dom';
import { clearError, clearMessage } from '../../../../redux/courses/courseSlice';
import TailwindToggleSwitch from '../../../../components/Dashboard/common/ToggleButton';
import ToggleButton from '../../../../components/Dashboard/common/ToggleButton';
import StatusSelect from '../../../../components/Dashboard/common/StatusSelect';
import TableFilter from '../../../../components/Dashboard/common/TableFilter';

const AdminPanelCourses = () => {
  const {
    adminCourses,
    loadingAdminCourse,
    pageSize,
    coursePagination,
    error,
    message,
    categories,
  } = useSelector((state) => state.course);

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || null;
  const search = searchParams.get('search') || '';
  const order = searchParams.get('order') || '';
  const is_enabled = searchParams.get('is_enabled') || null;
  const status = searchParams.get('status') || null;

  useEffect(() => {
    if (message) {
      SwalUtils.success(message);
      dispatch(clearMessage());
    }
    dispatch(fetchCourseCategories());
    dispatch(fetchAdminCourses({ order, search, category, is_enabled, status }));
  }, [dispatch, message, order, search, category, is_enabled, status]);

  const handelStatus = (id, statusKey, value) => {
    dispatch(updateCourse({ id, courseData: { [statusKey]: value } }));
  };

  // show error  message
  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearError());
    }
  }, [error]);

  // ✅ কলাম ডেফিনিশন
  const columns = [
    {
      key: 'sl',
      label: 'SL',
      render: (_, __, index) => (currentPage - 1) * pageSize + (index + 1),
    },
    {
      key: 'title',
      label: 'Course Name',
    },
    {
      key: 'category',
      label: 'Category',
      render: (row) => row.category?.name || 'N/A',
    },
    {
      key: 'price',
      label: 'Price',
      render: (row) =>
        row.pricing?.is_free ? 'Free' : `${row.pricing?.base_price} ${row.pricing?.currency}`,
    },
    {
      key: 'show_in_home_tab',
      label: 'Home Tab',
      render: (row) =>
        row && (
          <ToggleButton
            id={row.id + 'show_in_home_tab'}
            isActive={row.show_in_home_tab}
            handleToggle={(value) => handelStatus(row.id, 'show_in_home_tab', value)}
          />
        ),
    },
    {
      key: 'show_in_megamenu',
      label: 'Mega Menu',
      render: (row) =>
        row && (
          <ToggleButton
            id={row.id + 'show_in_megamenu'}
            isActive={row.show_in_megamenu}
            handleToggle={(value) => handelStatus(row.id, 'show_in_megamenu', value)}
          />
        ),
    },
    {
      key: 'status',
      label: 'Published Status',
      render: (row) =>
        row && (
          <StatusSelect
            currentValue={row.status}
            statusChange={(value) => handelStatus(row.id, 'status', value)}
            options={[
              { value: 'published', label: 'Published' },
              { value: 'draft', label: 'Draft' },
              { value: 'archived', label: 'Pending' },
            ]}
          />
        ),
    },
  ];

  // Course filter field
  const courseFilterFields = [
    {
      name: 'search',
      type: 'text',
      label: 'Course Title',
      placeholder: 'Course Title',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      placeholder: 'Category',
      options: categories.map((c) => ({ name: c.name, value: c.slug })),
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
    {
      name: 'status',
      type: 'select',
      label: 'Published Status',
      options: [
        { name: 'Published', value: 'published' },
        { name: 'Archived', value: 'archived' },
        { name: 'Draft', value: 'draft' },
      ],
    },
  ];

  return (
    <div>
      <LoadingDashboard loading={loadingAdminCourse} />
      <TableFilter fields={courseFilterFields} />
      <DashBoardHeader
        buttonText={'Add Course'}
        title={'AdminPanelCourses'}
        prefixIcon={<FaPlus />}
      />
      <DataTables
        columns={columns}
        data={adminCourses}
        statusChange={handelStatus}
        statusKey="is_active"
        deleteButton={false}
        handelEdit={true}
      />
    </div>
  );
};

export default AdminPanelCourses;
