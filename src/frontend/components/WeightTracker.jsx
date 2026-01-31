import React, { useState } from 'react';
import { useChallenge } from '../context/ChallengeContext';
import { motion } from 'framer-motion';
import { Scale, ChevronRight } from 'lucide-react';

const WeightTracker = () => {
  const { challenge, user, updateTask } = useChallenge();
  const [weight, setWeight] = useState('');

  if (!challenge) return null;

  const today = new Date().toISOString().split('T')[0];
  const todayLog = challenge.dailyLogs.find(log => log.date === today);
  const currentWeight = todayLog?.tasks?.weight || (challenge.dailyLogs.filter(l => l.tasks.weight).pop()?.tasks?.weight) || user?.startWeight;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (weight) {
      updateTask(today, 'weight', parseFloat(weight));
      setWeight('');
    }
  };

  const goalToLose = user?.startWeight - user?.targetWeight;
  const currentlyLost = user?.startWeight - currentWeight;
  const progress = goalToLose > 0 ? Math.min(100, Math.max(0, (currentlyLost / goalToLose) * 100)).toFixed(0) : 0;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="card-title" style={{ margin: 0, fontSize: '1.2rem' }}>Weight Protocol</h2>
          <div style={{ padding: '4px 10px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '20px', fontSize: '10px', color: '#d4af37', fontWeight: 'bold' }}>
            {currentWeight} KG CURRENT
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px', position: 'relative' }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#d4af37"
              strokeWidth="8"
              strokeDasharray="339.29"
              initial={{ strokeDashoffset: 339.29 }}
              animate={{ strokeDashoffset: 339.29 - (339.29 * progress) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <div className="circle-val" style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Cinzel', color: '#fff' }}>{progress}%</div>
            <div style={{ fontSize: '10px', color: '#8a8a95', textTransform: 'uppercase' }}>To Goal</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
        <input
          type="number"
          step="0.1"
          placeholder="Enter Current Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={{ paddingRight: '50px' }}
        />
        <button
          type="submit"
          style={{
            position: 'absolute',
            right: '5px',
            top: '5px',
            bottom: '5px',
            background: '#d4af37',
            border: 'none',
            borderRadius: '6px',
            width: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronRight color="#000" size={20} />
        </button>
      </form>
    </div>
  );
};

export default WeightTracker;
