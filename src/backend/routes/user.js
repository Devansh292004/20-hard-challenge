import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router;
