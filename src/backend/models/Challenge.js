import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, default: Date.now },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  badges: [{
    type: String,
    enum: ['7-day-streak', '30-day-streak', 'goal-reached', 'early-bird', 'consistency-king']
  }],
  customTasks: [{
    id: String,
    label: String,
    enabled: { type: Boolean, default: true }
  }],
  dailyLogs: [{
    date: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    tasks: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} }
  }]
});

export default mongoose.models.Challenge || mongoose.model('Challenge', challengeSchema);
