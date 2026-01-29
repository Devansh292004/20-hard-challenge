import { describe, it, expect, beforeEach } from 'vitest';
import { WeightTracker } from '../src/backend/weight-tracker.js';

describe('Weight Tracker', () => {
  let tracker;

  beforeEach(() => {
    tracker = new WeightTracker();
  });

  describe('Initialization', () => {
    it('should initialize with empty weight records', () => {
      expect(tracker.getRecords().length).toBe(0);
    });

    it('should initialize with default weight loss target', () => {
      expect(tracker.getTarget()).toBeGreaterThan(0);
    });

    it('should initialize with valid starting weight', () => {
      const startWeight = tracker.getStartingWeight();
      expect(startWeight).toBeGreaterThan(0);
      expect(startWeight).toBeLessThan(500);
    });
  });

  describe('Adding Weight Records', () => {
    it('should add a weight record successfully', () => {
      const date = new Date();
      tracker.addRecord(75, date);
      
      expect(tracker.getRecords().length).toBe(1);
      const record = tracker.getRecords()[0];
      expect(record.weight).toBe(75);
      expect(record.date).toEqual(date);
    });

    it('should add multiple weight records in chronological order', () => {
      tracker.addRecord(80, new Date('2024-01-01'));
      tracker.addRecord(78, new Date('2024-01-02'));
      tracker.addRecord(76, new Date('2024-01-03'));
      
      expect(tracker.getRecords().length).toBe(3);
      expect(tracker.getRecords()[0].weight).toBe(80);
      expect(tracker.getRecords()[1].weight).toBe(78);
      expect(tracker.getRecords()[2].weight).toBe(76);
    });

    it('should reject invalid weight values', () => {
      expect(() => tracker.addRecord(-5, new Date())).toThrow();
      expect(() => tracker.addRecord(0, new Date())).toThrow();
      expect(() => tracker.addRecord(500, new Date())).toThrow();
    });

    it('should reject invalid dates', () => {
      expect(() => tracker.addRecord(75, 'invalid-date')).toThrow();
      expect(() => tracker.addRecord(75, null)).toThrow();
    });
  });

  describe('Weight Statistics', () => {
    beforeEach(() => {
      tracker.addRecord(80, new Date('2024-01-01'));
      tracker.addRecord(78, new Date('2024-01-02'));
      tracker.addRecord(76, new Date('2024-01-03'));
      tracker.addRecord(74, new Date('2024-01-04'));
    });

    it('should calculate current weight correctly', () => {
      expect(tracker.getCurrentWeight()).toBe(74);
    });

    it('should calculate starting weight correctly', () => {
      expect(tracker.getStartingWeight()).toBe(80);
    });

    it('should calculate total weight loss', () => {
      expect(tracker.getTotalWeightLoss()).toBe(6);
    });

    it('should calculate average weight', () => {
      const average = (80 + 78 + 76 + 74) / 4;
      expect(tracker.getAverageWeight()).toBe(average);
    });

    it('should calculate progress percentage', () => {
      const progress = tracker.getProgressPercentage();
      expect(progress).toBeGreaterThan(0);
      expect(progress).toBeLessThanOrEqual(100);
    });
  });

  describe('Progress Tracking', () => {
    it('should track weight loss progress', () => {
      tracker.addRecord(80, new Date('2024-01-01'));
      tracker.addRecord(78, new Date('2024-01-02'));
      
      const progress = tracker.getProgressSinceLast();
      expect(progress).toBe(-2);
    });

    it('should return null progress when no records exist', () => {
      expect(tracker.getProgressSinceLast()).toBeNull();
    });

    it('should calculate weekly average', () => {
      for (let i = 0; i < 7; i++) {
        tracker.addRecord(80 - i, new Date('2024-01-0' + (i + 1)));
      }
      
      const weeklyAvg = tracker.getWeeklyAverage();
      expect(weeklyAvg).toBeGreaterThan(0);
    });
  });

  describe('Target Achievement', () => {
    it('should check if target is achieved', () => {
      tracker.addRecord(75, new Date());
      tracker.setTarget(70);
      
      expect(tracker.isTargetAchieved()).toBe(false);
    });

    it('should return true when target weight is reached', () => {
      tracker.addRecord(70, new Date());
      tracker.setTarget(70);
      
      expect(tracker.isTargetAchieved()).toBe(true);
    });

    it('should calculate remaining weight to lose', () => {
      tracker.addRecord(75, new Date());
      tracker.setTarget(70);
      
      expect(tracker.getRemainingWeight()).toBe(5);
    });
  });

  describe('Data Export', () => {
    it('should export data in CSV format', () => {
      tracker.addRecord(80, new Date('2024-01-01'));
      tracker.addRecord(78, new Date('2024-01-02'));
      
      const csv = tracker.exportAsCSV();
      expect(csv).toContain('80');
      expect(csv).toContain('78');
      expect(csv).toContain('2024-01-01');
    });

    it('should export data in JSON format', () => {
      tracker.addRecord(80, new Date('2024-01-01'));
      
      const json = tracker.exportAsJSON();
      expect(json).toContain('80');
    });
  });
});
