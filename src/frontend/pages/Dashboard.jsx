import React, { useEffect, useRef } from 'react';
import StreakDisplay from '../components/StreakDisplay';
import DailyChecklist from '../components/DailyChecklist';
import WeightTracker from '../components/WeightTracker';
import ActivityGrid from '../components/ActivityGrid';
import CommunityFeed from '../components/CommunityFeed';
import BadgeDisplay from '../components/BadgeDisplay';
import { useChallenge } from '../context/ChallengeContext';
import { useNotification } from '../context/NotificationContext';

const Dashboard = () => {
  const { user, challenge, setChallenge } = useChallenge();
  const { notify } = useNotification();
  const welcomeShown = useRef(false);

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
          setChallenge(prev => {
              if (prev && data.badges.length > prev.badges.length) {
                  const newBadge = data.badges[data.badges.length - 1];
                  notify(`🏆 Milestone Unlocked: ${newBadge.replace(/-/g, ' ').toUpperCase()}!`, 'success');
              }
              return data;
          });
        }
      } catch (err) {
        console.error('Failed to fetch challenge', err);
      }
    };

    if (user) {
      fetchChallenge();
      if (!welcomeShown.current) {
        notify('Welcome back, Athlete! Stay focused on your goals today.', 'info');
        welcomeShown.current = true;
      }
    }
  }, [user, setChallenge, notify]);

  if (!challenge) return <div className="luxury-text">Accessing Elite Performance Data...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <StreakDisplay streakData={{ currentStreak: challenge.currentStreak, longestStreak: challenge.longestStreak }} />

      <BadgeDisplay badges={challenge.badges} />

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
