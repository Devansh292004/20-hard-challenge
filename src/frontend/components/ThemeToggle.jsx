import React, { useState, useEffect } from 'react';
import { useChallenge } from '../context/ChallengeContext';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const { user, setUser } = useChallenge();

  useEffect(() => {
    const theme = user?.theme || localStorage.getItem('theme');
    if (theme === 'light') {
      setIsDark(false);
      document.body.classList.add('light-mode');
    } else {
      setIsDark(true);
      document.body.classList.remove('light-mode');
    }
  }, [user]);

  const toggleTheme = async () => {
    const newTheme = isDark ? 'light' : 'dark';

    if (isDark) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }

    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);

    if (user) {
      try {
        const response = await fetch('/api/user/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ theme: newTheme }),
        });
        if (response.ok) {
          const updatedUser = await response.json();
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      } catch (err) {
        console.error('Failed to sync theme', err);
      }
    }
  };

  return (
    <button onClick={toggleTheme} className="nav-btn" style={{ marginLeft: '10px' }}>
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
