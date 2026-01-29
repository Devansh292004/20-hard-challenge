/**
 * UI Components for 20 Hard Challenge App
 * Modular components for different app sections
 */

/**
 * Streak Component - Displays current and longest streak
 */
export class StreakComponent {
  constructor(enforcement) {
    this.enforcement = enforcement;
  }

  render() {
    const section = document.createElement('section');
    section.className = 'streak-section';
    section.innerHTML = `
      <div class="section-header">
        <h2>🔥 Streak Status</h2>
      </div>
      <div class="streak-content">
        <div class="streak-card current">
          <div class="streak-label">Current Streak</div>
          <div class="streak-value">${this.enforcement.getCurrentStreak()}</div>
          <div class="streak-unit">days</div>
        </div>
        <div class="streak-card longest">
          <div class="streak-label">Longest Streak</div>
          <div class="streak-value">${this.enforcement.getLongestStreak()}</div>
          <div class="streak-unit">days</div>
        </div>
      </div>
      <div class="streak-footer">
        <p class="streak-message" id="streak-message"></p>
      </div>
    `;
    this.updateMessage(section);
    return section;
  }

  updateMessage(section) {
    const message = section.querySelector('#streak-message');
    const current = this.enforcement.getCurrentStreak();
    if (current === 0) {
      message.textContent = '⚠️ Streak broken! Start fresh today.';
      message.className = 'warning';
    } else if (current >= 30) {
      message.textContent = '🏆 Incredible! 30+ day streak achieved!';
      message.className = 'success';
    } else if (current >= 7) {
      message.textContent = '✨ Great progress! Keep it going!';
      message.className = 'success';
    } else {
      message.textContent = '💪 Building momentum...';
      message.className = 'info';
    }
  }
}

/**
 * Tasks Component - Displays daily task checklist
 */
export class TasksComponent {
  constructor(tasks = []) {
    this.tasks = tasks;
  }

  render() {
    const section = document.createElement('section');
    section.className = 'tasks-section';
    
    const tasksHtml = this.tasks.map((task, index) => `
      <div class="task-item ${task.completed ? 'completed' : ''}">
        <input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''} class="task-checkbox">
        <label for="task-${index}" class="task-label">${task.name}</label>
        <span class="task-time">${task.timeEstimate || 'N/A'}</span>
      </div>
    `).join('');
    
    section.innerHTML = `
      <div class="section-header">
        <h2>✅ Daily Tasks</h2>
      </div>
      <div class="tasks-content">
        ${tasksHtml || '<p class="empty-state">No tasks for today</p>'}
      </div>
      <div class="tasks-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${this.getCompletionPercentage()}%"></div>
        </div>
        <p class="progress-text">${this.getCompletionCount()}/${this.tasks.length} tasks completed</p>
      </div>
    `;
    return section;
  }

  getCompletionPercentage() {
    if (this.tasks.length === 0) return 0;
    const completed = this.tasks.filter(t => t.completed).length;
    return (completed / this.tasks.length) * 100;
  }

  getCompletionCount() {
    return this.tasks.filter(t => t.completed).length;
  }
}

/**
 * Weight Tracker Component - Displays weight progress
 */
export class WeightComponent {
  constructor(weightTracker) {
    this.tracker = weightTracker;
  }

  render() {
    const section = document.createElement('section');
    section.className = 'weight-section';
    
    const currentWeight = this.tracker.getCurrentWeight();
    const progress = this.tracker.getProgressPercentage();
    const remaining = this.tracker.getRemainingWeight();
    
    section.innerHTML = `
      <div class="section-header">
        <h2>⚖️ Weight Tracking</h2>
      </div>
      <div class="weight-content">
        <div class="weight-card">
          <div class="weight-stat">
            <span class="label">Current Weight</span>
            <span class="value">${currentWeight}kg</span>
          </div>
          <div class="weight-stat">
            <span class="label">Target Weight</span>
            <span class="value">${this.tracker.getTarget()}kg</span>
          </div>
          <div class="weight-stat">
            <span class="label">Remaining</span>
            <span class="value ${remaining <= 0 ? 'success' : ''}">${remaining}kg</span>
          </div>
        </div>
        <div class="progress-container">
          <div class="circular-progress" style="--percentage: ${progress}">
            <svg viewBox="0 0 100 100" class="progress-ring">
              <circle cx="50" cy="50" r="40" class="progress-ring-bg"></circle>
              <circle cx="50" cy="50" r="40" class="progress-ring-fill"></circle>
            </svg>
            <div class="progress-text">${Math.round(progress)}%</div>
          </div>
        </div>
      </div>
    `;
    return section;
  }
}

/**
 * Statistics Component - Displays overall app statistics
 */
export class StatsComponent {
  constructor(enforcement, weightTracker) {
    this.enforcement = enforcement;
    this.weightTracker = weightTracker;
  }

  render() {
    const section = document.createElement('section');
    section.className = 'stats-section';
    
    section.innerHTML = `
      <div class="section-header">
        <h2>📊 Statistics</h2>
      </div>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${this.enforcement.getCurrentStreak()}</div>
          <div class="stat-label">Current Streak</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${this.weightTracker.getTotalWeightLoss()}</div>
          <div class="stat-label">Total Weight Loss (kg)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${Math.round(this.weightTracker.getProgressPercentage())}</div>
          <div class="stat-label">Goal Progress (%)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${Math.round(this.weightTracker.getAverageWeight())}</div>
          <div class="stat-label">Average Weight (kg)</div>
        </div>
      </div>
    `;
    return section;
  }
}

/**
 * Header Component - Main app header
 */
export class HeaderComponent {
  constructor(userName = 'Challenger') {
    this.userName = userName;
  }

  render() {
    const header = document.createElement('header');
    header.className = 'app-header';
    header.innerHTML = `
      <div class="header-content">
        <h1 class="app-title">🔥 20 Hard Challenge</h1>
        <p class="header-subtitle">A brutal, discipline-enforced accountability system</p>
        <div class="user-info">
          <span class="user-name">Welcome, ${this.userName}</span>
          <span class="timestamp" id="current-time"></span>
        </div>
      </div>
    `;
    this.updateTime(header);
    return header;
  }

  updateTime(header) {
    const timeEl = header.querySelector('#current-time');
    if (timeEl) {
      const now = new Date().toLocaleString();
      timeEl.textContent = now;
    }
  }
}

/**
 * Footer Component - App footer with links
 */
export class FooterComponent {
  render() {
    const footer = document.createElement('footer');
    footer.className = 'app-footer';
    footer.innerHTML = `
      <div class="footer-content">
        <div class="footer-section">
          <h4>About</h4>
          <p>A comprehensive accountability app for the 20 Hard Challenge.</p>
        </div>
        <div class="footer-section">
          <h4>Features</h4>
          <ul>
            <li>Streak Tracking</li>
            <li>Task Management</li>
            <li>Weight Monitoring</li>
            <li>Data Export</li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 20 Hard Challenge. All rights reserved.</p>
      </div>
    `;
    return footer;
  }
}

/**
 * Layout Component - Combines all components into a complete layout
 */
export class Layout {
  constructor(enforcement, weightTracker, tasks = []) {
    this.enforcement = enforcement;
    this.weightTracker = weightTracker;
    this.tasks = tasks;
  }

  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }

    container.innerHTML = '';

    // Create layout structure
    const layout = document.createElement('div');
    layout.className = 'app-layout';

    // Add header
    const header = new HeaderComponent();
    layout.appendChild(header.render());

    // Create main content area
    const main = document.createElement('main');
    main.className = 'app-main';

    // Add components
    const streak = new StreakComponent(this.enforcement);
    const tasks = new TasksComponent(this.tasks);
    const weight = new WeightComponent(this.weightTracker);
    const stats = new StatsComponent(this.enforcement, this.weightTracker);

    main.appendChild(streak.render());
    main.appendChild(tasks.render());
    main.appendChild(weight.render());
    main.appendChild(stats.render());

    layout.appendChild(main);

    // Add footer
    const footer = new FooterComponent();
    layout.appendChild(footer.render());

    container.appendChild(layout);
  }
}

export default {
  StreakComponent,
  TasksComponent,
  WeightComponent,
  StatsComponent,
  HeaderComponent,
  FooterComponent,
  Layout
};
