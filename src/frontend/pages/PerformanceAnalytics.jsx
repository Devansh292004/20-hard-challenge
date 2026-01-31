import React from 'react';
import { useChallenge } from '../context/ChallengeContext';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { TrendingUp, Award, Zap, BarChart3 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PerformanceAnalytics = () => {
  const { challenge } = useChallenge();

  if (!challenge) return <div className="luxury-text">Decrypting Performance Data...</div>;

  const logs = [...challenge.dailyLogs].sort((a, b) => a.date.localeCompare(b.date));

  const labels = logs.map(log => log.date);
  const completionData = logs.map(log => {
      const tasks = log.tasks || {};
      const total = Object.keys(tasks).length;
      const done = Object.values(tasks).filter(Boolean).length;
      return total > 0 ? (done / total) * 100 : 0;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Daily Completion %',
        data: completionData,
        borderColor: '#d4af37',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#d4af37',
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { family: 'Cinzel', size: 14 },
        bodyFont: { size: 14 },
        padding: 12,
        borderColor: '#d4af37',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#8a8a95' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#8a8a95' }
      },
    },
  };

  const averageCompletion = completionData.length > 0
    ? (completionData.reduce((a, b) => a + b, 0) / completionData.length).toFixed(1)
    : 0;

  return (
    <div className="analytics-page">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '40px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d4af37', marginBottom: '5px' }}>
          <BarChart3 size={18} />
          <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Deep Intelligence
          </span>
        </div>
        <h1 className="luxury-header" style={{ fontSize: '2.5rem' }}>Performance Analytics</h1>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <motion.div whileHover={{ scale: 1.02 }} className="card">
          <div style={{ color: '#8a8a95', fontSize: '12px', marginBottom: '5px', textTransform: 'uppercase' }}>Average Completion</div>
          <div className="stat-value">{averageCompletion}%</div>
          <div style={{ color: '#d4af37', fontSize: '12px', fontWeight: 'bold' }}>ELITE CONSISTENCY</div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="card">
          <div style={{ color: '#8a8a95', fontSize: '12px', marginBottom: '5px', textTransform: 'uppercase' }}>Peak Streak</div>
          <div className="stat-value">{challenge.longestStreak || 0}</div>
          <div style={{ color: '#d4af37', fontSize: '12px', fontWeight: 'bold' }}>DAYS SECURED</div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="card">
          <div style={{ color: '#8a8a95', fontSize: '12px', marginBottom: '5px', textTransform: 'uppercase' }}>Total Tasks</div>
          <div className="stat-value">{logs.reduce((acc, log) => acc + Object.values(log.tasks).filter(Boolean).length, 0)}</div>
          <div style={{ color: '#d4af37', fontSize: '12px', fontWeight: 'bold' }}>OBJECTIVES MET</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
        style={{ height: '450px', padding: '30px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 className="card-title" style={{ margin: 0 }}>Completion Velocity</h2>
          <div style={{ display: 'flex', gap: '15px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#d4af37' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#d4af37' }}></div>
                ACTUAL
             </div>
          </div>
        </div>
        <div style={{ height: '320px' }}>
          <Line data={chartData} options={options} />
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
         <div className="card" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05), transparent)' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Consistency Insight</h3>
            <p style={{ color: '#8a8a95', fontSize: '14px' }}>
              Your completion velocity is trending {averageCompletion > 70 ? 'positive' : 'stable'}. Maintaining an average above 90% is required for "Sovereign" status.
            </p>
         </div>
         <div className="card">
            <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Next Milestone</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
               <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award color="#d4af37" size={24} />
               </div>
               <div>
                  <div style={{ fontWeight: 'bold' }}>20 Day Finisher</div>
                  <div style={{ fontSize: '12px', color: '#8a8a95' }}>Complete {Math.max(0, 20 - (challenge.currentStreak || 0))} more days</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
