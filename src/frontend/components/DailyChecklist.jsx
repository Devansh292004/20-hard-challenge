import React from 'react';
import { useChallenge } from '../context/ChallengeContext';

const DailyChecklist = () => {
  const { challenge, setChallenge } = useChallenge();

  const tasks = [
    { id: 'workout1', label: 'Workout I (45 min)' },
    { id: 'workout2', label: 'Workout II (Outdoor)' },
    { id: 'water', label: 'Hydration (Gallon)' },
    { id: 'diet', label: 'Optimal Nutrition' },
    { id: 'photo', label: 'Physique Evidence' },
    { id: 'reading', label: 'Knowledge (10 pages)' }
  ];

  const todayStr = new Date().toISOString().split('T')[0];
  const todayLog = challenge?.dailyLogs?.find(log => log.date === todayStr) || { tasks: {} };

  const toggleTask = async (taskId) => {
    try {
      const updatedTasks = { ...todayLog.tasks, [taskId]: !todayLog.tasks[taskId] };
      const response = await fetch('/api/challenge/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ date: todayStr, tasks: updatedTasks }),
      });
      if (response.ok) {
        const updatedChallenge = await response.json();
        setChallenge(updatedChallenge);
      }
    } catch (err) {
      console.error('Failed to toggle task', err);
    }
  };

  const completedCount = tasks.filter(t => todayLog.tasks[t.id]).length;
  const progressPercent = (completedCount / tasks.length) * 100;

  return (
    <section className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Daily Objectives</h2>
        <span style={{ color: 'var(--luxury-gold)', fontWeight: 700 }}>{completedCount}/{tasks.length}</span>
      </div>

      <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '30px' }}>
        <div style={{
          width: `${progressPercent}%`,
          height: '100%',
          background: 'var(--luxury-gold)',
          borderRadius: '2px',
          transition: 'width 0.5s ease'
        }} />
      </div>

      <div className="tasks-grid">
        {tasks.map((task) => (
          <label key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={!!todayLog.tasks[task.id]}
              onChange={() => toggleTask(task.id)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <span className="task-label">{task.label}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default DailyChecklist;
