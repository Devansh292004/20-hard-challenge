import Challenge from '../models/Challenge.js';
import { calculateStreaks, isDayComplete } from '../utils/challengeUtils.js';
import mongoose from 'mongoose';

const challenges = [];

export const getChallenge = async (req, res) => {
  try {
    let challenge;
    try {
      if (mongoose.connection.readyState === 1) {
        challenge = await Challenge.findOne({ userId: req.user.id });
      } else {
        challenge = challenges.find(c => c.userId === req.user.id);
      }
    } catch (e) {
      challenge = challenges.find(c => c.userId === req.user.id);
    }

    if (!challenge) {
      const initialData = {
        userId: req.user.id,
        currentStreak: 0,
        longestStreak: 0,
        dailyLogs: []
      };
      try {
        if (mongoose.connection.readyState === 1) {
          const dbChallenge = new Challenge(initialData);
          await dbChallenge.save();
          challenge = dbChallenge;
        } else {
          challenge = { ...initialData };
          challenges.push(challenge);
        }
      } catch (e) {
        challenge = { ...initialData };
        challenges.push(challenge);
      }
    }
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateDailyLog = async (req, res) => {
  try {
    const { date, tasks } = req.body;
    let challenge;
    try {
      if (mongoose.connection.readyState === 1) {
        challenge = await Challenge.findOne({ userId: req.user.id });
      } else {
        challenge = challenges.find(c => c.userId === req.user.id);
      }
    } catch (e) {
      challenge = challenges.find(c => c.userId === req.user.id);
    }

    if (!challenge) {
      challenge = { userId: req.user.id, dailyLogs: [], currentStreak: 0, longestStreak: 0 };
      challenges.push(challenge);
    }

    const logIndex = challenge.dailyLogs.findIndex(log => log.date === date);
    let log;
    if (logIndex > -1) {
      log = challenge.dailyLogs[logIndex];
      log.tasks = { ...log.tasks, ...tasks };
    } else {
      log = { date, tasks: { ...tasks }, status: 'pending' };
      challenge.dailyLogs.push(log);
    }

    // Determine status
    if (isDayComplete(log.tasks)) {
      log.status = 'completed';
    } else {
      // If any task is explicitly set to false and it's not the current day or we want strict enforcement
      // For simplicity, we'll mark as pending until end of day or if user marks as failed
      // But let's check if they explicitly failed something
      const values = Object.values(log.tasks);
      if (values.some(v => v === false)) {
          // If we are in the past, any incomplete task means failure
          const today = new Date().toISOString().split('T')[0];
          if (log.date < today) {
              log.status = 'failed';
          }
      }
    }

    // Recalculate streaks
    const { currentStreak, longestStreak } = calculateStreaks(challenge.dailyLogs);
    challenge.currentStreak = currentStreak;
    challenge.longestStreak = longestStreak;

    try {
      if (challenge.save && mongoose.connection.readyState === 1) {
        await challenge.save();
      }
    } catch (e) {
      // Mock save update already happened in memory for `challenges` array
    }

    res.json(challenge);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
