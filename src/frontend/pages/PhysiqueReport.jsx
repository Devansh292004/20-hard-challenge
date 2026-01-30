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

const PhysiqueReport = () => {
  const { challenge, user } = useChallenge();

  if (!challenge) return <div className="luxury-text">Accessing Physique Data...</div>;

  const weightLogs = challenge.dailyLogs
    .filter(log => log.tasks && log.tasks.weight)
    .sort((a, b) => a.date.localeCompare(b.date));

  const labels = weightLogs.map(log => log.date);
  const weightData = weightLogs.map(log => log.tasks.weight);

  const data = {
    labels,
    datasets: [
      {
        label: 'Weight (kg)',
        data: weightData,
        borderColor: '#d4af37',
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 8,
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
        text: 'Weight Progression',
        color: '#d4af37',
        font: { size: 20, family: 'Cinzel' }
      },
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#8a8a95' }
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#8a8a95' }
      }
    }
  };

  const currentWeight = weightData.length > 0 ? weightData[weightData.length - 1] : user.startWeight;
  const startWeight = user.startWeight || (weightData.length > 0 ? weightData[0] : 0);
  const totalLost = (startWeight - currentWeight).toFixed(1);
  const targetWeight = user.targetWeight;
  const progressToGoal = targetWeight && startWeight !== targetWeight
    ? Math.min(100, Math.max(0, ((startWeight - currentWeight) / (startWeight - targetWeight)) * 100)).toFixed(0)
    : 0;

  return (
    <div className="physique-page">
      <h1 className="luxury-header">Physique Transformation</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="card">
          <div style={{ color: '#8a8a95', fontSize: '14px' }}>Current Weight</div>
          <div style={{ fontSize: '32px', color: 'var(--gold)', fontWeight: 'bold' }}>{currentWeight} kg</div>
        </div>
        <div className="card">
          <div style={{ color: '#8a8a95', fontSize: '14px' }}>Total Change</div>
          <div style={{ fontSize: '32px', color: totalLost >= 0 ? 'var(--gold)' : '#ef4444', fontWeight: 'bold' }}>
            {totalLost > 0 ? '-' : ''}{Math.abs(totalLost)} kg
          </div>
        </div>
        <div className="card">
          <div style={{ color: '#8a8a95', fontSize: '14px' }}>Goal Progress</div>
          <div style={{ fontSize: '32px', color: 'var(--gold)', fontWeight: 'bold' }}>{progressToGoal}%</div>
        </div>
      </div>

      <div className="card" style={{ height: '400px', marginBottom: '40px' }}>
        {weightData.length > 1 ? (
          <Line options={options} data={data} />
        ) : (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a8a95', textAlign: 'center' }}>
            Not enough data points to generate trend line.<br/>Keep logging your weight daily.
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <section className="card">
          <h2 className="card-title">Body Composition Insights</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              <span>Initial Weight</span>
              <span style={{ color: 'var(--gold)' }}>{startWeight} kg</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              <span>Target Weight</span>
              <span style={{ color: 'var(--gold)' }}>{targetWeight || '--'} kg</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Status</span>
              <span style={{ color: '#10b981' }}>Optimizing</span>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="card-title">Transformation Gallery</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ aspectRatio: '3/4', background: '#1a1a2e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '12px' }}>Day 1</div>
            <div style={{ aspectRatio: '3/4', background: '#1a1a2e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '12px' }}>Latest</div>
          </div>
          <button className="nav-btn" style={{ width: '100%', marginTop: '15px', border: '1px solid var(--gold)' }}>
            Upload Progress Photo
          </button>
        </section>
      </div>
    </div>
  );
};

export default PhysiqueReport;
