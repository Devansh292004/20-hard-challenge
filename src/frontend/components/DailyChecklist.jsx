import React, { useState } from 'react';
import { useChallenge } from '../context/ChallengeContext';
import { useNotification } from '../context/NotificationContext';

const DailyChecklist = () => {
  const { challenge, setChallenge } = useChallenge();
  const { notify } = useNotification();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [editedTasks, setEditedTasks] = useState(challenge?.customTasks || []);

  const tasks = challenge?.customTasks?.filter(t => t.enabled) || [
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

        if (!todayLog.tasks[taskId]) {
            const task = tasks.find(t => t.id === taskId);
            notify(`Great job! Completed: ${task?.label || taskId}`, 'success');
        }
      }
    } catch (err) {
      console.error('Failed to toggle task', err);
    }
  };

  const handleSaveTasks = async () => {
    try {
      const response = await fetch('/api/challenge/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ customTasks: editedTasks }),
      });
      if (response.ok) {
        const updatedChallenge = await response.json();
        setChallenge(updatedChallenge);
        setIsCustomizing(false);
        notify('Challenge template updated successfully.', 'success');
      }
    } catch (err) {
      notify('Failed to update template', 'error');
    }
  };

  const completedCount = tasks.filter(t => {
      // Handle both Map and plain object
      const val = todayLog.tasks.get ? todayLog.tasks.get(t.id) : todayLog.tasks[t.id];
      return val === true;
  }).length;
  const progressPercent = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <section className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Daily Objectives</h2>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button
                onClick={() => {
                    setEditedTasks(challenge?.customTasks || tasks);
                    setIsCustomizing(true);
                }}
                className="btn-secondary"
                style={{ padding: '4px 12px', fontSize: '12px' }}
            >
                Customize
            </button>
            <span style={{ color: 'var(--luxury-gold)', fontWeight: 700 }}>{completedCount}/{tasks.length}</span>
        </div>
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
        {tasks.map((task) => {
          const isChecked = todayLog.tasks.get ? todayLog.tasks.get(task.id) : todayLog.tasks[task.id];
          return (
            <label key={task.id} className="task-item">
                <input
                type="checkbox"
                checked={!!isChecked}
                onChange={() => toggleTask(task.id)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <span className="task-label">{task.label}</span>
            </label>
          );
        })}
      </div>

      {isCustomizing && (
          <div style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.85)', display: 'flex',
              justifyContent: 'center', alignItems: 'center', zIndex: 1000,
              backdropFilter: 'blur(8px)'
          }}>
              <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
                  <h3 className="card-title">Customize Your Challenge</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', margin: '20px 0' }}>
                      {editedTasks.map((t, idx) => (
                          <div key={t.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <input
                                type="checkbox"
                                checked={t.enabled}
                                onChange={(e) => {
                                    const newTasks = [...editedTasks];
                                    newTasks[idx].enabled = e.target.checked;
                                    setEditedTasks(newTasks);
                                }}
                              />
                              <input
                                type="text"
                                value={t.label}
                                onChange={(e) => {
                                    const newTasks = [...editedTasks];
                                    newTasks[idx].label = e.target.value;
                                    setEditedTasks(newTasks);
                                }}
                                style={{ flex: 1 }}
                              />
                          </div>
                      ))}
                      <button
                        onClick={() => setEditedTasks([...editedTasks, { id: `custom_${Date.now()}`, label: 'New Task', enabled: true }])}
                        className="btn-secondary"
                        style={{ alignSelf: 'flex-start' }}
                      >
                          + Add Custom Task
                      </button>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <button onClick={() => setIsCustomizing(false)} className="btn-secondary">Cancel</button>
                      <button onClick={handleSaveTasks} className="btn-primary">Save Template</button>
                  </div>
              </div>
          </div>
      )}
    </section>
  );
};

export default DailyChecklist;
