import OverViewCard from '@/components/Dashboard/AdminDashboard/OverViewCard';
import PopularCoursesPieChart from '@/components/Dashboard/AdminDashboard/PopularCoursesPieChart';
import RecentActivity from '@/components/Dashboard/AdminDashboard/RecentActivity';
import StudentAddmisionChart from '@/components/Dashboard/AdminDashboard/StudentAddmisionChart';
import { clearAuthMessage } from '@/redux/auth/authSlice';
import SwalUtils from '@/utils/sweetAlert';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOverView } from '../../../../redux/adminDashbroadOverView/overviewAction';

function formatOverviewData(stats) {
  const items = [
    ['Total Students', stats?.students, 'graduation-cap'],
    ['Total Courses', stats?.courses, 'book-open'],
    ['Total Teachers', stats?.teachers, 'chalkboard-teacher'],
    ['Total Earnings', stats?.earnings, 'wallet'],
  ];

  return items.map(([title, item, icon], i) => {
    // label থেকে color নির্ধারণ
    const label = item?.label || '';
    // সংখ্যা বের করা (+15, -5 ইত্যাদি)
    const numericValue = parseFloat(label.replace(/[^\d.-]/g, '')) || 0;

    // রঙ নির্ধারণের লজিক
    let colorClass = 'gray-400';
    if (numericValue <= 0) colorClass = 'red-500';
    else if (numericValue > 0 && numericValue <= 5) colorClass = 'secondary';
    else if (numericValue > 5) colorClass = 'green-500';

    let to = '/admin-dashboard';

    if (title.toLowerCase().includes('students')) to = '/admin-dashboard/students';
    else if (title.toLowerCase().includes('teachers')) to = '/admin-dashboard/teachers';
    else if (title.toLowerCase().includes('courses')) to = '/admin-dashboard/courses';

    return {
      id: i + 1,
      title,
      value: item?.total ?? 0,
      growth: item?.growth_percentage ?? item?.growth ?? 0,
      growthText: label,
      icon,
      color: colorClass,
      to,
    };
  });
}

const AdminPanelDashboard = () => {
  const { message, user } = useSelector((state) => state.auth);
  const { overview } = useSelector((state) => state.overview);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      SwalUtils.success(message, 'Welcome back!');
      dispatch(clearAuthMessage());
    }
  }, [message]);

  useEffect(() => {
    dispatch(fetchOverView());
  }, []);

  const stats = overview.statistics;

  const overviewdata = formatOverviewData(stats);

  return (
    <div className="space-y-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-xl ">
        {overviewdata.map((overview) => (
          <OverViewCard key={overview.id} overview={overview} />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-lg h-fit">
        <StudentAddmisionChart />
        <PopularCoursesPieChart />
      </div>
      <RecentActivity />
    </div>
  );
};

export default AdminPanelDashboard;
