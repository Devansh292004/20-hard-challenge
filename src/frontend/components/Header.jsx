import React from 'react';
import { useChallenge } from '../context/ChallengeContext';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { user, logout } = useChallenge();
  const now = new Date().toLocaleString();

  return (
    <header className="app-header">
      <div className="header-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="app-title">🔥 20 Hard Challenge</h1>
            <p className="header-subtitle">A brutal, discipline-enforced accountability system</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeToggle />
            {user && (
              <button onClick={logout} className="streak-card" style={{ marginLeft: '10px', padding: '8px 16px', border: 'none', cursor: 'pointer', background: '#ef4444' }}>
                Logout
              </button>
            )}
          </div>
        </div>
        <div className="user-info">
          <span className="user-name">Welcome, {user?.name || 'Challenger'}</span>
          <span className="timestamp">{now}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
