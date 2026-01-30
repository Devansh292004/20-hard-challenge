import React, { useState, useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';

const EliteCommunity = () => {
  const { notify } = useNotification();
  const [activities, setActivities] = useState([
    { id: 1, user: 'Marcus R.', action: 'completed Day 14', time: '2m ago', type: 'milestone' },
    { id: 2, user: 'Sarah K.', action: 'hit a new personal best in Workout II', time: '15m ago', type: 'achievement' },
    { id: 3, user: 'David W.', action: 'logged 4L of water', time: '1h ago', type: 'log' },
    { id: 4, user: 'Elena M.', action: 'unlocked "7 Day Warrior" badge', time: '3h ago', type: 'milestone' },
    { id: 5, user: 'Jason P.', action: 'started the 20 Hard Challenge', time: '5h ago', type: 'new' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
        const names = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley'];
        const actions = [
            'just completed their morning workout',
            'reached a 5-day streak!',
            'uploaded a progress photo',
            'finished reading 10 pages',
            'drank 4L of water'
        ];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];

        const newActivity = {
            id: Date.now(),
            user: `${randomName} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}.`,
            action: randomAction,
            time: 'Just now',
            type: 'live'
        };

        setActivities(prev => [newActivity, ...prev.slice(0, 9)]);

        // Occasionally notify the user of global activity
        if (Math.random() > 0.7) {
            notify(`Global: ${newActivity.user} ${newActivity.action}`, 'info');
        }
    }, 15000);

    return () => clearInterval(interval);
  }, [notify]);

  return (
    <div className="community-page">
      <h1 className="luxury-header">Elite Community</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
        <section>
          <div className="card">
            <h2 className="card-title">Live Performance Feed</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {activities.map(activity => (
                <div key={activity.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, #1a1a2e, #d4af37)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {activity.user[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--gold)' }}>{activity.user}</span>
                    <span style={{ color: '#ccc', marginLeft: '5px' }}>{activity.action}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#8a8a95' }}>{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="card" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a0f 100%)', border: '1px solid var(--gold)' }}>
            <h2 className="card-title" style={{ color: 'var(--gold)' }}>Global Stats</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ color: '#8a8a95', fontSize: '12px', textTransform: 'uppercase' }}>Active Challengers</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>12,842</div>
              </div>
              <div>
                <div style={{ color: '#8a8a95', fontSize: '12px', textTransform: 'uppercase' }}>Completion Rate</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>64.2%</div>
              </div>
              <div>
                <div style={{ color: '#8a8a95', fontSize: '12px', textTransform: 'uppercase' }}>Total Weight Lost</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>42,109 kg</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="card-title">Top Performers</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {[
                { name: 'Sarah J.', streak: 19 },
                { name: 'Mike T.', streak: 18 },
                { name: 'Linda W.', streak: 17 }
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{i+1}. {p.name}</span>
                  <span style={{ color: 'var(--gold)', fontWeight: 'bold' }}>{p.streak} Day Streak</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EliteCommunity;
