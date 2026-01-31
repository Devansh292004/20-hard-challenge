import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './frontend/App';
import { ChallengeProvider } from './frontend/context/ChallengeContext';
import './frontend/styles.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChallengeProvider>
        <App />
      </ChallengeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
