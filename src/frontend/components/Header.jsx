import React, { useState, useEffect, useRef } from 'react';
import { useChallenge } from '../context/ChallengeContext';
import { useNotifications } from '../context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Settings as SettingsIcon, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, challenge } = useChallenge();
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 2) {
      const results = [];
      const lowerTerm = term.toLowerCase();

      // Search in metrics
      if ("performance analytics".includes(lowerTerm)) results.push({ type: 'page', label: 'Performance Analytics', path: '/analytics' });
      if ("weight physique".includes(lowerTerm)) results.push({ type: 'page', label: 'Physique Report', path: '/physique' });
      if ("community elite".includes(lowerTerm)) results.push({ type: 'page', label: 'Elite Community', path: '/community' });

      // Search in logs
      challenge?.dailyLogs.forEach(log => {
        if (log.date.includes(term)) {
          results.push({ type: 'log', label: `Protocol Log: ${log.date}`, path: '/analytics' });
        }
      });

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        padding: '10px 0',
        zIndex: 90
      }}
    >
      {/* Search Section */}
      <div style={{ position: 'relative', width: '350px' }}>
        <Search size={18} color={searchTerm ? "#d4af37" : "#444"} style={{ position: 'absolute', left: '15px', top: '12px', transition: 'color 0.3s' }} />
        <input
          type="text"
          placeholder="Command Search (e.g. 'analytics', '2026-02-15')"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid',
            borderColor: searchTerm ? 'rgba(212, 175, 55, 0.3)' : 'rgba(255,255,255,0.05)',
            padding: '10px 10px 10px 45px',
            fontSize: '14px',
            borderRadius: '10px',
            width: '100%',
            transition: 'all 0.3s ease'
          }}
        />

        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="glass-card"
              style={{
                position: 'absolute',
                top: '50px',
                left: 0,
                right: 0,
                padding: '10px',
                zIndex: 1000,
                maxHeight: '300px',
                overflowY: 'auto'
              }}
            >
              {searchResults.map((res, i) => (
                <div
                  key={i}
                  onClick={() => { navigate(res.path); setSearchTerm(''); setSearchResults([]); }}
                  style={{
                    padding: '12px 15px',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '13px'
                  }}
                  className="search-result-item"
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d4af37' }}></div>
                  {res.label}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
           {/* Notifications */}
           <div style={{ position: 'relative' }} ref={notifRef}>
             <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="icon-btn"
             >
               <Bell size={20} />
               {unreadCount > 0 && (
                 <span style={{
                   position: 'absolute',
                   top: '-2px',
                   right: '-2px',
                   background: '#d4af37',
                   color: '#000',
                   fontSize: '10px',
                   fontWeight: 'bold',
                   width: '16px',
                   height: '16px',
                   borderRadius: '50%',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   border: '2px solid #0a0a0b'
                 }}>
                   {unreadCount}
                 </span>
               )}
             </button>

             <AnimatePresence>
               {showNotifications && (
                 <motion.div
                   initial={{ opacity: 0, scale: 0.95, y: 10 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.95, y: 10 }}
                   className="glass-card"
                   style={{
                     position: 'absolute',
                     top: '45px',
                     right: 0,
                     width: '320px',
                     padding: '20px',
                     zIndex: 1000,
                     boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                   }}
                 >
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                     <h3 style={{ fontSize: '14px', fontFamily: 'Cinzel', margin: 0 }}>Protocol Alerts</h3>
                     <button
                      onClick={markAllRead}
                      style={{ background: 'none', border: 'none', color: '#d4af37', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}
                     >
                       Mark all read
                     </button>
                   </div>

                   <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                     {notifications.length === 0 ? (
                       <div style={{ textAlign: 'center', padding: '20px', color: '#444', fontSize: '13px' }}>
                         System status: All systems nominal.
                       </div>
                     ) : (
                       notifications.map(n => (
                         <div key={n.id} style={{
                           padding: '12px 0',
                           borderBottom: '1px solid rgba(255,255,255,0.05)',
                           opacity: n.read ? 0.5 : 1
                          }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                             <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>{n.title}</span>
                             <span style={{ fontSize: '10px', color: '#555' }}>{n.time}</span>
                           </div>
                           <div style={{ fontSize: '12px', color: '#8a8a95' }}>{n.message}</div>
                         </div>
                       ))
                     )}
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>

           <button
            onClick={() => navigate('/settings')}
            className="icon-btn"
           >
             <SettingsIcon size={20} />
           </button>
        </div>

        <div style={{ height: '30px', width: '1px', background: 'rgba(212,175,55,0.1)' }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>{user?.name}</div>
            <div style={{ color: '#d4af37', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>PREMIUM ACCESS</div>
          </div>
          <div
            onClick={() => navigate('/settings')}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #d4af37, #b8860b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#000',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
              cursor: 'pointer'
            }}
          >
            {user?.name?.charAt(0)}
          </div>
        </div>
      </div>

      <style>{`
        .icon-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
          color: #8a8a95;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .icon-btn:hover {
          background: rgba(212, 175, 55, 0.1);
          color: #d4af37;
          border-color: rgba(212, 175, 55, 0.2);
          transform: translateY(-2px);
        }
        .search-result-item:hover {
          background: rgba(212, 175, 55, 0.1);
          color: #d4af37;
        }
      `}</style>
    </motion.header>
  );
};

export default Header;
