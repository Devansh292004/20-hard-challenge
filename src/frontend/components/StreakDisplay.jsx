import React from 'react';
import { useChallenge } from '../context/ChallengeContext';
import { motion } from 'framer-motion';
import { Flame, Award, Calendar } from 'lucide-react';

const StreakDisplay = () => {
  const { challenge } = useChallenge();

  if (!challenge) return null;

  const streak = challenge.currentStreak || 0;

  return (
    <div className="card" style={{
      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(0,0,0,0.4))',
      border: '1px solid rgba(212, 175, 55, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '30px',
      gap: '15px'
    }}>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Flame size={60} color="#d4af37" fill="#d4af37" style={{ filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))' }} />
      </motion.div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '12px', color: '#d4af37', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '5px' }}>
          Current Streak
        </div>
        <div className="stat-value" style={{ fontSize: '4rem', lineHeight: '1', color: '#fff' }}>{streak}</div>
        <div style={{ fontSize: '14px', color: '#8a8a95', marginTop: '5px', fontFamily: 'Cinzel' }}>Elite Days Secured</div>
      </div>

      <div style={{
        display: 'flex',
        gap: '20px',
        marginTop: '10px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(212, 175, 55, 0.1)',
        width: '100%',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
           <div style={{ color: '#d4af37', fontWeight: 'bold' }}>{challenge.longestStreak || 0}</div>
           <div style={{ fontSize: '10px', color: '#555', textTransform: 'uppercase' }}>Record</div>
        </div>
        <div style={{ textAlign: 'center' }}>
           <div style={{ color: '#d4af37', fontWeight: 'bold' }}>{Math.round((streak / 20) * 100)}%</div>
           <div style={{ fontSize: '10px', color: '#555', textTransform: 'uppercase' }}>Phase I</div>
        </div>
      </div>
    </div>
  );
};

export default StreakDisplay;
