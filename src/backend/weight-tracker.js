// Weight Loss Tracking & Enforcement
// Goal: 5kg loss in 20 days (80kg → 75kg)
// Daily weigh-in required, failure if off track

/**
 * Weight Tracker Class
 * Tracks weight loss progress with strict daily logging
 */
export class WeightTracker {
  constructor() {
    this.records = [];
    this.startWeight = 0;
    this.goalWeight = 0;
    this.targetDays = 20;
    this.initialized = false;
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
    this.targetDays = days;
    this.initialized = true;
    
    const totalLossTarget = startWeight - goalWeight;
    const dailyLossTarget = totalLossTarget / days;
    
    return {
      startWeight,
      goalWeight,
      totalLossTarget,
      dailyLossTarget,
      days,
      tolerance: 0.1, // ±100g tolerance per day
      startDate: new Date().toISOString()
    };
  }

  /**
   * Add a weight record
   * @param {number} weight - Current weight in kg
   * @param {Date} date - Date of measurement
   */
  addRecord(weight, date = new Date()) {
    if (!this.initialized) {
      throw new Error('Tracker not initialized');
    }
    if (typeof weight !== 'number' || weight <= 0) {
      throw new Error('Invalid weight value');
    }
    
    this.records.push({
      weight,
      date: date.toISOString(),
      dayNumber: this.records.length + 1
    });
    
    return this.records[this.records.length - 1];
  }

  /**
   * Get all weight records
   * @returns {Array} Array of weight records
   */
  getRecords() {
    return [...this.records];
  }

  /**
   * Get target weight
   * @returns {number} Goal weight
   */
  getTarget() {
    return this.goalWeight || 75; // Default to 75kg
  }

  /**
   * Get starting weight
   * @returns {number} Starting weight
   */
  getStartingWeight() {
    return this.startWeight || 80; // Default to 80kg
  }

  /**
   * Calculate total weight loss so far
   * @returns {number} Total loss in kg
   */
  calculateTotalLoss() {
    if (this.records.length === 0) return 0;
    const latestWeight = this.records[this.records.length - 1].weight;
    return this.startWeight - latestWeight;
  }

  /**
   * Calculate weight loss percentage
   * @returns {number} Percentage of goal achieved
   */
  calculateProgress() {
    const totalLoss = this.calculateTotalLoss();
    const targetLoss = this.startWeight - this.goalWeight;
    return (totalLoss / targetLoss) * 100;
  }

  /**
   * Get current weight
   * @returns {number|null} Current weight or null if no records
   */
  getCurrentWeight() {
    if (this.records.length === 0) return null;
    return this.records[this.records.length - 1].weight;
  }

  /**
   * Check if on track for weight loss goal
   * @returns {Object} Status with isOnTrack boolean and details
   */
  checkProgress() {
    if (this.records.length === 0) {
      return { isOnTrack: true, message: 'No records yet' };
    }
    
    const dayNumber = this.records.length;
    const currentWeight = this.getCurrentWeight();
    const expectedLoss = ((this.startWeight - this.goalWeight) / this.targetDays) * dayNumber;
    const expectedWeight = this.startWeight - expectedLoss;
    const tolerance = 0.1 * dayNumber; // ±100g per day
    
    const isOnTrack = currentWeight <= (expectedWeight + tolerance);
    
    return {
      isOnTrack,
      dayNumber,
      currentWeight,
      expectedWeight,
      tolerance,
      difference: currentWeight - expectedWeight,
      message: isOnTrack ? 'On track!' : 'Behind schedule'
    };
  }

  /**
   * Get weight loss statistics
   * @returns {Object} Statistics object
   */
  getStatistics() {
    if (this.records.length === 0) {
      return {
        totalLoss: 0,
        averageDailyLoss: 0,
        daysLogged: 0,
        remainingLoss: this.startWeight - this.goalWeight,
        progressPercentage: 0
      };
    }
    
    const totalLoss = this.calculateTotalLoss();
    const daysLogged = this.records.length;
    const averageDailyLoss = totalLoss / daysLogged;
    const remainingLoss = Math.max(0, this.goalWeight - this.getCurrentWeight());
    const progressPercentage = this.calculateProgress();
    
    return {
      totalLoss,
      averageDailyLoss,
      daysLogged,
      remainingLoss,
      progressPercentage
    };
  }
}

// ENFORCEMENT PHILOSOPHY:
// Weight must be logged daily.
// Progress is tracked strictly against linear targets.
// No excuses for being off track - the numbers don't lie.
