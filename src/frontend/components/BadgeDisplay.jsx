import React from 'react';

const BADGE_MAP = {
  '7-day-streak': { label: '7 Day Warrior', icon: '🔥', color: '#ff4500' },
  '30-day-streak': { label: 'Monthly Master', icon: '🏆', color: '#ffd700' },
  'goal-reached': { label: 'Weight Goal Hit', icon: '🎯', color: '#00ced1' },
  'early-bird': { label: 'Early Bird', icon: '🌅', color: '#ffa500' },
  'consistency-king': { label: 'Consistency King', icon: '👑', color: '#da70d6' },
};

const BadgeDisplay = ({ badges = [] }) => {
  const earnedSet = new Set(badges);

  return (
    <section className="card" style={{ marginBottom: '20px' }}>
      <h2 className="card-title">Elite Achievement Badges</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {Object.entries(BADGE_MAP).map(([id, badge]) => {
          const isEarned = earnedSet.has(id);
          return (
            <div
              key={id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '12px',
                borderRadius: '12px',
                background: isEarned ? 'rgba(218, 165, 32, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${isEarned ? badge.color : '#333'}`,
                minWidth: '100px',
                opacity: isEarned ? 1 : 0.4,
                transition: 'all 0.3s ease',
                filter: isEarned ? 'none' : 'grayscale(100%)'
              }}
            >
              <span style={{ fontSize: '2rem', marginBottom: '8px' }}>{badge.icon}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'center', color: isEarned ? '#fff' : '#888' }}>
                {badge.label}
              </span>
              {!isEarned && <span style={{ fontSize: '0.6rem', color: '#555', marginTop: '4px' }}>LOCKED</span>}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BadgeDisplay;
