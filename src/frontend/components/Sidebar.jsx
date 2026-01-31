import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useChallenge } from '../context/ChallengeContext';
import {
  LayoutDashboard,
  LineChart,
  Activity,
  Globe,
  LogOut,
  Shield,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { user, logout } = useChallenge();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/analytics', label: 'Performance', icon: LineChart },
    { path: '/physique', label: 'Physique Report', icon: Activity },
    { path: '/community', label: 'Elite Community', icon: Globe },
  ];

  return (
    <div className="glass-nav" style={{
      width: 'var(--sidebar-width)',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: '30px 20px',
      zIndex: 100
    }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '50px', display: 'flex', alignItems: 'center', gap: '12px' }}
      >
        <div style={{
          width: '40px',
          height: '40px',
          background: 'linear-gradient(135deg, #d4af37, #b8860b)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)'
        }}>
          <Shield color="#000" size={24} />
        </div>
        <div>
           <div style={{ fontFamily: 'Cinzel', fontSize: '18px', color: '#fff', fontWeight: 'bold', letterSpacing: '1px' }}>ELITE</div>
           <div style={{ fontSize: '10px', color: '#d4af37', letterSpacing: '2px', fontWeight: 'bold' }}>PROTOCOL</div>
        </div>
      </motion.div>

      <div style={{ flex: 1 }}>
        {menuItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '14px 18px',
              color: '#8a8a95',
              textDecoration: 'none',
              borderRadius: '12px',
              marginBottom: '8px',
              transition: 'all 0.3s ease',
              fontSize: '15px',
              fontWeight: '500'
            }}
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.1)', paddingTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', padding: '0 10px' }}>
           <div style={{
             width: '36px',
             height: '36px',
             borderRadius: '50%',
             background: 'rgba(212, 175, 55, 0.1)',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center'
           }}>
             <User size={18} color="#d4af37" />
           </div>
           <div>
             <div style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>{user?.name || 'Athlete'}</div>
             <div style={{ color: '#d4af37', fontSize: '10px', fontWeight: 'bold' }}>PREMIUM ACCESS</div>
           </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            color: '#ff4d4d',
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 77, 77, 0.1)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.03)'}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      <style>{`
        .nav-link:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff !important;
        }
        .nav-link.active {
          background: rgba(212, 175, 55, 0.15) !important;
          color: #d4af37 !important;
          box-shadow: inset 0 0 10px rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
