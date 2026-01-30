import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useChallenge } from '../context/ChallengeContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useChallenge();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        navigate('/dashboard');
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%' }}>
      <section className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-title" style={{ textAlign: 'center' }}>Elite Login</h2>
        <form onSubmit={handleSubmit} className="prod-form">
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
            style={{ marginBottom: '20px' }}
          />
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Authenticate
          </button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center', color: '#8a8a95' }}>
          New athlete? <Link to="/signup" style={{ color: '#daa520' }}>Register here</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
