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

    const weightVal = parseFloat(weight);
    if (isNaN(weightVal) || weightVal <= 0 || weightVal >= 500) {
      throw new Error('Invalid weight value');
    }

    if (date === null) {
      throw new Error('Invalid date');
    }

    const dateVal = new Date(date);
    if (isNaN(dateVal.getTime())) {
      throw new Error('Invalid date');
    }

    const entry = {
      weight: weightVal,
      date: dateVal,
      timestamp: dateVal.getTime()
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

  getStartingWeight() {
    if (this.entries.length === 0) return this.startWeight;
    return this.entries[0].weight;
  }

  getGoalWeight() {
    return this.targetWeight;
  }

  getTarget() {
    return this.targetWeight;
  }

  setTarget(weight) {
    this.targetWeight = weight;
  }

  getCurrentWeight() {
    if (this.entries.length === 0) return this.startWeight;
    return this.entries[this.entries.length - 1].weight;
  }

  getRemainingWeight() {
    return Math.max(0, this.getCurrentWeight() - this.targetWeight);
  }

  getTotalWeightLoss() {
    return this.getStartingWeight() - this.getCurrentWeight();
  }

  isTargetAchieved() {
    return this.getCurrentWeight() <= this.targetWeight;
  }

  getAverageWeight() {
    if (this.entries.length === 0) return this.startWeight;
    const sum = this.entries.reduce((acc, curr) => acc + curr.weight, 0);
    return sum / this.entries.length;
  }

  getProgressSinceLast() {
    if (this.entries.length < 2) return null;
    return this.entries[this.entries.length - 1].weight - this.entries[this.entries.length - 2].weight;
  }

  getWeeklyAverage() {
    if (this.entries.length === 0) return 0;
    const last7 = this.entries.slice(-7);
    const sum = last7.reduce((acc, curr) => acc + curr.weight, 0);
    return sum / last7.length;
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

  getProgressPercentage() {
    const totalToLose = this.getStartingWeight() - this.targetWeight;
    if (totalToLose === 0) return 100;
    const currentLoss = this.getStartingWeight() - this.getCurrentWeight();
    return Math.min(100, (currentLoss / totalToLose) * 100);
  }
}
