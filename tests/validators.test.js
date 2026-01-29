import { describe, it, expect } from 'vitest';
import { validateUserInput, validateWeight, validateTaskCompletion } from '../src/backend/validators.js';

describe('Input Validators', () => {
  describe('validateUserInput', () => {
    it('should validate valid user input', () => {
      const validInput = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 25
      };
      expect(validateUserInput(validInput)).toBe(true);
    });

    it('should reject input with missing required fields', () => {
      const invalidInput = {
        name: 'John Doe',
        // missing email
        age: 25
      };
      expect(validateUserInput(invalidInput)).toBe(false);
    });

    it('should reject input with invalid email format', () => {
      const invalidInput = {
        name: 'John Doe',
        email: 'invalid-email',
        age: 25
      };
      expect(validateUserInput(invalidInput)).toBe(false);
    });

    it('should reject input with invalid age', () => {
      const invalidInput = {
        name: 'John Doe',
        email: 'john@example.com',
        age: -5
      };
      expect(validateUserInput(invalidInput)).toBe(false);
    });
  });

  describe('validateWeight', () => {
    it('should validate weight within acceptable range', () => {
      expect(validateWeight(75)).toBe(true);
      expect(validateWeight(50)).toBe(true);
      expect(validateWeight(150)).toBe(true);
    });

    it('should reject weight below minimum', () => {
      expect(validateWeight(20)).toBe(false);
    });

    it('should reject weight above maximum', () => {
      expect(validateWeight(300)).toBe(false);
    });

    it('should reject non-numeric weight', () => {
      expect(validateWeight('75kg')).toBe(false);
      expect(validateWeight(null)).toBe(false);
      expect(validateWeight(undefined)).toBe(false);
    });
  });

  describe('validateTaskCompletion', () => {
    it('should validate completed task with all required fields', () => {
      const task = {
        id: 'task-1',
        completed: true,
        timestamp: new Date(),
        notes: 'Task completed successfully'
      };
      expect(validateTaskCompletion(task)).toBe(true);
    });

    it('should reject task missing completion timestamp', () => {
      const task = {
        id: 'task-1',
        completed: true,
        // missing timestamp
        notes: 'Task completed'
      };
      expect(validateTaskCompletion(task)).toBe(false);
    });

    it('should reject incomplete task marked as completed', () => {
      const task = {
        id: 'task-1',
        completed: false,
        timestamp: new Date(),
        notes: 'Not done'
      };
      expect(validateTaskCompletion(task)).toBe(false);
    });

    it('should accept task with minimal required fields', () => {
      const task = {
        id: 'task-1',
        completed: true,
        timestamp: new Date()
      };
      expect(validateTaskCompletion(task)).toBe(true);
    });
  });
});

describe('Validator Edge Cases', () => {
  it('should handle empty strings gracefully', () => {
    const input = {
      name: '',
      email: '',
      age: 0
    };
    expect(validateUserInput(input)).toBe(false);
  });

  it('should handle special characters in names', () => {
    const input = {
      name: 'John O\'Brien-Smith',
      email: 'john@example.com',
      age: 30
    };
    expect(validateUserInput(input)).toBe(true);
  });

  it('should validate international email addresses', () => {
    const input = {
      name: 'José García',
      email: 'josé@ejemplo.es',
      age: 28
    };
    expect(validateUserInput(input)).toBe(true);
  });
});
