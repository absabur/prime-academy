import DataTable from '@/components/Dashboard/common/DataTables';
import DashBoardHeader from '@/components/Dashboard/Student/DashBoardHeader';
import { fetchStudents } from '@/redux/students/studentAction';
import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const Students = () => {
  const { students, loadingStudents, pageSize, studentPagination, error } = useSelector(
    (state) => state.student
  );

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || null;
  const search = searchParams.get('search') || '';
  const order = searchParams.get('order') || '';

  // ✅ কলাম ডেফিনিশন
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'full_name', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'education',
      label: 'Education',
      render: (row) => row.profile?.education || 'N/A',
    },
    {
      key: 'skills',
      label: 'Skills',
      render: (row) => (row.profile?.skills?.length > 0 ? row.profile.skills.join(', ') : 'N/A'),
    },
  ];

  // ✅ Debounce সহ ডেটা ফেচ
  useEffect(() => {
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
  }, [search, category, currentPage, dispatch, order]);

  console.log(students);

  return (
    <div>
      <DashBoardHeader buttonText={'Add Student'} title={'Students'} prefixIcon={<FaPlus />} />
      <DataTable
        data={students}
        columns={columns}
        paginationType={studentPagination}
        pageSize={pageSize}
        error={error || null}
      />
    </div>
  );
};

export default Students;
