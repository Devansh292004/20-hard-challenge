import React from 'react';
import { useChallenge } from '../context/ChallengeContext';
import { motion } from 'framer-motion';
import { Award, Shield, Star, Zap, Flame } from 'lucide-react';

const Badge = ({ icon: Icon, label, unlocked, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    whileHover={{ scale: 1.05 }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      padding: '15px',
      background: unlocked ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255, 255, 255, 0.02)',
      border: '1px solid',
      borderColor: unlocked ? 'rgba(212, 175, 55, 0.3)' : 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      opacity: unlocked ? 1 : 0.3,
      filter: unlocked ? 'none' : 'grayscale(1)',
      transition: 'all 0.3s ease'
    }}
  >
    <div style={{
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      background: unlocked ? 'linear-gradient(135deg, #d4af37, #b8860b)' : '#222',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: unlocked ? '0 0 15px rgba(212, 175, 55, 0.3)' : 'none'
    }}>
      <Icon size={24} color={unlocked ? "#000" : "#444"} />
    </div>
    <span style={{ fontSize: '10px', fontWeight: 'bold', color: unlocked ? '#d4af37' : '#555', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
      {label}
    </span>
  </motion.div>
);

const BadgeDisplay = () => {
  const { challenge } = useChallenge();

  if (!challenge) return null;

  const earned = challenge.badges || [];

  const allBadges = [
    { id: 'first-day', label: 'Day I Secured', icon: Star },
    { id: '7-day-warrior', label: '7 Day Warrior', icon: Shield },
    { id: 'consistency-king', label: 'Consistency King', icon: Award },
    { id: 'elite-finisher', label: 'Elite Finisher', icon: Flame },
    { id: 'goal-reached', label: 'Goal Attained', icon: Zap },
  ];

  return (
    <div className="card">
      <h2 className="card-title" style={{ fontSize: '1rem', marginBottom: '20px' }}>Elite Commendations</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {allBadges.map((b, i) => (
          <Badge
            key={b.id}
            icon={b.icon}
            label={b.label}
            unlocked={earned.includes(b.id)}
            delay={i * 0.1}
          />
        ))}
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
         <div style={{ fontSize: '11px', color: '#555', letterSpacing: '1px' }}>
            {earned.length} / {allBadges.length} MILESTONES SECURED
         </div>
      </div>
    </div>
  );
};

export default BadgeDisplay;
