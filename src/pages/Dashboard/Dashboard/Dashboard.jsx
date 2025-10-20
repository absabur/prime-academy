import OverViewCard from '@/components/Dashboard/Admin/OverViewCard';
import PopularCoursesPieChart from '@/components/Dashboard/Admin/PopularCoursesPieChart';
import RecentActivity from '@/components/Dashboard/Admin/RecentActivity';
import StudentAddmisionChart from '@/components/Dashboard/Admin/StudentAddmisionChart';
import { clearAuthMessage } from '@/redux/auth/authSlice';
import SwalUtils from '@/utils/sweetAlert';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const { message, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      SwalUtils.success(message);
      dispatch(clearAuthMessage());
    }
  }, [message]);

  const overviewdata = [
    {
      id: 1,
      title: 'Total Students',
      value: 1246,
      growth: 98,
      growthText: '+98 new this month',
      icon: 'graduation-cap',
      color: '#4f46e5',
    },
    {
      id: 2,
      title: 'Total Courses',
      value: 56,
      growth: 4,
      growthText: '+4 new this month',
      icon: 'book-open',
      color: '#16a34a',
    },
    {
      id: 3,
      title: 'Total Teachers',
      value: 22,
      growth: 1,
      growthText: '+1 new this month',
      icon: 'chalkboard-teacher',
      color: '#f59e0b',
    },
    {
      id: 4,
      title: 'Total Earnings',
      value: 78500,
      growth: 12.5,
      growthText: '+12.5% this month',
      icon: 'wallet',
      color: '#ef4444',
    },
  ];

  return (
    <div className="space-y-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-xl">
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

export default Dashboard;
