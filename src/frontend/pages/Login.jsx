import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useChallenge } from '../context/ChallengeContext';
import { motion } from 'framer-motion';
import { Shield, Key, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useChallenge();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="login-page" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card"
        style={{ maxWidth: '450px', width: '100%', padding: '40px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            padding: '15px',
            background: 'rgba(212, 175, 55, 0.1)',
            borderRadius: '20px',
            marginBottom: '20px'
          }}>
            <Shield size={40} color="#d4af37" />
          </div>
          <h2 className="luxury-header" style={{ fontSize: '1.8rem' }}>Athlete Authentication</h2>
          <p style={{ color: '#8a8a95', fontSize: '14px' }}>Access your secure performance protocol</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: '#ff4d4d', background: 'rgba(255, 77, 77, 0.1)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={18} color="#555" style={{ position: 'absolute', left: '15px', top: '15px' }} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ paddingLeft: '45px' }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Key size={18} color="#555" style={{ position: 'absolute', left: '15px', top: '15px' }} />
            <input
              type="password"
              placeholder="Security Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingLeft: '45px' }}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            Enter Command Center <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '14px', color: '#8a8a95' }}>
          Not yet recruited? <Link to="/signup" style={{ color: '#d4af37', fontWeight: 'bold', textDecoration: 'none' }}>Initialize Protocol</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
