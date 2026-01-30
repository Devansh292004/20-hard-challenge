import User from '../models/User.js';
import mongoose from 'mongoose';
import { users, saveMockDb } from '../data/mockDb.js';

export const getProfile = async (req, res) => {
  try {
    let user;
    try {
        if (mongoose.connection.readyState === 1) {
            user = await User.findById(req.user.id).select('-password');
        } else {
            user = users.find(u => u._id.toString() === req.user.id.toString());
        }
    } catch (e) {
        user = users.find(u => u._id.toString() === req.user.id.toString());
    }

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // If it's a mock user, don't return password
    const userResponse = user.toObject ? user.toObject() : { ...user };
    delete userResponse.password;

    res.json(userResponse);
  } catch (err) {
    console.error('getProfile failure:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    let user;
    try {
        if (mongoose.connection.readyState === 1) {
            user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password');
        } else {
            const index = users.findIndex(u => u._id.toString() === req.user.id.toString());
            if (index > -1) {
                users[index] = { ...users[index], ...req.body };
                saveMockDb();
                user = users[index];
            }
        }
    } catch (e) {
        const index = users.findIndex(u => u._id.toString() === req.user.id.toString());
        if (index > -1) {
            users[index] = { ...users[index], ...req.body };
            saveMockDb();
            user = users[index];
        }
    }

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const userResponse = user.toObject ? user.toObject() : { ...user };
    delete userResponse.password;

    res.json(userResponse);
  } catch (err) {
    console.error('updateProfile failure:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
