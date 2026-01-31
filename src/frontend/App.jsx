import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PerformanceAnalytics from './pages/PerformanceAnalytics';
import PhysiqueReport from './pages/PhysiqueReport';
import EliteCommunity from './pages/EliteCommunity';
import Settings from './pages/Settings';
import LandingPage from './pages/LandingPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { useChallenge } from './context/ChallengeContext';
import ParticleBackground from './components/ParticleBackground';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function App() {
  const { user, loading } = useChallenge();
  const location = useLocation();

  if (loading) return <div className="luxury-text">Initialising Elite Protocol...</div>;

  return (
    <div className="app-container">
      <ParticleBackground />
      {user && <Sidebar />}
      <div className={user ? "main-content" : "full-content"}>
        {user && <Header />}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/dashboard"
              element={user ? <PageWrapper><Dashboard /></PageWrapper> : <Navigate to="/login" />}
            />
            <Route
              path="/analytics"
              element={user ? <PageWrapper><PerformanceAnalytics /></PageWrapper> : <Navigate to="/login" />}
            />
            <Route
              path="/physique"
              element={user ? <PageWrapper><PhysiqueReport /></PageWrapper> : <Navigate to="/login" />}
            />
            <Route
              path="/community"
              element={user ? <PageWrapper><EliteCommunity /></PageWrapper> : <Navigate to="/login" />}
            />
            <Route
              path="/settings"
              element={user ? <PageWrapper><Settings /></PageWrapper> : <Navigate to="/login" />}
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
