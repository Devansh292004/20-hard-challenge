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

export const isDayComplete = (tasks) => {
  return (
    tasks.workout1 &&
    tasks.workout2 &&
    tasks.water &&
    tasks.diet &&
    tasks.photo &&
    tasks.reading
  );
};
