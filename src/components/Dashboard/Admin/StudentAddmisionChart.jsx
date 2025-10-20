import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartCard from '../common/ChartCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const data = {
  labels,
  datasets: [
    {
      type: 'bar',
      label: 'Students',
      data: [50, 65, 75, 70, 80, 95, 110, 100, 130, 140, 135, 160],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderRadius: 6,
      yAxisID: 'y',
    },
    {
      type: 'line',
      label: 'Income (BDT)',
      data: [
        70000, 60000, 85000, 90000, 110000, 130000, 150000, 145000, 190000, 210000, 230000, 270000,
      ],
      borderColor: 'rgba(239, 68, 68, 0.9)',
      backgroundColor: 'rgba(239, 68, 68, 0.3)',
      tension: 0.4,
      yAxisID: 'y1',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  stacked: false,
  plugins: {
    legend: { position: 'top', labels: { boxWidth: 40 } },
  },
  scales: {
    y: {
      type: 'linear',
      position: 'left',
      title: { display: true, text: 'Students' },
      beginAtZero: true,
    },
    y1: {
      type: 'linear',
      position: 'right',
      title: { display: true, text: 'Income (BDT)' },
      beginAtZero: true,
      grid: { drawOnChartArea: false },
    },
  },
};

const StudentAdmissionChart = () => (
  <ChartCard title="Admission Overview" buttontext={'Last 12 Months'}>
    <div className="w-full h-64 flex items-center justify-center">
      <Bar data={data} options={options} />
    </div>
  </ChartCard>
);

export default StudentAdmissionChart;
