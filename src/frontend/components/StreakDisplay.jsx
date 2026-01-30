import React, { useState } from 'react';

const StreakDisplay = ({ streakData }) => {
  const { currentStreak, longestStreak } = streakData;
  const [copied, setCopied] = useState(false);

  const getRank = (streak) => {
    if (streak >= 20) return { name: 'Legend', color: '#ff00ff' };
    if (streak >= 15) return { name: 'Master', color: '#daa520' };
    if (streak >= 10) return { name: 'Elite', color: '#34d399' };
    if (streak >= 5) return { name: 'Disciplined', color: '#60a5fa' };
    return { name: 'Recruit', color: '#8a8a95' };
  };

  const rank = getRank(currentStreak);

  const handleShare = () => {
    const text = `🔥 I'm on a ${currentStreak} day streak in the 20 Hard Challenge! \n\nDiscipline is the bridge to my goals. 💎\n\nJoin the elite: http://elite-20-hard.app`;

    if (navigator.share) {
      navigator.share({
        title: '20 Hard Challenge Streak',
        text: text,
        url: 'http://elite-20-hard.app',
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="metrics-row">
      <div className="card metric-card">
        <span className="metric-label">Current Streak</span>
        <span className="metric-value highlight">{currentStreak} Days</span>
        <button
          onClick={handleShare}
          style={{
            marginTop: '10px',
            padding: '5px 10px',
            background: 'var(--gold)',
            color: 'var(--bg-deep)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          {copied ? 'Copied!' : 'Share Achievement'}
        </button>
      </div>
      <div className="card metric-card">
        <span className="metric-label">Personal Best</span>
        <span className="metric-value">{longestStreak} Days</span>
      </div>
      <div className="card metric-card">
        <span className="metric-label">Current Rank</span>
        <span className="metric-value" style={{ fontSize: '24px', color: rank.color }}>{rank.name}</span>
      </div>
    </div>
  );
};

export default StreakDisplay;
