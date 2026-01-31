import React from 'react';
import { useChallenge } from '../context/ChallengeContext';
import { motion } from 'framer-motion';

const ActivityGrid = () => {
  const { challenge } = useChallenge();

  if (!challenge) return null;

  // Last 30 days
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }

  const getIntensity = (date) => {
    const log = challenge.dailyLogs.find(l => l.date === date);
    if (!log) return 0;
    if (log.status === 'failed') return -1;
    const done = Object.values(log.tasks).filter(Boolean).length;
    return done;
  };

  const getColor = (intensity) => {
    if (intensity === -1) return '#ff4d4d'; // Failed
    if (intensity === 0) return 'rgba(255,255,255,0.05)';
    if (intensity <= 2) return 'rgba(212, 175, 55, 0.2)';
    if (intensity <= 4) return 'rgba(212, 175, 55, 0.5)';
    return '#d4af37'; // Max
  };

  return (
    <div className="card">
      <h2 className="card-title" style={{ fontSize: '1rem', marginBottom: '20px' }}>Consistency Matrix</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gap: '8px' }}>
        {days.map((date, i) => {
          const intensity = getIntensity(date);
          return (
            <motion.div
              key={date}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ scale: 1.2, zIndex: 10 }}
              style={{
                aspectRatio: '1/1',
                background: getColor(intensity),
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.03)',
                cursor: 'pointer'
              }}
              title={`${date}: ${intensity === -1 ? 'FAILED' : intensity + ' tasks'}`}
            />
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '10px', color: '#555' }}>
        <span>30 DAYS RETROSPECTIVE</span>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <span>Less</span>
          {[0, 1, 3, 6].map(v => (
            <div key={v} style={{ width: '8px', height: '8px', background: getColor(v), borderRadius: '2px' }}></div>
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityGrid;
