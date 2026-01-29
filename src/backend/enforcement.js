// 20 Hard Challenge - Enforcement Engine
// CORE LOGIC: Validates day completion and manages streak system
// NO OVERRIDES, NO EXCEPTIONS, NO LOOPHOLES

import { validateWorkout, validateWater, validateDiet, validatePhoto, validateReading, validateWeight } from './validators.js';

/**
 * Validates complete day submission
 * @param {Object} dayData - Day's task data
 * @returns {Object} { valid: boolean, failureReason: string | null }
 */
export function validateDayCompletion(dayData) {
  const { tasks } = dayData;
  const errors = [];

  // Check Workout 1
  if (!tasks.workout1?.logged) {
    errors.push('workout_1_missing');
  } else if (!validateWorkout(tasks.workout1)) {
    errors.push('workout_1_invalid');
  }

  // Check Workout 2
  if (!tasks.workout2?.logged) {
    errors.push('workout_2_missing');
  } else if (!validateWorkout(tasks.workout2)) {
    errors.push('workout_2_invalid');
  }

  // Check Water Intake
  if (!validateWater(tasks.water)) {
    errors.push('water_insufficient');
  }

  // Check Diet Compliance
  if (!validateDiet(tasks.diet)) {
    errors.push('diet_non_compliant');
  }

  // Check Progress Photo
  if (!validatePhoto(tasks.photo)) {
    errors.push('photo_missing');
  }

  // Check Reading/Learning
  if (!validateReading, validateWeight(tasks.reading)) {
    errors.push('reading_insufficient');
  }
  
 // Check Daily Weight
 if (!validateWeight(tasks.weight)) {
   errors.push('weight_insufficient');
 }

  return {
    valid: errors.length === 0,
    failures: errors,
    failureReason: errors.length > 0 ? errors[0] : null
  };
}

/**
 * Process day end (called at 23:59)
 * @param {Object} challengeData - Current challenge state
 * @param {Object} completedDay - Day data to process
 * @returns {Object} Updated challenge data
 */
export function processDayEnd(challengeData, completedDay) {
  const validation = validateDayCompletion(completedDay);
  
  const updated = { ...challengeData };

  if (!validation.valid) {
    // FAILURE: Reset streak to 0
    updated.streakData.currentStreak = 0;
    completedDay.status = 'failed';
    
    // Log failure with reason
    updated.failureHistory = updated.failureHistory || [];
    updated.failureHistory.push({
      date: completedDay.date,
      day: completedDay.day,
      reason: validation.failureReason,
      allFailures: validation.failures
    });
  } else {
    // SUCCESS: Increment streak
    updated.streakData.currentStreak += 1;
    completedDay.status = 'completed';
    
    // Update longest streak if needed
    if (updated.streakData.currentStreak > updated.streakData.longestStreak) {
      updated.streakData.longestStreak = updated.streakData.currentStreak;
    }
  }

  // Mark day as final (cannot be edited)
  completedDay.locked = true;
  completedDay.completedAt = new Date().toISOString();

  // Check if challenge won (20 consecutive days)
  if (updated.streakData.currentStreak === 20) {
    updated.challengeWon = true;
    updated.wonAt = new Date().toISOString();
  }

  return updated;
}

/**
 * Get current streak status
 * @param {Object} challengeData
 * @returns {Object} Streak information
 */
export function getStreakStatus(challengeData) {
  const { streakData, failureHistory } = challengeData;
  
  return {
    current: streakData.currentStreak,
    longest: streakData.longestStreak,
    failureCount: (failureHistory || []).length,
    challengeWon: challengeData.challengeWon || false,
    recentFailures: (failureHistory || []).slice(-5)
  };
}

/**
 * Check if day is locked (past 23:59)
 * @param {Object} dayDate
 * @returns {boolean}
 */
export function isDayLocked(dayDate, timezone = 'Asia/Singapore') {
  // Get current time in specified timezone
  const now = new Date();
  const options = { timeZone: timezone };
  const localTime = new Date(now.toLocaleString('en-US', options));
  const dayStart = new Date(dayDate.toLocaleString('en-US', options));
  
  // Compare if we're past 23:59 of the same day
  return localTime.getHours() === 23 && localTime.getMinutes() >= 59;
}

/**
 * Get next day number
 * @param {Object} challengeData
 * @returns {number}
 */
export function getNextDayNumber(challengeData) {
  const { streakData } = challengeData;
  
  if (streakData.currentStreak === 0) {
    return 1; // Restart from day 1
  }
  
  return streakData.currentStreak + 1;
}

/**
 * Initialize new challenge
 * @returns {Object} Initial challenge state
 */
export function initializeChallenge() {
  return {
    metadata: {
      version: '1.0',
      startDate: new Date().toISOString(),
      timezone: 'Asia/Singapore'
    },
    streakData: {
      currentDay: 1,
      currentStreak: 0,
      longestStreak: 0,
      dayStartedAt: new Date().toISOString()
    },
    dailyLogs: [],
    failureHistory: [],
    challengeWon: false
  };
}

// Export validation functions for reuse
export { validateWorkout, validateWater, validateDiet, validatePhoto, validateReading, validateWeight };

// ENFORCEMENT PHILOSOPHY:
// This module enforces the challenge rules at the application level.
// There are NO backdoors, NO overrides, NO admin modes.
// Every validation is mandatory and cannot be bypassed via UI.
// Code is law. Discipline is non-negotiable.
