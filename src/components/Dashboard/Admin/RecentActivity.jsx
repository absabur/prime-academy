import { FaPenToSquare } from 'react-icons/fa6';
import ChartCard from '../common/ChartCard';

import { FaChalkboardTeacher, FaMoneyBillWave, FaUserGraduate } from 'react-icons/fa';

const activities = [
  {
    id: 1,
    icon: <FaUserGraduate className="text-green-600 text-xl" />,
    bgColor: 'bg-green-100',
    title: 'New admission',
    user: 'Shafin',
    message: 'enrolled into',
    highlight: 'Applied GenAI & Agent Dev',
    amount: '৳ 20,000',
    time: 'Today 10:45 PM',
  },
  {
    id: 2,
    icon: <FaMoneyBillWave className="text-blue-600 text-xl" />,
    bgColor: 'bg-blue-100',
    title: 'Payment received',
    user: 'Nazia Sultana',
    message: 'paid',
    highlight: '৳ 15,000 via bKash',
    amount: '',
    time: 'Today 09:10 PM',
  },
  {
    id: 3,
    icon: <FaPenToSquare className="text-yellow-600 text-xl" />,
    bgColor: 'bg-yellow-100',
    title: 'Course updated',
    user: 'Graphic Design & Freelancing',
    message: 'offer price adjusted to',
    highlight: '৳ 15,000',
    amount: '',
    time: 'Today 07:30 PM',
  },
  {
    id: 4,
    icon: <FaChalkboardTeacher className="text-purple-600 text-xl" />,
    bgColor: 'bg-purple-100',
    title: 'New teacher assigned',
    user: 'Md. Arif Hossain',
    message: 'to',
    highlight: 'Animation',
    amount: '',
    time: 'Today 04:00 PM',
  },
];

const RecentActivity = () => {
  return (
    <ChartCard title={'Recent Activity'} buttontext={'view all'}>
      <ul className=" ">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex items-start gap-3  p-md border-b border-black/10 hover:bg-gray-100 transition"
          >
            <div className={`p-3 ${activity.bgColor} rounded-full`}>{activity?.icon}</div>
            <div>
              <p className="text-gray-800">
                <span className="font-semibold">{activity.title} — </span>
                <span className="font-medium text-gray-900">{activity.user}</span>{' '}
                {activity.message}{' '}
                <span className="text-indigo-600 font-semibold">{activity.highlight}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {activity.amount} {activity.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </ChartCard>
  );
};

export default RecentActivity;
