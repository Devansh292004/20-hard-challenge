import React, { useState } from 'react';
import { useChallenge } from '../context/ChallengeContext';
import { useNotifications } from '../context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Trash2,
  Save,
  LogOut,
  AlertTriangle,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, updateProfile, deleteAccount, logout } = useChallenge();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');

  // Profile State
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    startWeight: user?.startWeight || '',
    targetWeight: user?.targetWeight || ''
  });

  // Preferences State
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await updateProfile(profileData);
    setIsSaving(false);

    if (success) {
      addNotification({
        title: "Protocol Synchronized",
        message: "Your athlete profile has been updated successfully.",
        type: "success"
      });
    } else {
      alert("Failed to update protocol. Please verify your connection.");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("CRITICAL WARNING: This will permanently terminate your protocol data and delete your account from the Elite Ledger. This action is irreversible. Proceed?")) {
      const success = await deleteAccount();
      if (success) {
        navigate('/');
      }
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 style={{ marginBottom: '30px', fontSize: '1.5rem', fontFamily: 'Cinzel' }}>Athlete Profile</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Starting Weight (KG)</label>
                <input
                  type="number"
                  name="startWeight"
                  value={profileData.startWeight}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Target Weight (KG)</label>
                <input
                  type="number"
                  name="targetWeight"
                  value={profileData.targetWeight}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 30px', opacity: isSaving ? 0.7 : 1 }}
            >
              <Save size={18} /> {isSaving ? 'Synchronizing...' : 'Synchronize Protocol'}
            </button>
          </motion.div>
        );

      case 'notifications':
        return (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 style={{ marginBottom: '30px', fontSize: '1.5rem', fontFamily: 'Cinzel' }}>Communication Preferences</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>Push Notifications</div>
                  <div style={{ fontSize: '13px', color: '#8a8a95' }}>Receive real-time alerts for protocol resets and community activity.</div>
                </div>
                <div
                  className={`toggle ${notificationsEnabled ? 'active' : ''}`}
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                >
                  <div className="toggle-handle"></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>Weekly Digest</div>
                  <div style={{ fontSize: '13px', color: '#8a8a95' }}>Receive a summary of your performance and physique trends via email.</div>
                </div>
                <div className="toggle active">
                  <div className="toggle-handle"></div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'security':
        return (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 style={{ marginBottom: '30px', fontSize: '1.5rem', fontFamily: 'Cinzel' }}>Security & Privacy</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
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

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>Change Password</div>
                  <div style={{ fontSize: '13px', color: '#8a8a95' }}>Update your access credentials.</div>
                </div>
                <button className="btn-secondary" style={{ padding: '8px 15px', fontSize: '12px' }}>Update</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>Two-Factor Authentication</div>
                  <div style={{ fontSize: '13px', color: '#8a8a95' }}>Secure your account with an additional verification layer.</div>
                </div>
                <button className="btn-secondary" style={{ padding: '8px 15px', fontSize: '12px', opacity: 0.5 }} disabled>Coming Soon</button>
              </div>
            </div>
          </motion.div>
        );

      case 'danger':
        return (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
               <AlertTriangle color="#ff4d4d" size={32} />
               <div>
                 <h2 style={{ margin: 0, fontSize: '1.5rem', fontFamily: 'Cinzel', color: '#ff4d4d' }}>Danger Zone</h2>
                 <p style={{ margin: 0, fontSize: '13px', color: '#8a8a95' }}>Irreversible actions regarding your protocol standing.</p>
               </div>
            </div>

            <div style={{ border: '1px solid rgba(255,77,77,0.2)', borderRadius: '15px', padding: '25px', background: 'rgba(255,77,77,0.02)' }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px' }}>Terminate Protocol Account</div>
                <div style={{ fontSize: '14px', color: '#8a8a95' }}>
                  Permanently delete all your daily logs, physique photos, and progress data. This action cannot be undone.
                </div>
              </div>
              <button
                onClick={handleDeleteAccount}
                style={{
                  background: 'rgba(255,77,77,0.1)',
                  color: '#ff4d4d',
                  border: '1px solid rgba(255,77,77,0.3)',
                  padding: '12px 25px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,77,77,0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,77,77,0.1)'}
              >
                <Trash2 size={18} /> Terminate Account
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
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
          <div
            className={`settings-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} /> Profile Details
          </div>
          <div
            className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={18} /> Notifications
          </div>
          <div
            className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Shield size={18} /> Security & Privacy
          </div>
          <div
            className={`settings-nav-item ${activeTab === 'danger' ? 'active' : ''}`}
            onClick={() => setActiveTab('danger')}
            style={{ color: activeTab === 'danger' ? '#ff4d4d' : '#8a8a95' }}
          >
            <Trash2 size={18} /> Danger Zone
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '10px 0' }}></div>

          <div
            className="settings-nav-item"
            onClick={() => { logout(); navigate('/'); }}
          >
            <LogOut size={18} /> Sign Out
          </div>
        </div>

        {/* Form Area */}
        <div className="card" style={{ padding: '40px', minHeight: '500px' }}>
          <AnimatePresence mode="wait">
            {renderTabContent()}
          </AnimatePresence>
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
        .settings-nav-item.active[style*="color: rgb(255, 77, 77)"] {
           background: rgba(255, 77, 77, 0.1);
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

        input {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 12px 15px;
          border-radius: 10px;
          color: #fff;
          width: 100%;
          outline: none;
          transition: all 0.3s;
        }
        input:focus {
          border-color: rgba(212, 175, 55, 0.3);
          background: rgba(255,255,255,0.05);
        }

        .btn-secondary {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-secondary:hover:not(:disabled) {
          background: rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  );
};

export default Settings;
