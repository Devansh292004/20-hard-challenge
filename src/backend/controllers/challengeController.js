import Challenge from '../models/Challenge.js';
import { calculateStreaks, isDayComplete } from '../utils/challengeUtils.js';
import mongoose from 'mongoose';
import { challenges } from '../data/mockDb.js';

export const getChallenge = async (req, res) => {
  try {
    let challenge;
    try {
      if (mongoose.connection.readyState === 1) {
        challenge = await Challenge.findOne({ userId: req.user.id });
      } else {
        challenge = challenges.find(c => c.userId.toString() === req.user.id.toString());
      }
    } catch (e) {
      console.error('getChallenge error, falling back to mock:', e.message);
      challenge = challenges.find(c => c.userId.toString() === req.user.id.toString());
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
        console.error('Create challenge error, falling back to mock:', e.message);
        challenge = { ...initialData };
        challenges.push(challenge);
      }
    }
    res.json(challenge);
  } catch (err) {
    console.error('getChallenge catastrophic failure:', err);
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
        challenge = challenges.find(c => c.userId.toString() === req.user.id.toString());
      }
    } catch (e) {
      challenge = challenges.find(c => c.userId.toString() === req.user.id.toString());
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
      const values = Object.values(log.tasks);
      if (values.some(v => v === false)) {
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
      console.error('updateDailyLog save error:', e.message);
    }

    res.json(challenge);
  } catch (err) {
    console.error('updateDailyLog catastrophic failure:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
