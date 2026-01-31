import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Target, Zap, Award, Users, TrendingUp } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="card"
    style={{ textAlign: 'center' }}
  >
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
      <Icon size={40} color="#d4af37" />
    </div>
    <h3 style={{ marginBottom: '10px' }}>{title}</h3>
    <p style={{ color: '#8a8a95', fontSize: '14px' }}>{description}</p>
  </motion.div>
);

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', marginBottom: '20px', lineHeight: 1.1 }}>
            Forge Your <span className="gold-text-glow">Elite</span> Self
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#8a8a95', maxWidth: '700px', margin: '0 auto 40px' }}>
            The 20 Hard Challenge isn't just a program. It's a non-negotiable protocol for those who demand absolute excellence.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link to="/signup" className="btn-primary" style={{ textDecoration: 'none' }}>
              Begin Your Journey
            </Link>
            <Link to="/login" className="btn-secondary" style={{ textDecoration: 'none' }}>
              Athlete Login
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ position: 'absolute', bottom: '40px' }}
        >
          <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#555' }}>
            Scroll to Explore the Protocol
          </p>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '60px' }}>The Core Pillars</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          <FeatureCard
            icon={Shield}
            title="Iron Discipline"
            description="Strict adherence to the 20 Hard rules. No cheat meals, no missed workouts, no excuses."
            delay={0.1}
          />
          <FeatureCard
            icon={TrendingUp}
            title="Sovereign Analytics"
            description="Deep data visualization of your physical and mental progression with cinematic charts."
            delay={0.2}
          />
          <FeatureCard
            icon={Users}
            title="Elite Brotherhood"
            description="Join a global network of high-performers pushing the limits of human potential."
            delay={0.3}
          />
        </div>
      </section>

      {/* Stats / Proof Section */}
      <section style={{
        padding: '100px 20px',
        background: 'rgba(212, 175, 55, 0.03)',
        borderTop: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border)'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          gap: '40px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div className="stat-value">12.8K</div>
            <div className="stat-label">Active Athletes</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="stat-value">42T</div>
            <div className="stat-label">Weight Shed</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="stat-value">98%</div>
            <div className="stat-label">Commitment Rate</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '150px 20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '30px' }}>Ready to transcend?</h2>
        <Link to="/signup" className="btn-primary" style={{ textDecoration: 'none', padding: '15px 40px' }}>
          Initialize Protocol
        </Link>
      </section>

      <footer style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid var(--glass-border)', color: '#444', fontSize: '12px' }}>
        © 2026 ELITE PERFORMANCE PROTOCOL. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
};

export default LandingPage;
