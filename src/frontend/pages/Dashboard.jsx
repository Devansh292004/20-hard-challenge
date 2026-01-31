import React from 'react';
import { useChallenge } from '../context/ChallengeContext';
import DailyChecklist from '../components/DailyChecklist';
import StreakDisplay from '../components/StreakDisplay';
import WeightTracker from '../components/WeightTracker';
import BadgeDisplay from '../components/BadgeDisplay';
import ActivityGrid from '../components/ActivityGrid';
import { motion } from 'framer-motion';
import { LayoutDashboard, ShieldCheck, Zap } from 'lucide-react';

const Dashboard = () => {
  const { challenge } = useChallenge();

  if (!challenge) return <div className="luxury-text">Accessing Secure Protocol...</div>;

  return (
    <div className="dashboard-page">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d4af37', marginBottom: '5px' }}>
            <ShieldCheck size={18} />
            <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Authenticated Access
            </span>
          </div>
          <h1 className="luxury-header" style={{ fontSize: '2.5rem', marginBottom: '0' }}>Command Center</h1>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '14px', color: '#8a8a95' }}>System Status</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#4caf50', fontWeight: 'bold', fontSize: '12px' }}>
             <span style={{ width: '8px', height: '8px', background: '#4caf50', borderRadius: '50%', display: 'inline-block' }}></span>
             OPTIMAL PERFORMANCE
          </div>
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
        {/* Main Stats Row */}
        <div style={{ gridColumn: 'span 8' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <StreakDisplay />
            <WeightTracker />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <ActivityGrid />
          </div>

          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Zap size={20} color="#d4af37" />
              <h2 className="card-title" style={{ margin: 0 }}>Operational History</h2>
            </div>
            <p style={{ color: '#8a8a95', fontSize: '14px' }}>
              Your progress is being logged in the decentralized ledger. Maintain your consistency to unlock higher tiers of elite status.
            </p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ gridColumn: 'span 4' }}>
          <DailyChecklist />
          <div style={{ marginTop: '24px' }}>
            <BadgeDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
