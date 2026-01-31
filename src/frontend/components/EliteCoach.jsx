import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain } from 'lucide-react';

const insights = [
  "Discipline is the highest form of self-love. Respect the protocol.",
  "Pain is temporary. Results are eternal. Today is yours.",
  "Your future self is watching you today. Don't let them down.",
  "Excellence is not an act, but a habit. Keep forging the iron.",
  "The hard way is the only way that leads to greatness.",
  "Comfort is the enemy of progress. Embrace the struggle.",
  "A king doesn't ask for permission to rule his own life.",
  "Every drop of sweat is a payment for your new reality.",
  "The elite don't wait for motivation. They rely on the system.",
  "Your only competition is the person you were yesterday.",
  "Greatness is found in the non-negotiable details.",
  "Stop negotiating with your own excellence."
];

const EliteCoach = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % insights.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card" style={{
      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(0, 0, 0, 0.4))',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.1 }}>
        <Brain size={100} color="#d4af37" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <Sparkles size={18} color="#d4af37" />
        <span style={{
          fontSize: '12px',
          fontWeight: 'bold',
          letterSpacing: '2px',
          color: '#d4af37',
          textTransform: 'uppercase'
        }}>
          Elite Insight
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          style={{
            fontSize: '18px',
            fontFamily: 'Cinzel, serif',
            lineHeight: '1.4',
            color: '#fff',
            minHeight: '60px'
          }}
        >
          "{insights[index]}"
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default EliteCoach;
