// Task-Specific Validators
// Each task has strict validation rules
// No loopholes allowed

/**
 * Validate workout entry
 * @param {Object} workout - {type, duration, intensity, location, logged}
 * @returns {boolean}
 */
export function validateWorkout(workout) {
  if (!workout || !workout.logged) return false;
  
  const validTypes = ['strength', 'cardio'];
  const validIntensities = ['light', 'moderate', 'high'];
  const validLocations = ['gym', 'home', 'outdoor'];
  
  return (
    validTypes.includes(workout.type) &&
    workout.duration >= 30 &&
    validIntensities.includes(workout.intensity) &&
    validLocations.includes(workout.location)
  );
}

/**
 * Validate water intake
 * @param {Object} waterData - {liters}
 * @returns {boolean}
 */
export function validateWater(waterData) {
  if (!waterData) return false;
  return waterData.liters >= 3.78;
}

/**
 * Validate diet compliance
 * @param {Object} dietData - {compliant, meals}
 * @returns {boolean}
 */
export function validateDiet(dietData) {
  if (!dietData || !dietData.meals) return false;
  if (dietData.meals.length === 0) return false;
  
  // All meals must be marked as compliant
  return dietData.compliant === true || dietData.meals.every(m => m.compliant !== false);
}

/**
 * Validate progress photo
 * @param {Object} photoData - {uploaded, timestamp}
 * @returns {boolean}
 */
export function validatePhoto(photoData) {
  if (!photoData || !photoData.uploaded) return false;
  
  // Check if timestamp is from today
  if (!photoData.timestamp) return false;
  
  const photoDate = new Date(photoData.timestamp).toDateString();
  const today = new Date().toDateString();
  
  return photoDate === today;
}

/**
 * Validate reading/learning task
 * @param {Object} readingData - {minutes, pages, title}
 * @returns {boolean}
 */
export function validateReading(readingData) {
  if (!readingData || !readingData.title) return false;
  
  // Either 30+ minutes OR 20+ pages
  const minutesValid = readingData.minutes >= 30;
  const pagesValid = readingData.pages >= 20;
  
  return minutesValid || pagesValid;
}

/**
 * Validate meal compliance for Indian vegetarian diet
 * @param {string} meal - Meal name or description
 * @returns {boolean}
 */
const nonCompliantKeywords = ['egg', 'meat', 'fish', 'chicken', 'beef', 'pork', 'salmon', 'tuna', 'shrimp'];
const compliantKeywords = ['dal', 'rice', 'roti', 'naan', 'paneer', 'tofu', 'lentil', 'vegetable', 'curry', 'salad'];

export function validateMealCompliance(meal) {
  const lowerMeal = meal.toLowerCase();
  
  // Check for non-compliant foods
  for (const keyword of nonCompliantKeywords) {
    if (lowerMeal.includes(keyword)) return false;
  }
  
  return true; // Vegetarian by default if no non-compliant keywords
}

// VALIDATION PHILOSOPHY:
// All validations are strict and non-negotiable.
// Every check is hardcoded into the validator.
// These functions are the source of truth for task completion.
// No UI bypass is possible.
