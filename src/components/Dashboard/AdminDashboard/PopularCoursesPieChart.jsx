import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartCard from '../common/ChartCard';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const pieData = {
  labels: ['Web Development', 'Data Science', 'Graphic Design', 'Digital Marketing', 'AI/ML'],
  datasets: [
    {
      label: 'Popular Courses',
      data: [120, 90, 60, 40, 30],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(251, 191, 36, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(251, 191, 36, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(139, 92, 246, 1)',
      ],
      borderWidth: 2,
      cutout: '70%',
    },
  ],
};

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
  },
  radius: '70%',
};

const PopularCoursesPieChart = () => (
  <ChartCard title="Popular Courses" buttontext={'Current Batch'}>
    <div className="w-full h-64 flex items-center justify-center">
      <Pie data={pieData} options={pieOptions} style={{ width: '100%' }} />
    </div>
  </ChartCard>
);

export default PopularCoursesPieChart;
