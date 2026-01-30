import React from 'react';
import { useChallenge } from '../context/ChallengeContext';
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

const PerformanceAnalytics = () => {
  const { challenge } = useChallenge();

  if (!challenge) return <div className="luxury-text">Loading Analytics...</div>;

  const logs = [...challenge.dailyLogs].sort((a, b) => a.date.localeCompare(b.date));

  const labels = logs.map(log => log.date);
  const completionData = logs.map(log => {
      const tasks = log.tasks || {};
      const total = challenge.customTasks.filter(t => t.enabled).length;
      const completed = challenge.customTasks.filter(t => t.enabled && tasks[t.id] === true).length;
      return (completed / total) * 100;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Daily Completion %',
        data: completionData,
        borderColor: '#d4af37',
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        tension: 0.3,
        fill: true,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#fff' }
      },
      title: {
        display: true,
        text: 'Elite Performance Trends',
        color: '#d4af37',
        font: { size: 20, family: 'Cinzel' }
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#8a8a95' }
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#8a8a95' }
      }
    }
  };

  const averageCompletion = completionData.length > 0
    ? (completionData.reduce((a, b) => a + b, 0) / completionData.length).toFixed(1)
    : 0;

  return (
    <div className="analytics-page">
      <h1 className="luxury-header">Performance Analytics</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="card">
          <div style={{ color: '#8a8a95', fontSize: '14px', marginBottom: '5px' }}>Average Completion</div>
          <div style={{ fontSize: '32px', color: 'var(--gold)', fontWeight: 'bold' }}>{averageCompletion}%</div>
        </div>
        <div className="card">
          <div style={{ color: '#8a8a95', fontSize: '14px', marginBottom: '5px' }}>Total Days Tracked</div>
          <div style={{ fontSize: '32px', color: 'var(--gold)', fontWeight: 'bold' }}>{logs.length}</div>
        </div>
        <div className="card">
          <div style={{ color: '#8a8a95', fontSize: '14px', marginBottom: '5px' }}>Consistency Score</div>
          <div style={{ fontSize: '32px', color: 'var(--gold)', fontWeight: 'bold' }}>
            {((challenge.currentStreak / 20) * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      <div className="card" style={{ height: '400px' }}>
        <Line options={options} data={data} />
      </div>

      <div className="card" style={{ marginTop: '40px' }}>
        <h2 className="card-title">Biometric Correlation</h2>
        <p style={{ color: '#8a8a95' }}>
          Data synchronization in progress. We are analyzing the relationship between your workout intensity and sleep quality.
        </p>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
