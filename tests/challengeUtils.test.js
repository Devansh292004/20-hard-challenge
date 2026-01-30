import { describe, it, expect } from 'vitest';
import { calculateStreaks, isDayComplete } from '../src/backend/utils/challengeUtils.js';

describe('challengeUtils', () => {
  it('should correctly determine if a day is complete', () => {
    const completeTasks = {
      workout1: true,
      workout2: true,
      water: true,
      diet: true,
      photo: true,
      reading: true
    };
    expect(isDayComplete(completeTasks)).toBe(true);

    const incompleteTasks = { ...completeTasks, workout1: false };
    expect(isDayComplete(incompleteTasks)).toBe(false);
  });

  it('should calculate current and longest streaks', () => {
    const dailyLogs = [
      { date: '2023-01-01', status: 'completed' },
      { date: '2023-01-02', status: 'completed' },
      { date: '2023-01-03', status: 'failed' },
      { date: '2023-01-04', status: 'completed' },
      { date: '2023-01-05', status: 'completed' },
      { date: '2023-01-06', status: 'completed' },
    ];

    const { currentStreak, longestStreak } = calculateStreaks(dailyLogs);
    expect(currentStreak).toBe(3);
    expect(longestStreak).toBe(3);
  });

  it('should handle gaps and pending days', () => {
    const dailyLogs = [
      { date: '2023-01-01', status: 'completed' },
      { date: '2023-01-02', status: 'completed' },
      { date: '2023-01-03', status: 'pending' },
    ];

    const { currentStreak, longestStreak } = calculateStreaks(dailyLogs);
    expect(currentStreak).toBe(2); // Because it stopped at completed on day 2, and day 3 is pending.
    // Wait, if day 3 is pending, is the current streak 2 or 0?
    // In many apps, if today is pending, the streak is still what it was yesterday.
    // But my implementation says:
    // for (const log of sortedLogs) { if (log.status === 'completed') runningStreak++; else if (log.status === 'failed') runningStreak = 0; }
    // currentStreak = runningStreak;
    // So for the above, it would be 0 because after day 2 it was 2, but day 3 didn't increment it.
    // Actually, if it's pending, it doesn't reset it.
    // Let's re-examine my implementation.

    // log 1: completed -> running=1, longest=1
    // log 2: completed -> running=2, longest=2
    // log 3: pending -> does nothing.
    // loop ends. currentStreak = runningStreak = 2.
    // So it should be 2.
  });

  it('should reset streak on failure', () => {
     const dailyLogs = [
      { date: '2023-01-01', status: 'completed' },
      { date: '2023-01-02', status: 'failed' },
    ];

    const { currentStreak, longestStreak } = calculateStreaks(dailyLogs);
    expect(currentStreak).toBe(0);
    expect(longestStreak).toBe(1);
  });
});
