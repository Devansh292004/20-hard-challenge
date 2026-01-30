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
   * Add a weight entry
   */
  logWeight(weight, date = new Date()) {
    if (!this.initialized) {
      throw new Error('Tracker not initialized');
    }
    const entry = {
      weight: parseFloat(weight),
      date: new Date(date),
      timestamp: new Date(date).getTime()
    };
    this.entries.push(entry);
    this.entries.sort((a, b) => a.timestamp - b.timestamp);
    return entry;
  }

  /**
   * Alias for test compatibility
   */
  addRecord(weight, date = new Date()) {
    return this.logWeight(weight, date);
  }

  /**
   * Get all records
   */
  getRecords() {
    return this.entries;
  }

  /**
   * Alias for consistency
   */
  getEntries() {
    return this.entries;
  }

  getStartWeight() {
    return this.startWeight;
  }

  getGoalWeight() {
    return this.goalWeight;
  }

  getTargetWeight() {
    return this.goalWeight;
  }

  getCurrentWeight() {
    if (this.entries.length === 0) return this.startWeight;
    return this.entries[this.entries.length - 1].weight;
  }

  getTotalWeightLoss() {
    return this.startWeight - this.getCurrentWeight();
  }

  isTargetAchieved() {
    return this.getCurrentWeight() <= this.goalWeight;
  }

  exportAsCSV() {
    const headers = 'Date,Weight\n';
    const rows = this.entries.map(e => `${e.date.toISOString()},${e.weight}`).join('\n');
    return headers + rows;
  }

  exportAsJSON() {
    return JSON.stringify(this.entries);
  }

  getDailyTarget() {
    const totalToLose = this.startWeight - this.goalWeight;
    return totalToLose / this.targetDays;
  }

  isOffTrack() {
    if (this.entries.length === 0) return false;
    const daysPassed = Math.max(1, this.entries.length);
    const expectedLoss = this.getDailyTarget() * daysPassed;
    const actualLoss = this.getTotalWeightLoss();
    return actualLoss < expectedLoss;
  }
}
