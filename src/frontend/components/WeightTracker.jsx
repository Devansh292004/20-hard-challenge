import React, { useState } from 'react';
import { useChallenge } from '../context/ChallengeContext';
import WeightTrendChart from './WeightTrendChart';

const WeightTracker = () => {
  const { user, challenge, setChallenge } = useChallenge();
  const [weight, setWeight] = useState('');

  const weightEntries = challenge.dailyLogs
    .filter(log => log.tasks && log.tasks.weight)
    .map(log => ({ weight: log.tasks.weight, date: log.date }));

  const startWeight = user?.startWeight || 80;
  const targetWeight = user?.targetWeight || 74;
  const currentWeight = weightEntries.length > 0 ? weightEntries[weightEntries.length - 1].weight : startWeight;

  const totalToLose = startWeight - targetWeight;
  const currentLoss = startWeight - currentWeight;
  const progress = Math.min(100, Math.max(0, (currentLoss / totalToLose) * 100));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!weight) return;

    const todayStr = new Date().toISOString().split('T')[0];
    try {
      const response = await fetch('/api/challenge/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ date: todayStr, tasks: { weight: parseFloat(weight) } }),
      });
      if (response.ok) {
        const updatedChallenge = await response.json();
        setChallenge(updatedChallenge);
        setWeight('');
      }
    } catch (err) {
      console.error('Failed to log weight', err);
    }
  };

  return (
    <section className="card">
      <h2 className="card-title">Physique Analytics</h2>
      <div className="weight-content">
        <div className="stat-circle">
          <span className="circle-val">{Math.round(progress)}%</span>
          <span className="circle-label">Progress</span>
        </div>
        <form onSubmit={handleSubmit} className="prod-form" style={{ flex: 1 }}>
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight (kg)"
            required
          />
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>Log Entry</button>
        </form>
      </div>

      {weightEntries.length > 1 && (
        <div style={{ marginTop: '30px' }}>
          <WeightTrendChart entries={weightEntries} />
        </div>
      )}
    </section>
  );
};

export default WeightTracker;
