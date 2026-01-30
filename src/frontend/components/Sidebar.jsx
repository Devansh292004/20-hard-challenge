import React from 'react';
import { useChallenge } from '../context/ChallengeContext';
import ThemeToggle from './ThemeToggle';

const Sidebar = () => {
  const { user, logout } = useChallenge();

  const enableNotifications = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification("Reminders enabled! We'll keep you accountable.");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Reminders enabled! We'll keep you accountable.");
        }
      });
    }
  };

  return (
    <aside className="sidebar">
      <div className="user-profile">
        <div className="avatar">{user ? user.name[0] : 'E'}</div>
        <div className="user-info">
          <div className="user-name" style={{ fontWeight: 600 }}>{user ? user.name : 'Elite Athlete'}</div>
          <div className="badge">PREMIUM ACCESS</div>
        </div>
      </div>

      <nav className="side-nav">
        <button className="nav-btn active">Dashboard</button>
        <button className="nav-btn">Performance Analytics</button>
        <button className="nav-btn">Physique Report</button>
        <button className="nav-btn">Elite Community</button>
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button onClick={enableNotifications} className="nav-btn" style={{ color: 'var(--gold)' }}>
          Enable Reminders
        </button>
        <ThemeToggle />
        {user && (
          <button onClick={logout} className="nav-btn" style={{ color: '#ef4444' }}>
            Logout
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
