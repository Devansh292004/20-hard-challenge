import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useChallenge } from '../context/ChallengeContext';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Key, Scale, Target, Shield } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [startWeight, setStartWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const { register, error } = useChallenge();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register({
      name,
      email,
      password,
      startWeight: parseFloat(startWeight),
      targetWeight: parseFloat(targetWeight)
    });
    if (success) navigate('/dashboard');
  };

  return (
    <div className="signup-page" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ maxWidth: '500px', width: '100%', padding: '40px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            display: 'inline-flex',
            padding: '15px',
            background: 'rgba(212, 175, 55, 0.1)',
            borderRadius: '20px',
            marginBottom: '20px'
          }}>
            <Shield size={40} color="#d4af37" />
          </div>
          <h2 className="luxury-header" style={{ fontSize: '1.8rem' }}>Protocol Initialization</h2>
          <p style={{ color: '#8a8a95', fontSize: '14px' }}>Establish your athlete profile</p>
        </div>

        {error && (
          <div style={{ color: '#ff4d4d', background: 'rgba(255, 77, 77, 0.1)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={16} color="#555" style={{ position: 'absolute', left: '15px', top: '15px' }} />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ paddingLeft: '45px' }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Mail size={16} color="#555" style={{ position: 'absolute', left: '15px', top: '15px' }} />
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
            <Key size={16} color="#555" style={{ position: 'absolute', left: '15px', top: '15px' }} />
            <input
              type="password"
              placeholder="Security Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingLeft: '45px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '5px' }}>
            <div style={{ position: 'relative' }}>
              <Scale size={16} color="#555" style={{ position: 'absolute', left: '15px', top: '15px' }} />
              <input
                type="number"
                placeholder="Start Weight (kg)"
                value={startWeight}
                onChange={(e) => setStartWeight(e.target.value)}
                required
                style={{ paddingLeft: '45px' }}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <Target size={16} color="#555" style={{ position: 'absolute', left: '15px', top: '15px' }} />
              <input
                type="number"
                placeholder="Goal Weight (kg)"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                required
                style={{ paddingLeft: '45px' }}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '15px' }}>
            Begin Elite Protocol
          </button>
        </form>

        <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '14px', color: '#8a8a95' }}>
          Already part of the protocol? <Link to="/login" style={{ color: '#d4af37', fontWeight: 'bold', textDecoration: 'none' }}>Authenticate</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
