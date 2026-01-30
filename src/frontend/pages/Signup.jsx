import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useChallenge } from '../context/ChallengeContext';
import { useNotification } from '../context/NotificationContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [startWeight, setStartWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const navigate = useNavigate();
  const { setUser } = useChallenge();
  const { notify } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          startWeight: parseFloat(startWeight),
          targetWeight: parseFloat(targetWeight)
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        notify('Account created successfully! Welcome to the Elite Performance tier.', 'success');
        navigate('/dashboard');
      } else {
        notify(data.message || 'Signup failed', 'error');
      }
    } catch (err) {
      console.error('Signup error:', err);
      notify(`Signup failed: ${err.message || 'Connection error'}`, 'error');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%' }}>
      <section className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-title" style={{ textAlign: 'center' }}>Elite Registration</h2>
        <form onSubmit={handleSubmit} className="prod-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginBottom: '15px' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: '15px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: '15px' }}
          />
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input
              type="number"
              placeholder="Start Weight (kg)"
              value={startWeight}
              onChange={(e) => setStartWeight(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Goal Weight (kg)"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Begin Challenge
          </button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center', color: '#8a8a95' }}>
          Already elite? <Link to="/login" style={{ color: '#daa520' }}>Login here</Link>
        </p>
      </section>
    </div>
  );
};

export default Signup;
