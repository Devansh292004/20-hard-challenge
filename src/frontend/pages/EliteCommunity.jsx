import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Users, Activity, TrendingDown, Clock, Zap } from 'lucide-react';

const mockFeed = [
  { id: 1, user: 'Marcus R.', action: 'completed Day 14', time: '2m ago', initial: 'M' },
  { id: 2, user: 'Sarah K.', action: 'hit a new personal best in Workout II', time: '15m ago', initial: 'S' },
  { id: 3, user: 'David W.', action: 'logged 4L of water', time: '1h ago', initial: 'D' },
  { id: 4, user: 'Elena M.', action: 'unlocked "7 Day Warrior" badge', time: '3h ago', initial: 'E' },
  { id: 5, user: 'Jason P.', action: 'started the 20 Hard Challenge', time: '5h ago', initial: 'J' },
  { id: 6, user: 'Victor L.', action: 'secured 100 days streak', time: '6h ago', initial: 'V' }
];

const StatCard = ({ icon: Icon, label, value, subtext }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8a8a95', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
      <Icon size={16} color="#d4af37" />
      {label}
    </div>
    <div className="stat-value" style={{ fontSize: '2rem' }}>{value}</div>
    <div style={{ color: '#4caf50', fontSize: '12px', fontWeight: 'bold' }}>{subtext}</div>
  </div>
);

const EliteCommunity = () => {
  const [feed, setFeed] = useState(mockFeed);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newUser = ['Alex B.', 'Sophie L.', 'Ryan G.', 'Mila X.', 'Thomas K.'][Math.floor(Math.random() * 5)];
      const actions = ['completed a workout', 'logged 4L water', 'started Day 1', 'secured elite status'];
      const newEntry = {
        id: Date.now(),
        user: newUser,
        action: actions[Math.floor(Math.random() * actions.length)],
        time: 'Just now',
        initial: newUser[0]
      };
      setFeed(prev => [newEntry, ...prev.slice(0, 5)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="community-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d4af37', marginBottom: '5px' }}>
            <Globe size={18} />
            <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Global Synchronisation
            </span>
          </div>
          <h1 className="luxury-header" style={{ fontSize: '2.5rem', marginBottom: '0' }}>Elite Community</h1>
        </div>

        <div style={{ textAlign: 'right' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#d4af37' }}>
              <span className="pulse-dot"></span>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>LIVE PULSE ACTIVE</span>
           </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '40px' }}>
        <StatCard icon={Users} label="Active Athletes" value="12,842" subtext="+12% this week" />
        <StatCard icon={Activity} label="Completion Rate" value="64.2%" subtext="+2.4% global avg" />
        <StatCard icon={TrendingDown} label="Total Weight Lost" value="42,109 kg" subtext="Across 42 countries" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="card" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
             <h2 className="card-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
               <Zap size={20} color="#d4af37" />
               Live Performance Feed
             </h2>
             <div style={{ fontSize: '12px', color: '#8a8a95' }}>Auto-updating in real-time</div>
          </div>

          <div className="feed-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <AnimatePresence initial={false}>
              {feed.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '15px',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.03)'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #d4af37, #b8860b)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}>
                    {item.initial}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', color: '#fff' }}>{item.user}</div>
                    <div style={{ fontSize: '14px', color: '#8a8a95' }}>{item.action}</div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#555', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={12} />
                    {item.time}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           <div className="card">
              <h3 className="card-title" style={{ fontSize: '16px', marginBottom: '20px' }}>Top Performers</h3>
              {[
                { name: 'Sarah J.', streak: '19 Day Streak' },
                { name: 'Mike T.', streak: '18 Day Streak' },
                { name: 'Linda W.', streak: '17 Day Streak' }
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ color: '#d4af37', fontWeight: 'bold' }}>{i + 1}.</span>
                    <span>{p.name}</span>
                  </div>
                  <span style={{ color: '#d4af37', fontWeight: 'bold' }}>{p.streak}</span>
                </div>
              ))}
           </div>

           <div className="card" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05), transparent)' }}>
              <h3 className="card-title" style={{ fontSize: '16px', marginBottom: '15px' }}>Global Reach</h3>
              <div style={{
                height: '150px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px dashed #333'
              }}>
                <Globe size={60} color="#222" />
              </div>
              <p style={{ fontSize: '12px', color: '#555', marginTop: '10px', textAlign: 'center' }}>
                Connecting athletes from 42+ territories.
              </p>
           </div>
        </div>
      </div>

      <style>{`
        .pulse-dot {
          width: 8px;
          height: 8px;
          background-color: #d4af37;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default EliteCommunity;
