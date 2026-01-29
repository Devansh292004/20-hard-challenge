// Weight Loss Tracking & Enforcement
// Goal: 5kg loss in 20 days (80kg → 75kg)
// Daily weigh-in required, failure if off track

/**
 * Initialize weight loss goal
 * @param {number} startWeight - Starting weight in kg (80)
 * @param {number} goalWeight - Target weight in kg (75)
 * @param {number} days - Challenge duration (20)
 * @returns {Object} Weight tracking config
 */
export function initializeWeightGoal(startWeight, goalWeight, days) {
  const totalLossTarget = startWeight - goalWeight; // 5kg
  const daysRemaining = days;
  const dailyLossTarget = totalLossTarget / daysRemaining; // 0.25kg/day

  return {
    startWeight,
    goalWeight,
    totalLossTarget,
    dailyLossTarget,
    days,
    tolerance: 0.1, // ±100g tolerance per day
    startDate: new Date().toISOString(),
    weightLog: []
  };
}

/**
 * Validate daily weight entry
 * @param {Object} weightGoal - Weight goal config
 * @param {number} dayNumber - Current day (1-20)
 * @param {number} currentWeight - Today's weight in kg
 * @returns {Object} {valid, weight, expectedRange, deviation, message}
 */
export function validateWeightProgress(weightGoal, dayNumber, currentWeight) {
  const { startWeight, goalWeight, totalLossTarget, tolerance } = weightGoal;
  
  // Expected weight at this day
  const expectedDailyLoss = (totalLossTarget / weightGoal.days) * dayNumber;
  const expectedWeight = startWeight - expectedDailyLoss;
  
  // Acceptable range (with tolerance)
  const minWeight = expectedWeight - tolerance;
  const maxWeight = expectedWeight + tolerance;
  
  // Actual deviation
  const deviation = currentWeight - expectedWeight;
  const isOnTrack = currentWeight <= expectedWeight + tolerance;
  
  return {
    valid: isOnTrack,
    weight: currentWeight,
    expectedWeight: parseFloat(expectedWeight.toFixed(2)),
    range: {
      min: parseFloat(minWeight.toFixed(2)),
      max: parseFloat(maxWeight.toFixed(2))
    },
    deviation: parseFloat(deviation.toFixed(2)),
    dayNumber,
    message: isOnTrack 
      ? `✓ On track! Expected: ${expectedWeight.toFixed(2)}kg, Current: ${currentWeight}kg`
      : `✗ Off track by ${Math.abs(deviation).toFixed(2)}kg. Expected: ${expectedWeight.toFixed(2)}kg`
  };
}

/**
 * Check if weight loss is acceptable for day completion
 * Missing weight entry = automatic day fail
 * @param {Object} dayData - Day's task data
 * @param {Object} weightGoal - Weight goal config
 * @returns {boolean} Is weight logged?
 */
export function validateWeightLogged(dayData, weightGoal) {
  if (!dayData.tasks.weight) return false;
  if (!dayData.tasks.weight.logged) return false;
  if (dayData.tasks.weight.value === null) return false;
  return true;
}

/**
 * Get weight tracking statistics
 * @param {Array} weightLog - Daily weight entries
 * @param {number} startWeight - Start weight
 * @returns {Object} Stats for dashboard
 */
export function getWeightStats(weightLog, startWeight) {
  if (!weightLog || weightLog.length === 0) {
    return {
      currentWeight: startWeight,
      totalLoss: 0,
      averageDailyLoss: 0,
      trend: 'no_data',
      entries: 0
    };
  }

  const entries = weightLog.filter(e => e.weight !== null);
  const currentWeight = entries[entries.length - 1]?.weight || startWeight;
  const totalLoss = startWeight - currentWeight;
  const averageDailyLoss = totalLoss / entries.length;

  // Trend detection (last 3 days)
  let trend = 'stable';
  if (entries.length >= 3) {
    const last3 = entries.slice(-3);
    const recentLoss = last3[0].weight - last3[2].weight;
    if (recentLoss > 0.2) trend = 'losing';
    if (recentLoss < -0.2) trend = 'gaining';
  }

  return {
    currentWeight: parseFloat(currentWeight.toFixed(2)),
    totalLoss: parseFloat(totalLoss.toFixed(2)),
    averageDailyLoss: parseFloat(averageDailyLoss.toFixed(3)),
    trend,
    entries: entries.length
  };
}

/**
 * Calculate BMI and body composition
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {Object} BMI and category
 */
export function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  let category = 'Normal';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi >= 25) category = 'Overweight';
  else if (bmi >= 30) category = 'Obese';

  return {
    bmi: parseFloat(bmi.toFixed(1)),
    category,
    height,
    weight
  };
}

/**
 * Estimate daily calorie deficit needed for 5kg loss
 * 1kg = ~7700 kcal deficit
 * 5kg = ~38,500 kcal in 20 days
 * @returns {Object} Calorie targets
 */
export function estimateCalorieDeficit() {
  const totalDeficitNeeded = 5 * 7700; // 38,500 kcal
  const daysInChallenge = 20;
  const dailyDeficit = totalDeficitNeeded / daysInChallenge; // ~1925 kcal/day

  return {
    totalDeficitNeeded: Math.round(totalDeficitNeeded),
    daysInChallenge,
    dailyDeficitNeeded: Math.round(dailyDeficit),
    note: 'Deficit = BMR - TDEE. Must create deficit through diet + exercise.',
    warning: 'Very aggressive deficit. Ensure proper nutrition and medical clearance.'
  };
}

/**
 * Get weight loss projections
 * @param {number} currentWeight
 * @param {number} averageDailyLoss
 * @param {number} daysRemaining
 * @returns {Object} Projected weight at end of challenge
 */
export function projectFinalWeight(currentWeight, averageDailyLoss, daysRemaining) {
  const projectedLoss = averageDailyLoss * daysRemaining;
  const projectedWeight = currentWeight - projectedLoss;

  return {
    currentWeight: parseFloat(currentWeight.toFixed(2)),
    projectedWeight: parseFloat(projectedWeight.toFixed(2)),
    projectedLoss: parseFloat(projectedLoss.toFixed(2)),
    daysRemaining,
    onTrackFor5kg: projectedLoss >= 4.9 // Allow 100g margin
  };
}

/**
 * WEIGHT ENFORCEMENT RULES
 * - Daily weigh-in MANDATORY (missing = day fails)
 * - Weight must be within tolerance of expected progress
 * - Tolerance: ±0.1kg (100g) buffer per day
 * - Off-track = challenge restarts to Day 1
 * - No exceptions, no manual overrides
 */

export const WEIGHT_RULES = {
  startWeight: 80, // kg
  goalWeight: 75, // kg
  totalLossTarget: 5, // kg
  dailyLossTarget: 0.25, // kg per day
  daylyTolerance: 0.1, // ±100g
  measurementTime: '07:00', // Same time daily (AM, fasted)
  isMandatory: true, // Part of daily checklist
  enforceExecution: true, // Failure if missing
  notes: 'Weigh-in must be same time daily, preferably morning after bathroom, before food'
};
