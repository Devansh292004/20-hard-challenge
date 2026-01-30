import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, default: Date.now },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  dailyLogs: [{
    date: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    tasks: {
      workout1: { type: Boolean, default: false },
      workout2: { type: Boolean, default: false },
      water: { type: Boolean, default: false },
      diet: { type: Boolean, default: false },
      photo: { type: Boolean, default: false },
      reading: { type: Boolean, default: false },
      weight: { type: Number }
    }
  }]
});

export default mongoose.model('Challenge', challengeSchema);
