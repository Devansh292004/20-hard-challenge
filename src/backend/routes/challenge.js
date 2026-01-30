import express from 'express';
import { getChallenge, updateDailyLog, updateCustomTasks } from '../controllers/challengeController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getChallenge);
router.post('/log', auth, updateDailyLog);
router.post('/tasks', auth, updateCustomTasks);

export default router;
