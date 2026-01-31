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
import { Activity, Target, TrendingDown, Scale } from 'lucide-react';

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

const PhysiqueReport = () => {
  const { challenge, user } = useChallenge();

  if (!challenge) return <div className="luxury-text">Scanning Biometrics...</div>;

  const logs = [...challenge.dailyLogs]
    .filter(log => log.tasks.weight)
    .sort((a, b) => a.date.localeCompare(b.date));

  const chartData = {
    labels: logs.map(log => log.date),
    datasets: [
      {
        label: 'Weight (kg)',
        data: logs.map(log => log.tasks.weight),
        borderColor: '#d4af37',
        backgroundColor: 'rgba(212, 175, 55, 0.05)',
        borderWidth: 3,
        pointBackgroundColor: '#d4af37',
        tension: 0.3,
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
        borderColor: '#d4af37',
        borderWidth: 1
      }
    },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8a8a95' } },
      x: { grid: { display: false }, ticks: { color: '#8a8a95' } },
    },
  };

  const currentWeight = logs.length > 0 ? logs[logs.length - 1].tasks.weight : user?.startWeight;
  const totalChange = currentWeight && user?.startWeight ? (currentWeight - user.startWeight).toFixed(1) : 0;

  const goalToLose = user?.startWeight - user?.targetWeight;
  const currentlyLost = user?.startWeight - currentWeight;
  const progress = goalToLose > 0 ? Math.min(100, Math.max(0, (currentlyLost / goalToLose) * 100)).toFixed(0) : 0;

  return (
    <div className="physique-page">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '40px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d4af37', marginBottom: '5px' }}>
          <Activity size={18} />
          <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Biometric Evolution
          </span>
        </div>
        <h1 className="luxury-header" style={{ fontSize: '2.5rem' }}>Physique Transformation</h1>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '40px' }}>
        <motion.div whileHover={{ y: -5 }} className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8a8a95', fontSize: '12px', textTransform: 'uppercase', marginBottom: '10px' }}>
            <Scale size={16} color="#d4af37" />
            Current Weight
          </div>
          <div className="stat-value">{currentWeight} kg</div>
          <div style={{ color: '#d4af37', fontSize: '12px', fontWeight: 'bold' }}>SENSORS ACTIVE</div>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8a8a95', fontSize: '12px', textTransform: 'uppercase', marginBottom: '10px' }}>
            <TrendingDown size={16} color="#d4af37" />
            Total Change
          </div>
          <div className="stat-value">{totalChange} kg</div>
          <div style={{ color: totalChange <= 0 ? '#4caf50' : '#ff4d4d', fontSize: '12px', fontWeight: 'bold' }}>
            {totalChange <= 0 ? 'NET REDUCTION' : 'NET INCREASE'}
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8a8a95', fontSize: '12px', textTransform: 'uppercase', marginBottom: '10px' }}>
            <Target size={16} color="#d4af37" />
            Goal Progress
          </div>
          <div className="stat-value">{progress}%</div>
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '10px' }}>
             <div style={{ width: `${progress}%`, height: '100%', background: '#d4af37', borderRadius: '2px', boxShadow: '0 0 10px #d4af37' }}></div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="card"
        style={{ height: '450px', padding: '30px' }}
      >
        <h2 className="card-title">Evolution Trajectory</h2>
        <div style={{ height: '350px' }}>
          {logs.length > 1 ? (
            <Line data={chartData} options={options} />
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', flexDirection: 'column', gap: '20px' }}>
               <Activity size={60} color="#111" />
               <p style={{ fontFamily: 'Cinzel', fontSize: '14px' }}>Insufficient data points for trajectory projection.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PhysiqueReport;
