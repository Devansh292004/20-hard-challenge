import { Enforcement } from './backend/enforcement.js';
import { WeightTracker } from './backend/weight-tracker.js';
import { validateUserInput } from './backend/validators.js';

/**
 * 20 Hard Challenge — Elite Performance System
 * Production-ready enterprise architecture
 */
class App {
  constructor() {
    this.enforcement = new Enforcement();
    this.weightTracker = new WeightTracker();
    this.currentStreak = 0;
    this.longestStreak = 0;
    this.initialized = false;
    this.user = null;
    this.history = [];
    this.isPremium = false;
  }

  async init() {
    try {
      console.log('Initializing Elite Performance System...');
      
      this.weightTracker.initialize(80, 74, 20);
      this.setupEventListeners();
      this.loadApplicationState();
      this.checkMonetizationStatus();
      this.render();
      
      this.initialized = true;
      console.log('Production environment ready.');
    } catch (error) {
      console.error('System initialization failed:', error);
    }
  }

  /**
   * Feedback UI Logic
   */
  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  showCelebration() {
    const overlay = document.getElementById('celebration-overlay');
    if (overlay) {
      overlay.style.display = 'flex';
      // Auto-hide after 5 seconds
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 5000);
    }
  }

  /**
   * Application State Management
   */
  loadApplicationState() {
    const state = localStorage.getItem('elite_performance_state');
    if (state) {
      const data = JSON.parse(state);
      this.currentStreak = data.currentStreak || 0;
      this.longestStreak = data.longestStreak || 0;
      this.history = data.history || [];
      this.isPremium = data.isPremium || false;
      this.user = data.user || { name: 'Elite Athlete', joined: new Date().toISOString() };
      
      if (data.weightEntries) {
        this.weightTracker.entries = data.weightEntries.map(e => ({...e, date: new Date(e.date)}));
      }
    }
  }

  saveApplicationState() {
    const state = {
      currentStreak: this.currentStreak,
      longestStreak: this.longestStreak,
      history: this.history,
      isPremium: this.isPremium,
      user: this.user,
      weightEntries: this.weightTracker.entries,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('elite_performance_state', JSON.stringify(state));
  }

  /**
   * Monetization Logic
   */
  checkMonetizationStatus() {
    if (!this.isPremium && this.currentStreak >= 3) {
      this.showUpsellModal();
    }
  }

  showUpsellModal() {
    console.log('Displaying Premium Upgrade offer...');
  }

  handleUpgrade() {
    this.isPremium = true;
    this.saveApplicationState();
    this.render();
    this.showToast('Elite Premium Unlocked');
  }

  /**
   * Data Management
   */
  exportData() {
    if (!this.isPremium) {
      alert('Export feature requires Elite Premium.');
      return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.weightTracker.entries));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "elite_performance_report.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  /**
   * Event Handling
   */
  setupEventListeners() {
    document.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox' && e.target.closest('.task-item')) {
        this.processTaskUpdate(e.target);
      }
    });

    document.addEventListener('submit', (e) => {
      if (e.target.id === 'weight-form') {
        e.preventDefault();
        this.processWeightEntry();
      }
    });
  }

  processTaskUpdate(checkbox) {
    if (checkbox.checked) {
      this.showToast('Objective Secured');
    }

    const tasks = document.querySelectorAll('.task-item input[type="checkbox"]');
    const completed = document.querySelectorAll('.task-item input[type="checkbox"]:checked');
    
    if (tasks.length === completed.length) {
      this.currentStreak++;
      if (this.currentStreak > this.longestStreak) this.longestStreak = this.currentStreak;
      this.history.push({ date: new Date().toDateString(), type: 'completion' });
      this.showCelebration();
    } else {
      this.currentStreak = 0;
    }
    
    this.saveApplicationState();
    this.renderMetrics();
    this.checkMonetizationStatus();
  }

  processWeightEntry() {
    const weightInput = document.getElementById('weight-input');
    const weight = parseFloat(weightInput.value);
    const date = new Date(document.getElementById('date-input').value);

    try {
      this.weightTracker.logWeight(weight, date);
      this.saveApplicationState();
      this.showToast('Physique Metric Logged');
      weightInput.value = '';
      this.renderWeightSection();
    } catch (e) {
      alert(e.message);
    }
  }

  /**
   * Rendering Engine
   */
  render() {
    const root = document.getElementById('app-root');
    if (!root) return;

    root.innerHTML = `
      <div class="dashboard-grid">
        <aside class="sidebar">
          <div class="user-profile">
            <div class="avatar">${this.user ? this.user.name[0] : 'E'}</div>
            <div class="user-info">
              <div class="user-name">${this.user ? this.user.name : 'Elite Athlete'}</div>
              <div class="badge">${this.isPremium ? 'PREMIUM' : 'FREE TIER'}</div>
            </div>
          </div>
          <nav class="side-nav">
            <button class="nav-btn active">Dashboard</button>
            <button class="nav-btn" onclick="app.exportData()">Export Data</button>
            ${!this.isPremium ? `<button class="nav-btn premium-btn" onclick="app.handleUpgrade()">Upgrade Pro</button>` : ''}
          </nav>
        </aside>

        <main class="main-content">
          <div class="metrics-row" id="metrics-container"></div>
          
          <div class="content-grid">
            <section class="card tasks-card">
              <h2 class="card-title">Daily Objectives</h2>
              <div id="tasks-container"></div>
            </section>
            
            <section class="card weight-card">
              <h2 class="card-title">Physique Analytics</h2>
              <div id="weight-container"></div>
            </section>
          </div>

          <section class="card analytics-card">
            <h2 class="card-title">Advanced Performance Insights</h2>
            <div id="analytics-container">
              ${this.isPremium ? '<div style="color: #8a8a95; font-style: italic;">Historical performance active. Predictive modeling enabled.</div>' : 
              '<div class="premium-lock" style="color: #daa520; font-weight: 600;">Upgrade to Elite Premium to unlock performance forecasting.</div>'}
            </div>
          </section>
        </main>
      </div>
    `;

    this.renderMetrics();
    this.renderTasks();
    this.renderWeightSection();
  }

  renderMetrics() {
    const container = document.getElementById('metrics-container');
    if (!container) return;
    container.innerHTML = `
      <div class="metric-card">
        <span class="metric-label" style="color: #8a8a95; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Current Streak</span>
        <span class="metric-value highlight">${this.currentStreak} Days</span>
      </div>
      <div class="metric-card">
        <span class="metric-label" style="color: #8a8a95; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Personal Best</span>
        <span class="metric-value">${this.longestStreak} Days</span>
      </div>
      <div class="metric-card">
        <span class="metric-label" style="color: #8a8a95; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Status</span>
        <span class="metric-value" style="font-size: 24px;">Active Performance</span>
      </div>
    `;
  }

  renderTasks() {
    const container = document.getElementById('tasks-container');
    const tasks = [
      { id: 'w1', label: 'Workout I (45 min)' },
      { id: 'w2', label: 'Workout II (Outdoor)' },
      { id: 'water', label: 'Hydration (Gallon)' },
      { id: 'diet', label: 'Optimal Nutrition' },
      { id: 'photo', label: 'Physique Evidence' },
      { id: 'reading', label: 'Knowledge (10 pages)' }
    ];

    container.innerHTML = `<div class="tasks-grid">${tasks.map(t => `
      <label class="task-item">
        <input type="checkbox" id="${t.id}">
        <span class="task-label">${t.label}</span>
      </label>
    `).join('')}</div>`;
  }

  renderWeightSection() {
    const container = document.getElementById('weight-container');
    const progress = this.weightTracker.getProgressPercentage();

    container.innerHTML = `
      <div class="weight-content" style="display: flex; align-items: center; gap: 40px;">
        <div class="stat-circle">
          <span class="circle-val">${progress.toFixed(1)}%</span>
          <span class="circle-label" style="font-size: 12px; color: #8a8a95; text-transform: uppercase; font-weight: 600;">Progress</span>
        </div>
        <form id="weight-form" class="prod-form" style="flex: 1;">
          <input type="number" id="weight-input" placeholder="Weight (kg)" step="0.1" required style="width: 100%;">
          <input type="date" id="date-input" value="${new Date().toISOString().split('T')[0]}" required style="width: 100%;">
          <button type="submit" class="btn-primary" style="width: 100%;">Log Entry</button>
        </form>
      </div>
    `;
  }
}

window.app = new App();
window.app.init();
