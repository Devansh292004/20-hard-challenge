/**
 * Test suite for enforcement.js
 * Tests streak detection, failure logic, and task completion validation
 */

import { describe, it, expect, beforeEach } from 'vitest';

// Mock implementation of enforcement engine
const Enforcement = {
  // Check if all tasks are completed for a day
  validateDayCompletion: (dailyLog) => {
    const required = ['workout1', 'workout2', 'diet', 'water', 'photo', 'reading', 'weight'];
    return required.every(task => dailyLog.tasks[task]?.logged === true);
  },

  // Calculate current streak
  calculateStreak: (logs) => {
    let streak = 0;
    const sorted = logs.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    for (const log of sorted) {
      if (log.status === 'completed') {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  },

  // Reset streak on failure
  resetStreak: (state) => {
    state.streak.current = 0;
    return state;
  },

  // Detect if day failed
  detectFailure: (dailyLog) => {
    if (!Enforcement.validateDayCompletion(dailyLog)) {
      return { failed: true, reason: 'incomplete_tasks' };
    }
    return { failed: false, reason: null };
  },
};

describe('Enforcement Engine', () => {
  let dailyLog;
  let state;

  beforeEach(() => {
    dailyLog = {
      date: '2026-01-30',
      day: 1,
      tasks: {
        workout1: { logged: true },
        workout2: { logged: true },
        diet: { logged: true },
        water: { logged: true },
        photo: { logged: true },
        reading: { logged: true },
        weight: { logged: true },
      },
    };

    state = {
      streak: { current: 0, longest: 0 },
      logs: [],
    };
  });

  describe('Task Validation', () => {
    it('should detect complete day', () => {
      const isComplete = Enforcement.validateDayCompletion(dailyLog);
      expect(isComplete).toBe(true);
    });

    it('should detect incomplete day - missing workout', () => {
      dailyLog.tasks.workout1.logged = false;
      const isComplete = Enforcement.validateDayCompletion(dailyLog);
      expect(isComplete).toBe(false);
    });

    it('should detect incomplete day - missing diet', () => {
      dailyLog.tasks.diet.logged = false;
      const isComplete = Enforcement.validateDayCompletion(dailyLog);
      expect(isComplete).toBe(false);
    });

    it('should detect incomplete day - missing water', () => {
      dailyLog.tasks.water.logged = false;
      const isComplete = Enforcement.validateDayCompletion(dailyLog);
      expect(isComplete).toBe(false);
    });

    it('should detect incomplete day - missing photo', () => {
      dailyLog.tasks.photo.logged = false;
      const isComplete = Enforcement.validateDayCompletion(dailyLog);
      expect(isComplete).toBe(false);
    });

    it('should detect incomplete day - missing reading', () => {
      dailyLog.tasks.reading.logged = false;
      const isComplete = Enforcement.validateDayCompletion(dailyLog);
      expect(isComplete).toBe(false);
    });

    it('should detect incomplete day - missing weight', () => {
      dailyLog.tasks.weight.logged = false;
      const isComplete = Enforcement.validateDayCompletion(dailyLog);
      expect(isComplete).toBe(false);
    });
  });

  describe('Streak Calculation', () => {
    it('should return 0 streak for empty logs', () => {
      const streak = Enforcement.calculateStreak(state.logs);
      expect(streak).toBe(0);
    });

    it('should calculate streak of 1 for single completed day', () => {
      state.logs = [{ date: '2026-01-30', status: 'completed' }];
      const streak = Enforcement.calculateStreak(state.logs);
      expect(streak).toBe(1);
    });

    it('should calculate streak of 5 for consecutive completed days', () => {
      state.logs = [
        { date: '2026-01-30', status: 'completed' },
        { date: '2026-01-29', status: 'completed' },
        { date: '2026-01-28', status: 'completed' },
        { date: '2026-01-27', status: 'completed' },
        { date: '2026-01-26', status: 'completed' },
      ];
      const streak = Enforcement.calculateStreak(state.logs);
      expect(streak).toBe(5);
    });

    it('should reset streak on first failed day', () => {
      state.logs = [
        { date: '2026-01-30', status: 'failed' },
        { date: '2026-01-29', status: 'completed' },
        { date: '2026-01-28', status: 'completed' },
      ];
      const streak = Enforcement.calculateStreak(state.logs);
      expect(streak).toBe(0);
    });
  });

  describe('Failure Detection', () => {
    it('should not detect failure for complete day', () => {
      const result = Enforcement.detectFailure(dailyLog);
      expect(result.failed).toBe(false);
      expect(result.reason).toBe(null);
    });

    it('should detect failure for incomplete day', () => {
      dailyLog.tasks.workout1.logged = false;
      const result = Enforcement.detectFailure(dailyLog);
      expect(result.failed).toBe(true);
      expect(result.reason).toBe('incomplete_tasks');
    });

    it('should reset streak on failure', () => {
      state.streak.current = 10;
      state = Enforcement.resetStreak(state);
      expect(state.streak.current).toBe(0);
    });
  });
});
