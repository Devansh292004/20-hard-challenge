import React, { useState } from 'react';
import { useChallenge } from '../context/ChallengeContext';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, Lock, Save, Trash2 } from 'lucide-react';

const Settings = () => {
  const { user, challenge } = useChallenge();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [startWeight, setStartWeight] = useState(user?.startWeight || '');
  const [targetWeight, setTargetWeight] = useState(user?.targetWeight || '');

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);

  const handleSave = () => {
    // In a real app, this would call an API
    alert('Protocol Updated. Settings synchronized with the decentralized ledger.');
  };

  return (
    <div className="settings-page">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '40px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d4af37', marginBottom: '5px' }}>
          <SettingsIcon size={18} />
          <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
            System Configuration
          </span>
        </div>
        <h1 className="luxury-header" style={{ fontSize: '2.5rem' }}>Account Settings</h1>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '30px' }}>
        {/* Navigation */}
        <div className="card" style={{ padding: '10px', height: 'fit-content' }}>
          <div className="settings-nav-item active">
            <User size={18} /> Profile Details
          </div>
          <div className="settings-nav-item">
            <Bell size={18} /> Notifications
          </div>
          <div className="settings-nav-item">
            <Shield size={18} /> Security & Privacy
          </div>
          <div className="settings-nav-item" style={{ color: '#ff4d4d' }}>
            <Trash2 size={18} /> Danger Zone
          </div>
        </div>

        {/* Form Area */}
        <div className="card" style={{ padding: '40px' }}>
          <h2 style={{ marginBottom: '30px', fontSize: '1.5rem', fontFamily: 'Cinzel' }}>Athlete Profile</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Starting Weight (KG)</label>
              <input type="number" value={startWeight} onChange={(e) => setStartWeight(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Target Weight (KG)</label>
              <input type="number" value={targetWeight} onChange={(e) => setTargetWeight(e.target.value)} />
            </div>
          </div>

          <h2 style={{ marginBottom: '30px', fontSize: '1.5rem', fontFamily: 'Cinzel', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px' }}>Preferences</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>Push Notifications</div>
                <div style={{ fontSize: '13px', color: '#8a8a95' }}>Receive alerts for protocol resets and community activity.</div>
              </div>
              <div
                className={`toggle ${notificationsEnabled ? 'active' : ''}`}
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              >
                <div className="toggle-handle"></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>Private Profile</div>
                <div style={{ fontSize: '13px', color: '#8a8a95' }}>Hide your progress metrics from the Elite Community feed.</div>
              </div>
              <div
                className={`toggle ${privateProfile ? 'active' : ''}`}
                onClick={() => setPrivateProfile(!privateProfile)}
              >
                <div className="toggle-handle"></div>
              </div>
            </div>
          </div>

          <button onClick={handleSave} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 30px' }}>
            <Save size={18} /> Synchronize Protocol
          </button>
        </div>
      </div>

      <style>{`
        .settings-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 20px;
          border-radius: 10px;
          color: #8a8a95;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        .settings-nav-item:hover {
          background: rgba(255,255,255,0.03);
          color: #fff;
        }
        .settings-nav-item.active {
          background: rgba(212, 175, 55, 0.1);
          color: #d4af37;
        }
        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 13px;
          color: #8a8a95;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .toggle {
          width: 50px;
          height: 26px;
          background: rgba(255,255,255,0.1);
          border-radius: 13px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .toggle.active {
          background: #d4af37;
        }
        .toggle-handle {
          width: 20px;
          height: 20px;
          background: #fff;
          border-radius: 50%;
          position: absolute;
          top: 3px;
          left: 3px;
          transition: all 0.3s ease;
        }
        .toggle.active .toggle-handle {
          left: 27px;
        }
      `}</style>
    </div>
  );
};

export default Settings;
