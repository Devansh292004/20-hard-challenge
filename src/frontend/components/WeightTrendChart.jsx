import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeightTrendChart = ({ entries }) => {
  const data = {
    labels: entries.map(e => new Date(e.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Weight (kg)',
        data: entries.map(e => e.weight),
        fill: false,
        backgroundColor: '#667eea',
        borderColor: 'rgba(102, 126, 234, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weight Trend',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div style={{ marginTop: '20px', background: 'white', padding: '15px', borderRadius: '12px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeightTrendChart;
