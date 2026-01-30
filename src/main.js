import { Enforcement } from './backend/enforcement.js';
import { WeightTracker } from './backend/weight-tracker.js';
import { validateUserInput } from './backend/validators.js';

/**
 * 20 Hard Challenge Accountability App
 * A brutal, discipline-enforced accountability system
 */
class App {
  constructor() {
    this.enforcement = new Enforcement();
    this.weightTracker = new WeightTracker();
    this.currentStreak = 0;
    this.longestStreak = 0;
    this.initialized = false;
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      console.log('Initializing 20 Hard Challenge App...');
      
      // Initialize weight tracker
      this.weightTracker.initialize(80, 74, 20);
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Render initial UI
      this.render();
      
      this.initialized = true;
      console.log('App initialized successfully');
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.showError('Failed to initialize application: ' + error.message);
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Weight form submission
    document.addEventListener('submit', (e) => {
      if (e.target.id === 'weight-form') {
        e.preventDefault();
        this.handleWeightSubmit(e);
      }
    });

    // Task checkbox changes
    document.addEventListener('change', (e) => {
      if (e.target.classList.contains('task-checkbox')) {
        this.handleTaskChange(e);
      }
    });
  }

  /**
   * Handle weight form submission
   */
  handleWeightSubmit(e) {
    try {
      const formData = new FormData(e.target);
      const weight = parseFloat(formData.get('weight'));
      const date = new Date(formData.get('date'));

      this.weightTracker.addRecord(weight, date);
      this.render(); // Re-render to show updated stats
      e.target.reset();
    } catch (error) {
      alert('Error adding weight: ' + error.message);
    }
  }

  /**
   * Handle task checkbox change
   */
  handleTaskChange(e) {
    const taskName = e.target.dataset.task;
    const completed = e.target.checked;
    console.log(`Task ${taskName} ${completed ? 'completed' : 'uncompleted'}`);
    // Update streak logic here
  }

  /**
   * Render the application UI
   */
  render() {
    const appRoot = document.getElementById('app-root');
    if (!appRoot) {
      console.error('App root element not found');
      return;
    }

    // Clear existing content
    appRoot.innerHTML = '';

    // Create main container
    const mainContainer = document.createElement('div');
    mainContainer.className = 'main-container';

    // Create sections
    mainContainer.appendChild(this.createStreakSection());
    mainContainer.appendChild(this.createTasksSection());
    mainContainer.appendChild(this.createWeightSection());

    appRoot.appendChild(mainContainer);
  }

  /**
   * Create streak display section
   */
  createStreakSection() {
    const section = document.createElement('section');
    section.className = 'streak-section';
    section.innerHTML = `
      <div class="section-header">
        <h2>🔥 Streak Status</h2>
      </div>
      <div class="streak-content">
        <div class="streak-card">
          <div class="streak-label">Current Streak</div>
          <div class="streak-value">${this.currentStreak} days</div>
        </div>
        <div class="streak-card">
          <div class="streak-label">Longest Streak</div>
          <div class="streak-value">${this.longestStreak} days</div>
        </div>
      </div>
    `;
    return section;
  }

  /**
   * Create tasks section
   */
  createTasksSection() {
    const tasks = [
      { id: 'workout1', label: '🏋️ Workout 1 (45 min)', name: 'workout1' },
      { id: 'workout2', label: '🏃 Workout 2 (45 min, outdoor)', name: 'workout2' },
      { id: 'water', label: '💧 Gallon of Water', name: 'water' },
      { id: 'diet', label: '🥗 Vegetarian Diet', name: 'diet' },
      { id: 'photo', label: '📷 Progress Photo', name: 'photo' },
      { id: 'reading', label: '📚 Reading (10 pages)', name: 'reading' }
    ];

    const section = document.createElement('section');
    section.className = 'tasks-section';
    
    let tasksHTML = `
      <div class="section-header">
        <h2>📋 Daily Tasks</h2>
      </div>
      <div class="tasks-content">
    `;

    tasks.forEach(task => {
      tasksHTML += `
        <div class="task-item">
          <label>
            <input 
              type="checkbox" 
              class="task-checkbox" 
              data-task="${task.name}"
              id="${task.id}"
            >
            <span>${task.label}</span>
          </label>
        </div>
      `;
    });

    tasksHTML += '</div>';
    section.innerHTML = tasksHTML;
    return section;
  }

  /**
   * Create weight tracking section
   */
  createWeightSection() {
    const stats = this.weightTracker.getStatistics();
    const current = this.weightTracker.getCurrentWeight();
    const target = this.weightTracker.getTarget();

    const section = document.createElement('section');
    section.className = 'weight-section';
    section.innerHTML = `
      <div class="section-header">
        <h2>⚖️ Weight Tracking</h2>
      </div>
      <div class="weight-content">
        <div class="weight-stats">
          <div class="stat-card">
            <div class="stat-label">Current</div>
            <div class="stat-value">${current || 'No data'}kg</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Target</div>
            <div class="stat-value">${target}kg</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Progress</div>
            <div class="stat-value">${stats.progress.toFixed(1)}%</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Remaining</div>
            <div class="stat-value">${stats.remaining.toFixed(1)}kg</div>
          </div>
        </div>
        <form id="weight-form" class="weight-form">
          <div class="form-group">
            <label for="weight-input">Weight (kg):</label>
            <input 
              type="number" 
              id="weight-input" 
              name="weight" 
              step="0.1" 
              min="20" 
              max="300" 
              required
            >
          </div>
          <div class="form-group">
            <label for="date-input">Date:</label>
            <input 
              type="date" 
              id="date-input" 
              name="date" 
              value="${new Date().toISOString().split('T')[0]}"
              required
            >
          </div>
          <button type="submit" class="btn-primary">Log Weight</button>
        </form>
      </div>
    `;
    return section;
  }

  /**
   * Show error message
   */
  showError(message) {
    const appRoot = document.getElementById('app-root');
    if (appRoot) {
      appRoot.innerHTML = `
        <div class="error-message">
          <h3>❌ Error</h3>
          <p>${message}</p>
        </div>
      `;
    }
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
  });
} else {
  const app = new App();
  app.init();
}

// Export for testing
export { App };
