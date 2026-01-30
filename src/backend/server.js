import app from './app.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/20hard';

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000 // 5 seconds timeout
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Database connection error (continuing in mock mode):', err.message));
});
