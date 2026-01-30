import express from 'express';
import { getChallenge, updateDailyLog } from '../controllers/challengeController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getChallenge);
router.post('/log', auth, updateDailyLog);

export default router;
