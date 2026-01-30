// Weight Loss Tracking & Enforcement
// Goal: 6kg loss in 20 days (80kg -> 74kg)
// Daily weigh-in required, failure if off track

/**
 * Weight Tracker Class
 * Tracks weight loss progress with strict daily logging
 */
export class WeightTracker {
  constructor() {
    this.entries = []; // Changed from records to entries for consistency with main.js
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
   * Log a weight entry (Alias for UI compatibility)
   */
  logWeight(weight, date = new Date()) {
    if (!this.initialized) throw new Error('Tracker not initialized');
    
    const entry = {
      weight: parseFloat(weight),
      date: date instanceof Date ? date : new Date(date)
    };

    if (isNaN(entry.weight) || entry.weight < 20 || entry.weight > 300) {
      throw new Error('Invalid weight value');
    }

    this.entries.push(entry);
    return entry;
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
    const current = this.getCurrentWeight();
    const totalToLose = this.startWeight - this.goalWeight;
    const lostSoFar = this.startWeight - current;
    
    if (totalToLose <= 0) return 100;
    const percentage = (lostSoFar / totalToLose) * 100;
    return Math.min(Math.max(percentage, 0), 100);
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
    const sum = this.entries.reduce((acc, entry) => sum + entry.weight, 0);
    return sum / this.entries.length;
  }

  /**
   * Get total weight loss
   */
  getTotalWeightLoss() {
    return this.startWeight - this.getCurrentWeight();
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

  /**
   * Export data
   */
  exportData() {
    return {
      goal: {
        start: this.startWeight,
        target: this.goalWeight,
        days: this.targetDays
      },
      stats: {
        current: this.getCurrentWeight(),
        loss: this.getTotalWeightLoss(),
        progress: this.getProgressPercentage()
      },
      history: this.entries
    };
  }
}
