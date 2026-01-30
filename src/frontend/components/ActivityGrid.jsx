import React from 'react';

const ActivityGrid = ({ logs }) => {
  // Generate last 20 days
  const days = [];
  const today = new Date();

  for (let i = 19; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const log = logs.find(l => l.date === dateStr);

    days.push({
      date: dateStr,
      status: log ? log.status : 'empty'
    });
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'var(--gold)';
      case 'failed': return '#ef4444';
      case 'pending': return '#3a3a4a';
      default: return '#1e1e2e';
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3 style={{ fontSize: '0.9rem', color: '#8a8a95', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Activity Pipeline
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '8px' }}>
        {days.map(day => (
          <div
            key={day.date}
            title={day.date}
            style={{
              width: '100%',
              paddingTop: '100%',
              backgroundColor: getStatusColor(day.status),
              borderRadius: '2px',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.7rem', color: '#6a6a75' }}>
        <span>Day 1</span>
        <span>Day 20</span>
      </div>
    </div>
  );
};

export default ActivityGrid;
