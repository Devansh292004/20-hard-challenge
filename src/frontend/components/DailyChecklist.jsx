import React from 'react';
import { useChallenge } from '../context/ChallengeContext';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';
import EliteCoach from './EliteCoach';

const DailyChecklist = () => {
  const { challenge, updateTask } = useChallenge();

  if (!challenge) return null;

  const today = new Date().toISOString().split('T')[0];
  const todayLog = challenge.dailyLogs.find(log => log.date === today) || {
    tasks: {
      workout1: false,
      workout2: false,
      diet: false,
      water: false,
      reading: false,
      photo: false
    }
  };

  const tasks = [
    { id: 'workout1', label: challenge.template?.tasks?.workout1 || 'Morning Workout' },
    { id: 'workout2', label: challenge.template?.tasks?.workout2 || 'Outdoor Workout' },
    { id: 'diet', label: challenge.template?.tasks?.diet || 'Clean Diet' },
    { id: 'water', label: challenge.template?.tasks?.water || 'Gallon of Water' },
    { id: 'reading', label: challenge.template?.tasks?.reading || '10 Pages Reading' },
    { id: 'photo', label: challenge.template?.tasks?.photo || 'Progress Photo' }
  ].filter(t => challenge.template?.enabledTasks?.[t.id] !== false);

  const handleToggle = (taskId, currentState) => {
    const newState = !currentState;
    updateTask(today, taskId, newState);

    if (newState) {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#ffffff', '#b8860b']
      });
    }
  };

  const completedCount = tasks.filter(t => todayLog.tasks[t.id]).length;
  const isAllDone = completedCount === tasks.length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
      <EliteCoach />

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="card-title">Daily Protocol</h2>
          <div style={{ color: '#d4af37', fontWeight: 'bold' }}>
            {completedCount}/{tasks.length} SECURED
          </div>
        </div>

        <div className="task-list">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleToggle(task.id, todayLog.tasks[task.id])}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '16px',
                marginBottom: '10px',
                borderRadius: '12px',
                background: todayLog.tasks[task.id]
                  ? 'rgba(212, 175, 55, 0.15)'
                  : 'rgba(255, 255, 255, 0.03)',
                border: '1px solid',
                borderColor: todayLog.tasks[task.id]
                  ? 'rgba(212, 175, 55, 0.5)'
                  : 'rgba(255, 255, 255, 0.05)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {todayLog.tasks[task.id] ? (
                <CheckCircle2 color="#d4af37" size={24} />
              ) : (
                <Circle color="#444" size={24} />
              )}
              <span style={{
                flex: 1,
                fontSize: '16px',
                color: todayLog.tasks[task.id] ? '#fff' : '#8a8a95',
                textDecoration: todayLog.tasks[task.id] ? 'line-through' : 'none'
              }}>
                {task.label}
              </span>
            </motion.div>
          ))}
        </div>

        {isAllDone && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              marginTop: '20px',
              padding: '15px',
              background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)',
              textAlign: 'center',
              borderRadius: '8px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
              <Trophy size={20} color="#d4af37" />
              <span style={{ fontFamily: 'Cinzel', color: '#d4af37', letterSpacing: '1px' }}>
                DAILY OBJECTIVES SECURED. ELITE STATUS MAINTAINED.
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DailyChecklist;
