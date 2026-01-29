import { Enforcement } from './backend/enforcement.js';
import { WeightTracker } from './backend/weight-tracker.js';
import { validateUserInput } from './backend/validators.js';
import { userProfile } from './data/user-profile.json' assert { type: 'json' };

/**
 * 20 Hard Challenge Accountability App
 * A brutal, discipline-enforced accountability system
 */

class App {
  constructor() {
    this.enforcement = new Enforcement();
    this.weightTracker = new WeightTracker();
    this.userProfile = userProfile;
    this.initialized = false;
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      console.log('Initializing 20 Hard Challenge App...');
      
      // Load user data
      this.loadUserData();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Render initial UI
      this.render();
      
      this.initialized = true;
      console.log('App initialized successfully');
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.showError('Failed to initialize application');
    }
  }

  /**
   * Load user profile data
   */
  loadUserData() {
    console.log('Loading user profile:', this.userProfile);
    // User profile loaded from JSON
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Setup any global event listeners here
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
    const streakSection = this.createStreakSection();
    const tasksSection = this.createTasksSection();
    const weightSection = this.createWeightSection();

    mainContainer.appendChild(streakSection);
    mainContainer.appendChild(tasksSection);
    mainContainer.appendChild(weightSection);

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
        <h2>Current Streak</h2>
      </div>
      <div class="streak-content">
        <p>Current: ${this.enforcement.getCurrentStreak()} days</p>
        <p>Longest: ${this.enforcement.getLongestStreak()} days</p>
      </div>
    `;
    return section;
  }

  /**
   * Create tasks section
   */
  createTasksSection() {
    const section = document.createElement('section');
    section.className = 'tasks-section';
    section.innerHTML = `
      <div class="section-header">
        <h2>Daily Tasks</h2>
      </div>
      <div class="tasks-content">
        <p>Tasks tracking coming soon...</p>
      </div>
    `;
    return section;
  }

  /**
   * Create weight tracking section
   */
  createWeightSection() {
    const section = document.createElement('section');
    section.className = 'weight-section';
    section.innerHTML = `
      <div class="section-header">
        <h2>Weight Tracking</h2>
      </div>
      <div class="weight-content">
        <p>Target: ${this.userProfile.weightLossTarget}kg</p>
        <p>Tracking coming soon...</p>
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
      appRoot.innerHTML = `<div class="error-message">${message}</div>`;
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
