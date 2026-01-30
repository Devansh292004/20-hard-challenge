import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CommunityFeed = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([
    { id: 1, user: 'Marcus R.', action: 'completed Day 14', time: '2m ago' },
    { id: 2, user: 'Sarah K.', action: 'achieved Legend Rank', time: '15m ago' },
    { id: 3, user: 'David W.', action: 'logged 5kg weight loss', time: '1h ago' },
    { id: 4, user: 'Elena M.', action: 'started Day 1', time: '3h ago' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const names = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey'];
      const actions = ['completed Day 5', 'just finished a workout', 'logged a photo', 'hit a milestone'];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];

      const newAct = {
        id: Date.now(),
        user: `${randomName} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}.`,
        action: randomAction,
        time: 'Just now'
      };
      setActivities(prev => [newAct, ...prev.slice(0, 3)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="card">
      <h2 className="card-title">Elite Community Feed</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {activities.map(act => (
          <div key={act.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid #1e1e2e' }}>
            <div>
              <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{act.user}</span>
              <span style={{ color: '#fff', marginLeft: '8px' }}>{act.action}</span>
            </div>
            <span style={{ color: '#6a6a75', fontSize: '0.8rem' }}>{act.time}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/community')}
        className="btn-primary"
        style={{ width: '100%', marginTop: '20px', backgroundColor: 'transparent', border: '1px solid var(--gold)' }}
      >
        View All Global Activity
      </button>
    </section>
  );
};

export default CommunityFeed;
