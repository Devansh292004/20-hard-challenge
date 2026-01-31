import React from 'react';
import { useChallenge } from '../context/ChallengeContext';
import { motion } from 'framer-motion';
import { Bell, Search, Settings } from 'lucide-react';

const Header = () => {
  const { user } = useChallenge();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        padding: '10px 0'
      }}
    >
      <div style={{ position: 'relative', width: '300px' }}>
        <Search size={18} color="#444" style={{ position: 'absolute', left: '15px', top: '12px' }} />
        <input
          type="text"
          placeholder="Search performance metrics..."
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            padding: '10px 10px 10px 45px',
            fontSize: '14px'
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
           <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a8a95' }}><Bell size={20} /></button>
           <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a8a95' }}><Settings size={20} /></button>
        </div>

        <div style={{ height: '30px', width: '1px', background: 'rgba(212,175,55,0.1)' }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>{user?.name}</div>
            <div style={{ color: '#d4af37', fontSize: '10px', fontWeight: 'bold' }}>ELITE ATHLETE</div>
          </div>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #d4af37, #b8860b)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#000',
            boxShadow: '0 4px 10px rgba(212, 175, 55, 0.2)'
          }}>
            {user?.name?.charAt(0)}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
