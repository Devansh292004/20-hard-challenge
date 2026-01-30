import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 className="luxury-text" style={{ fontSize: '4rem', color: '#daa520', marginBottom: '20px' }}>
        ELITE PERFORMANCE 20
      </h1>
      <p className="luxury-text" style={{ fontSize: '1.5rem', color: '#8a8a95', maxWidth: '800px', marginBottom: '40px' }}>
        Transcending the boundaries of discipline. A 20-day journey to absolute mastery.
      </p>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button className="btn-primary" onClick={() => navigate('/signup')}>
          Begin Your Journey
        </button>
        <button className="nav-btn" onClick={() => navigate('/login')} style={{ border: '1px solid #daa520' }}>
          Athlete Login
        </button>
      </div>

      <div style={{ marginTop: '100px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', width: '100%', maxWidth: '1000px' }}>
        <div>
          <h3 style={{ color: '#daa520', marginBottom: '10px' }}>Strict Discipline</h3>
          <p style={{ color: '#8a8a95' }}>No compromises. Every task, every day, for 20 days.</p>
        </div>
        <div>
          <h3 style={{ color: '#daa520', marginBottom: '10px' }}>Elite Analytics</h3>
          <p style={{ color: '#8a8a95' }}>Track your evolution with precision performance data.</p>
        </div>
        <div>
          <h3 style={{ color: '#daa520', marginBottom: '10px' }}>Global Community</h3>
          <p style={{ color: '#8a8a95' }}>Join the top 1% of performers worldwide.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
