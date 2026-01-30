import Challenge from '../models/Challenge.js';
import User from '../models/User.js';
import { calculateStreaks, isDayComplete, checkBadges } from '../utils/challengeUtils.js';
import mongoose from 'mongoose';
import { challenges, users, saveMockDb } from '../data/mockDb.js';

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

    if (challenge) {
      // Auto-fail missed days
      const today = new Date();
      const sortedLogs = [...challenge.dailyLogs].sort((a, b) => a.date.localeCompare(b.date));

      if (sortedLogs.length > 0) {
        const lastLogDate = new Date(sortedLogs[sortedLogs.length - 1].date);
        const currentDate = new Date(lastLogDate);
        currentDate.setDate(currentDate.getDate() + 1);

        const serverToday = new Date(today.toISOString().split('T')[0]);

        let modified = false;
        while (currentDate < serverToday) {
          const dateStr = currentDate.toISOString().split('T')[0];
          if (!challenge.dailyLogs.find(l => l.date === dateStr)) {
            challenge.dailyLogs.push({
              date: dateStr,
              tasks: {},
              status: 'failed'
            });
            modified = true;
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }

        if (modified) {
          const { currentStreak, longestStreak } = calculateStreaks(challenge.dailyLogs);
          challenge.currentStreak = currentStreak;
          challenge.longestStreak = longestStreak;

          if (challenge.save && mongoose.connection.readyState === 1) {
            await challenge.save();
          } else {
            saveMockDb();
          }
        }
      }
    }

    if (!challenge) {
      const initialData = {
        userId: req.user.id,
        currentStreak: 0,
        longestStreak: 0,
        dailyLogs: [],
        badges: [],
        customTasks: [
          { id: 'workout1', label: 'Workout I (45 min)', enabled: true },
          { id: 'workout2', label: 'Workout II (45 min)', enabled: true },
          { id: 'diet', label: 'Stick to Elite Diet', enabled: true },
          { id: 'water', label: 'Drink 4L Water', enabled: true },
          { id: 'reading', label: 'Read 10 Pages', enabled: true },
          { id: 'photo', label: 'Progress Photo', enabled: true }
        ]
      };
      try {
        if (mongoose.connection.readyState === 1) {
          const dbChallenge = new Challenge(initialData);
          await dbChallenge.save();
          challenge = dbChallenge;
        } else {
          challenge = { ...initialData };
          challenges.push(challenge);
          saveMockDb();
        }
      } catch (e) {
        console.error('Create challenge error, falling back to mock:', e.message);
        challenge = { ...initialData };
        challenges.push(challenge);
        saveMockDb();
      }
    }
    res.json(challenge);
  } catch (err) {
    console.error('getChallenge catastrophic failure:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCustomTasks = async (req, res) => {
  try {
    const { customTasks } = req.body;

    // Core tasks that must always be enabled for 20 Hard Challenge
    const coreTasks = ['workout1', 'workout2', 'diet', 'water', 'reading', 'photo'];
    const invalid = customTasks.some(t => coreTasks.includes(t.id) && !t.enabled);

    if (invalid) {
      return res.status(400).json({ message: 'Core 20 Hard tasks cannot be disabled. Elite athletes do not compromise.' });
    }

    let challenge;
    if (mongoose.connection.readyState === 1) {
      challenge = await Challenge.findOneAndUpdate(
        { userId: req.user.id },
        { customTasks },
        { new: true }
      );
    } else {
      const index = challenges.findIndex(c => c.userId.toString() === req.user.id.toString());
      if (index > -1) {
        challenges[index].customTasks = customTasks;
        challenge = challenges[index];
        saveMockDb();
      }
    }

    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
    res.json(challenge);
  } catch (err) {
    console.error('updateCustomTasks failure:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateDailyLog = async (req, res) => {
  try {
    const { date, tasks } = req.body;

    // Cheating-Proofing
    const today = new Date();
    const serverTodayDate = today.toISOString().split('T')[0];

    // Disallow future logs
    if (date > serverTodayDate) {
      return res.status(400).json({ message: 'Cannot log for future dates. Stay present, Athlete.' });
    }

    // Allow logging only for today or yesterday (grace period)
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const serverYesterdayDate = yesterday.toISOString().split('T')[0];

    if (date < serverYesterdayDate) {
      return res.status(400).json({ message: 'The window for this day has closed. Elite performance requires immediate accountability.' });
    }

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
      challenge = { userId: req.user.id, dailyLogs: [], currentStreak: 0, longestStreak: 0, badges: [] };
      challenges.push(challenge);
      saveMockDb();
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
    if (isDayComplete(log.tasks, challenge.customTasks)) {
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

    // Check for badges
    let user;
    try {
        if (mongoose.connection.readyState === 1) {
            user = await User.findById(req.user.id);
        } else {
            user = users.find(u => u._id.toString() === req.user.id.toString());
        }
    } catch (e) {
        user = users.find(u => u._id.toString() === req.user.id.toString());
    }
    const { badges } = checkBadges(challenge, user);
    challenge.badges = badges;

    try {
      if (challenge.save && mongoose.connection.readyState === 1) {
        await challenge.save();
      } else {
        saveMockDb();
      }
    } catch (e) {
      console.error('updateDailyLog save error:', e.message);
      saveMockDb();
    }

    res.json(challenge);
  } catch (err) {
    console.error('updateDailyLog catastrophic failure:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
