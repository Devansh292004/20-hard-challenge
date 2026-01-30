import { Enforcement } from './backend/enforcement.js';
import { WeightTracker } from './backend/weight-tracker.js';
import { validateUserInput } from './backend/validators.js';

/**
 * 20 Hard Challenge Accountability App
 * Elite performance tracking system
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
      this.setupTaskListeners();
      this.setupWeightTracking();

      // Load saved data from localStorage
      this.loadFromStorage();

      // Render the UI
      this.render();

      this.initialized = true;
      console.log('App initialized successfully');
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }

  /**
   * Load data from localStorage
   */
  loadFromStorage() {
    try {
      const savedData = localStorage.getItem('20hard_data');
      if (savedData) {
        const data = JSON.parse(savedData);
        this.currentStreak = data.currentStreak || 0;
        this.longestStreak = data.longestStreak || 0;
        
        // Load weight tracker data
        if (data.weightData) {
          this.weightTracker.entries = data.weightData.map(entry => ({
            ...entry,
            date: new Date(entry.date)
          }));
        }

        // Load task completion for today
        const today = new Date().toDateString();
        if (data.lastCompletionDate === today && data.completedTasks) {
          data.completedTasks.forEach(taskId => {
            const checkbox = document.getElementById(taskId);
            if (checkbox) checkbox.checked = true;
          });
        }
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  }

  /**
   * Save data to localStorage
   */
  saveToStorage() {
    try {
      const completedTasks = Array.from(document.querySelectorAll('.task-item input[type="checkbox"]:checked'))
        .map(cb => cb.id);

      const data = {
        currentStreak: this.currentStreak,
        longestStreak: this.longestStreak,
        weightData: this.weightTracker.entries,
        completedTasks: completedTasks,
        lastCompletionDate: new Date().toDateString()
      };

      localStorage.setItem('20hard_data', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  /**
   * Setup task checkbox listeners
   */
  setupTaskListeners() {
    document.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox' && e.target.closest('.task-item')) {
        this.handleTaskToggle();
      }
    });
  }

  /**
   * Handle task checkbox toggle
   */
  handleTaskToggle() {
    const allTasks = document.querySelectorAll('.task-item input[type="checkbox"]');
    const completedTasks = document.querySelectorAll('.task-item input[type="checkbox"]:checked');
    
    const allComplete = allTasks.length > 0 && allTasks.length === completedTasks.length;
    
    if (allComplete) {
      this.currentStreak++;
      if (this.currentStreak > this.longestStreak) {
        this.longestStreak = this.currentStreak;
      }
    } else {
      this.currentStreak = 0;
    }

    this.saveToStorage();
    this.renderStreakSection();
  }

  /**
   * Setup weight tracking form
   */
  setupWeightTracking() {
    const form = document.getElementById('weight-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleWeightSubmit();
      });
    }
  }

  /**
   * Handle weight form submission
   */
  handleWeightSubmit() {
    const weightInput = document.getElementById('weight-input');
    const dateInput = document.getElementById('date-input');

    if (!weightInput || !dateInput) return;

    const weight = parseFloat(weightInput.value);
    const date = new Date(dateInput.value);

    if (isNaN(weight) || weight < 20 || weight > 300) {
      alert('Please enter a valid weight between 20 and 300 kg');
      return;
    }

    try {
      this.weightTracker.logWeight(weight, date);
      weightInput.value = '';
      dateInput.value = new Date().toISOString().split('T')[0];
      
      this.saveToStorage();
      this.renderWeightSection();
    } catch (error) {
      alert(error.message);
    }
  }

  /**
   * Render the entire application
   */
  render() {
    const appRoot = document.getElementById('app-root');
    if (!appRoot) return;

    appRoot.innerHTML = `
      <div class="section">
        <h2 class="section-title">Performance Metrics</h2>
        <div id="streak-section"></div>
      </div>

      <div class="section">
        <h2 class="section-title">Daily Objectives</h2>
        <div id="tasks-section"></div>
      </div>

      <div class="section">
        <h2 class="section-title">Physique Progress</h2>
        <div id="weight-section"></div>
      </div>
    `;

    this.renderStreakSection();
    this.renderTasksSection();
    this.renderWeightSection();
  }

  /**
   * Render streak status section
   */
  renderStreakSection() {
    const streakSection = document.getElementById('streak-section');
    if (!streakSection) return;

    streakSection.innerHTML = `
      <div class="streak-grid">
        <div class="streak-card">
          <div class="streak-label">Current Streak</div>
          <div class="streak-value">${this.currentStreak}</div>
        </div>
        <div class="streak-card">
          <div class="streak-label">Longest Streak</div>
          <div class="streak-value">${this.longestStreak}</div>
        </div>
      </div>
    `;
  }

  /**
   * Render tasks section
   */
  renderTasksSection() {
    const tasksSection = document.getElementById('tasks-section');
    if (!tasksSection) return;

    const tasks = [
      { id: 'workout1', label: 'Workout 1 (45 min)' },
      { id: 'workout2', label: 'Workout 2 (45 min, outdoor)' },
      { id: 'water', label: 'Gallon of Water' },
      { id: 'diet', label: 'Vegetarian Diet' },
      { id: 'photo', label: 'Progress Photo' },
      { id: 'reading', label: 'Reading (10 pages)' }
    ];

    tasksSection.innerHTML = `
      <div class="tasks-grid">
        ${tasks.map(task => `
          <label class="task-item">
            <input type="checkbox" id="${task.id}">
            <span class="task-label">${task.label}</span>
          </label>
        `).join('')}
      </div>
    `;
  }

  /**
   * Render weight tracking section
   */
  renderWeightSection() {
    const weightSection = document.getElementById('weight-section');
    if (!weightSection) return;

    const currentWeight = this.weightTracker.getCurrentWeight();
    const targetWeight = this.weightTracker.targetWeight;
    const progress = this.weightTracker.getProgressPercentage();
    const remaining = this.weightTracker.getRemainingWeight();

    weightSection.innerHTML = `
      <div class="weight-section">
        <div class="weight-stats">
          <div class="stat-item">
            <div class="stat-label">Current</div>
            <div class="stat-value">${currentWeight ? currentWeight.toFixed(1) : '—'} kg</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Target</div>
            <div class="stat-value">${targetWeight.toFixed(1)} kg</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Progress</div>
            <div class="stat-value">${progress.toFixed(1)}%</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Remaining</div>
            <div class="stat-value">${remaining.toFixed(1)} kg</div>
          </div>
        </div>

        <form id="weight-form" class="weight-form">
          <div class="form-group">
            <label class="form-label" for="weight-input">Weight (kg)</label>
            <input type="number" id="weight-input" class="form-input" step="0.1" min="20" max="300" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="date-input">Date</label>
            <input type="date" id="date-input" class="form-input" value="${new Date().toISOString().split('T')[0]}" required>
          </div>
          <button type="submit" class="btn-primary">Log Weight</button>
        </form>
      </div>
    `;
  }
}

// Initialize the app
const app = new App();
app.init();
