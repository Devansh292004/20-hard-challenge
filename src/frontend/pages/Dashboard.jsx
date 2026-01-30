import React, { useEffect } from 'react';
import StreakDisplay from '../components/StreakDisplay';
import DailyChecklist from '../components/DailyChecklist';
import WeightTracker from '../components/WeightTracker';
import ActivityGrid from '../components/ActivityGrid';
import CommunityFeed from '../components/CommunityFeed';
import { useChallenge } from '../context/ChallengeContext';

const Dashboard = () => {
  const { user, challenge, setChallenge } = useChallenge();

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await fetch('/api/challenge', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setChallenge(data);
        }
      } catch (err) {
        console.error('Failed to fetch challenge', err);
      }
    };

    if (user) {
      fetchChallenge();
    }
  }, [user, setChallenge]);

  if (!challenge) return <div className="luxury-text">Accessing Elite Performance Data...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <StreakDisplay streakData={{ currentStreak: challenge.currentStreak, longestStreak: challenge.longestStreak }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px' }}>
        <DailyChecklist />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <WeightTracker />
          <section className="card">
            <h2 className="card-title">Advanced Performance Insights</h2>
            <div style={{ color: '#8a8a95', fontStyle: 'italic' }}>
              Historical performance active. Predictive modeling enabled.
            </div>
            <ActivityGrid logs={challenge.dailyLogs} />
          </section>
        </div>
      </div>

      <CommunityFeed />
    </div>
  );
};

export default Dashboard;
