export const calculateStreaks = (dailyLogs) => {
  if (!dailyLogs || dailyLogs.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Sort logs by date ascending
  const sortedLogs = [...dailyLogs].sort((a, b) => a.date.localeCompare(b.date));

  let currentStreak = 0;
  let longestStreak = 0;
  let runningStreak = 0;

  for (const log of sortedLogs) {
    if (log.status === 'completed') {
      runningStreak++;
      if (runningStreak > longestStreak) {
        longestStreak = runningStreak;
      }
    } else if (log.status === 'failed') {
      runningStreak = 0;
    }
    // 'pending' doesn't increment or reset the streak (yet)
  }

  // Current streak is the running streak at the end
  currentStreak = runningStreak;

  return { currentStreak, longestStreak };
};

export const checkBadges = (challenge, user) => {
  const newBadges = new Set(challenge.badges || []);
  const initialCount = newBadges.size;

  if (challenge.currentStreak >= 7) newBadges.add('7-day-streak');
  if (challenge.currentStreak >= 20) newBadges.add('20-day-streak');
  if (challenge.currentStreak >= 30) newBadges.add('30-day-streak');

  if (user && user.targetWeight && challenge.dailyLogs.length > 0) {
    const latestLog = challenge.dailyLogs[challenge.dailyLogs.length - 1];
    if (latestLog.tasks.weight && latestLog.tasks.weight <= user.targetWeight) {
      newBadges.add('goal-reached');
    }
  }

  if (challenge.longestStreak >= 14) newBadges.add('consistency-king');

  return {
    badges: Array.from(newBadges),
    newlyAwarded: newBadges.size > initialCount
  };
};

export const isDayComplete = (tasks, customTasks = []) => {
  // Use a map if it's a Map object (from Mongoose)
  const taskObj = tasks.get ? Object.fromEntries(tasks) : tasks;

  if (customTasks && customTasks.length > 0) {
    return customTasks
      .filter(t => t.enabled)
      .every(t => taskObj[t.id] === true);
  }

  // Default 20 Hard rules
  return (
    taskObj.workout1 &&
    taskObj.workout2 &&
    taskObj.water &&
    taskObj.diet &&
    taskObj.photo &&
    taskObj.reading
  );
};
