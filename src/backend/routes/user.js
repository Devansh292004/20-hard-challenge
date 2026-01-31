import express from 'express';
import { getProfile, updateProfile, deleteAccount } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.delete('/profile', auth, deleteAccount);

export default router;
