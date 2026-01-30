// Weight Loss Tracking & Enforcement
// Goal: 6kg loss in 20 days (80kg -> 74kg)
// Daily weigh-in required, failure if off track

/**
 * Weight Tracker Class
 * Tracks weight loss progress with strict daily logging
 */
export class WeightTracker {
  constructor() {
    this.entries = [];
    this.startWeight = 80;
    this.goalWeight = 74;
    this.targetWeight = 74;
    this.initialized = false;
    this.targetDays = 20;
  }

  /**
   * Initialize weight loss goal
   */
  initialize(startWeight, goalWeight, days = 20) {
    if (startWeight <= goalWeight) {
      throw new Error('Start weight must be greater than goal weight');
    }
    this.startWeight = startWeight;
    this.goalWeight = goalWeight;
    this.targetWeight = goalWeight;
    this.targetDays = days;
    this.initialized = true;
    return true;
  }

  /**
   * Alias for UI and test compatibility
   */
  addRecord(weight, date = new Date()) {
    return this.logWeight(weight, date);
  }

  /**
   * Log a weight entry
   */
  logWeight(weight, date = new Date()) {
    // Basic initialization for tests that skip the initialize() call
    if (!this.initialized && !this.startWeight) {
      this.startWeight = 80;
      this.goalWeight = 74;
      this.initialized = true;
    }
    
    const entry = {
      weight: parseFloat(weight),
      date: date instanceof Date ? date : new Date(date)
    };

    if (isNaN(entry.weight) || entry.weight < 20 || entry.weight > 300) {
      throw new Error('Invalid weight value');
    }

    if (isNaN(entry.date.getTime())) {
      throw new Error('Invalid date');
    }

    this.entries.push(entry);
    return entry;
  }

  /**
   * Getters for tests
   */
  getRecords() { return this.entries; }
  getTarget() { return this.goalWeight; }
  getStartingWeight() { return this.startWeight; }
  
  /**
   * Setter for tests
   */
  setTarget(target) {
    this.goalWeight = target;
    this.targetWeight = target;
  }

  /**
   * Get current weight
   */
  getCurrentWeight() {
    if (this.entries.length === 0) return this.startWeight;
    return this.entries[this.entries.length - 1].weight;
  }

  /**
   * Get progress percentage
   */
  getProgressPercentage() {
    if (this.entries.length === 0) return 0;
    const current = this.getCurrentWeight();
    const totalToLose = this.startWeight - this.goalWeight;
    const lostSoFar = this.startWeight - current;
    
    if (totalToLose <= 0) return 100;
    const percentage = (lostSoFar / totalToLose) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  }

  /**
   * Get progress since last record
   */
  getProgressSinceLast() {
    if (this.entries.length < 2) return null;
    return this.entries[this.entries.length - 2].weight - this.getCurrentWeight();
  }

  /**
   * Get weekly average
   */
  getWeeklyAverage() {
    if (this.entries.length === 0) return 0;
    const last7 = this.entries.slice(-7);
    const sum = last7.reduce((acc, e) => acc + e.weight, 0);
    return sum / last7.length;
  }

  /**
   * Get remaining weight to lose
   */
  getRemainingWeight() {
    const current = this.getCurrentWeight();
    const remaining = current - this.goalWeight;
    return Math.max(remaining, 0);
  }

  /**
   * Get average weight
   */
  getAverageWeight() {
    if (this.entries.length === 0) return 0;
    const sum = this.entries.reduce((acc, entry) => acc + entry.weight, 0);
    return sum / this.entries.length;
  }

  /**
   * Get total weight loss
   */
  getTotalWeightLoss() {
    return this.startWeight - this.getCurrentWeight();
  }

  /**
   * Check if target achieved
   */
  isTargetAchieved() {
    return this.getCurrentWeight() <= this.goalWeight;
  }

  /**
   * Export as CSV for tests
   */
  exportAsCSV() {
    const headers = 'Date,Weight
';
    const rows = this.entries.map(e => `${e.date.toISOString()},${e.weight}`).join('
');
    return headers + rows;
  }

  /**
   * Export as JSON for tests
   */
  exportAsJSON() {
    return JSON.stringify(this.entries);
  }

  /**
   * Get daily weight loss target
   */
  getDailyTarget() {
    const totalToLose = this.startWeight - this.goalWeight;
    return totalToLose / this.targetDays;
  }

  /**
   * Validate progress
   */
  isOffTrack() {
    if (this.entries.length === 0) return false;
    const daysPassed = this.entries.length;
    const expectedLoss = this.getDailyTarget() * daysPassed;
    const actualLoss = this.getTotalWeightLoss();
    return actualLoss < expectedLoss;
  }
}
