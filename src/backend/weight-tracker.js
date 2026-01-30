// Weight Loss Tracking & Enforcement
// Goal: 6kg loss in 20 days (80kg → 74kg)
// Daily weigh-in required, failure if off track

/**
 * Weight Tracker Class
 * Tracks weight loss progress with strict daily logging
 */
export class WeightTracker {
  constructor() {
    this.records = [];
    this.startWeight = 80; // Default 80kg
    this.goalWeight = 74; // Default 74kg (6kg loss)
    this.targetWeight = 74; // For setTarget compatibility
    this.initialized = false;
    this.targetDays = 20;
  }

  /**
   * Initialize weight loss goal
   * @param {number} startWeight - Starting weight in kg
   * @param {number} goalWeight - Target weight in kg
   * @param {number} days - Challenge duration
   */
  initialize(startWeight, goalWeight, days = 20) {
    if (startWeight <= goalWeight) {
      throw new Error('Start weight must be greater than goal weight');
    }
    if (days <= 0) {
      throw new Error('Days must be positive');
    }

    this.startWeight = startWeight;
    this.goalWeight = goalWeight;
    this.targetWeight = goalWeight;
    this.targetDays = days;
    this.initialized = true;

    const totalLossTarget = startWeight - goalWeight;
    const dailyLossTarget = totalLossTarget / days;

    console.log(`✓ Tracker initialized: ${startWeight}kg → ${goalWeight}kg in ${days} days`);
    console.log(`  Daily target: ${dailyLossTarget.toFixed(3)}kg/day`);
  }

  /**
   * Add weight record with validation
   * @param {number} weight - Weight in kg
   * @param {Date} date - Date of measurement
   */
  addRecord(weight, date) {
    if (!this.initialized) {
      throw new Error('Tracker not initialized. Call initialize() first.');
    }

    // Validate weight range (20-300kg)
    if (weight <= 20 || weight >= 300) {
      throw new Error('Weight must be between 20 and 300 kg');
    }

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    this.records.push({
      weight,
      date, // Store as Date object
      timestamp: date.toISOString()
    });

    console.log(`📊 Logged: ${weight}kg on ${date.toISOString().split('T')[0]}`);
  }

  /**
   * Get all weight records
   * @returns {Array} Weight records
   */
  getRecords() {
    return this.records;
  }

  /**
   * Get starting weight
   * @returns {number} Starting weight
   */
  getStartingWeight() {
    return this.startWeight;
  }

  /**
   * Get current weight (latest record)
   * @returns {number|null} Current weight or null
   */
  getCurrentWeight() {
    if (this.records.length === 0) return null;
    return this.records[this.records.length - 1].weight;
  }

  /**
   * Get target weight
   * @returns {number} Target weight
   */
  getTarget() {
    return this.goalWeight;
  }

  /**
   * Set new target weight
   * @param {number} target - New target weight
   */
  setTarget(target) {
    this.targetWeight = target;
    this.goalWeight = target;
  }

  /**
   * Calculate total weight loss from start
   * @returns {number} Total weight loss in kg
   */
  getTotalWeightLoss() {
    const current = this.getCurrentWeight();
    if (current === null) return 0;
    return this.startWeight - current;
  }

  /**
   * Calculate average weight from all records
   * @returns {number} Average weight
   */
  getAverageWeight() {
    if (this.records.length === 0) return 0;
    const sum = this.records.reduce((acc, r) => acc + r.weight, 0);
    return sum / this.records.length;
  }

  /**
   * Calculate progress percentage towards goal
   * @returns {number} Progress percentage (0-100)
   */
  getProgressPercentage() {
    const totalLoss = this.getTotalWeightLoss();
    const targetLoss = this.startWeight - this.goalWeight;
    if (targetLoss === 0) return 0;
    return Math.min(100, (totalLoss / targetLoss) * 100);
  }

  /**
   * Get weight change since last record
   * @returns {number|null} Weight change (negative = loss)
   */
  getProgressSinceLast() {
    if (this.records.length < 2) return null;
    const last = this.records[this.records.length - 1].weight;
    const prev = this.records[this.records.length - 2].weight;
    return last - prev;
  }

  /**
   * Calculate weekly average weight loss
   * @returns {number} Average kg lost per week
   */
  getWeeklyAverage() {
    if (this.records.length < 2) return 0;
    
    const firstRecord = this.records[0];
    const lastRecord = this.records[this.records.length - 1];
    
    const weightLoss = firstRecord.weight - lastRecord.weight;
    const timeDiff = lastRecord.date - firstRecord.date;
    const weeks = timeDiff / (1000 * 60 * 60 * 24 * 7);
    
    if (weeks === 0) return 0;
    return weightLoss / weeks;
  }

  /**
   * Check if target weight is achieved
   * @returns {boolean} True if target reached
   */
  isTargetAchieved() {
    const current = this.getCurrentWeight();
    if (current === null) return false;
    return current <= this.targetWeight;
  }

  /**
   * Get remaining weight to lose
   * @returns {number} Remaining weight in kg
   */
  getRemainingWeight() {
    const current = this.getCurrentWeight();
    if (current === null) return this.startWeight - this.targetWeight;
    return Math.max(0, current - this.targetWeight);
  }

  /**
   * Export data as CSV
   * @returns {string} CSV formatted data
   */
  exportAsCSV() {
    let csv = 'Date,Weight (kg)\n';
    this.records.forEach(record => {
      const date = record.date.toISOString().split('T')[0];
      csv += `${date},${record.weight}\n`;
    });
    return csv;
  }

  /**
   * Export data as JSON
   * @returns {string} JSON formatted data
   */
  exportAsJSON() {
    return JSON.stringify({
      startWeight: this.startWeight,
      goalWeight: this.goalWeight,
      records: this.records.map(r => ({
        weight: r.weight,
        date: r.date.toISOString()
      }))
    }, null, 2);
  }

  /**
   * Check if on track for 6kg loss goal
   * Weekly requirement: ≥500g loss
   * @returns {boolean} True if on track
   */
  isOnTrack() {
    if (this.records.length < 7) return true; // Grace period first week
    
    const recentRecords = this.records.slice(-7);
    const weekStart = recentRecords[0].weight;
    const weekEnd = recentRecords[recentRecords.length - 1].weight;
    const weeklyLoss = weekStart - weekEnd;
    
    return weeklyLoss >= 0.5; // Minimum 500g per week
  }

  /**
   * Calculate statistics
   * @returns {Object} Statistics object
   */
  getStatistics() {
    return {
      totalLoss: this.getTotalWeightLoss(),
      averageWeight: this.getAverageWeight(),
      progress: this.getProgressPercentage(),
      remaining: this.getRemainingWeight(),
      onTrack: this.isOnTrack(),
      recordCount: this.records.length
    };
  }
}
