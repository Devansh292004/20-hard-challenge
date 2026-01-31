import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const addNotification = (notif) => {
    const newNotif = {
      id: Date.now(),
      time: 'Just now',
      read: false,
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev].slice(0, 10));
    setUnreadCount(prev => prev + 1);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  // Simulate community notifications
  useEffect(() => {
    const events = [
      { title: "Protocol Achievement", message: "Marcus just completed Day 15!", type: "success" },
      { title: "System Update", message: "New Performance Metrics are now live.", type: "info" },
      { title: "Elite Shoutout", message: "Your consistency is in the top 5%.", type: "warning" }
    ];

    const timer = setInterval(() => {
      if (Math.random() > 0.8) {
        const event = events[Math.floor(Math.random() * events.length)];
        addNotification(event);
      }
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAllRead }}>
      {children}
    </NotificationContext.Provider>
  );
};
