import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// In-memory fallback
const users = [];
const generateMockId = () => [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export const signup = async (req, res) => {
  try {
    console.log('Signup attempt:', req.body);
    const { name, email, password, startWeight, targetWeight } = req.body;

    let user;
    try {
        if (mongoose.connection.readyState === 1) {
            user = await User.findOne({ email });
        } else {
            user = users.find(u => u.email === email);
        }
    } catch (e) {
        user = users.find(u => u.email === email);
    }

    if (user) {
        console.log('User already exists:', email);
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
      _id: generateMockId(),
      name,
      email,
      password,
      startWeight,
      targetWeight,
      theme: 'dark'
    };
    try {
        if (mongoose.connection.readyState === 1) {
            const dbUser = new User({ name, email, password, startWeight, targetWeight });
            await dbUser.save();
            user = dbUser;
        } else {
            users.push(newUser);
            user = newUser;
        }
    } catch (e) {
        users.push(newUser);
        user = newUser;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'supersecret', { expiresIn: '7d' });
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        startWeight: user.startWeight,
        targetWeight: user.targetWeight,
        theme: user.theme
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user;
    try {
        if (mongoose.connection.readyState === 1) {
            user = await User.findOne({ email });
        } else {
            user = users.find(u => u.email === email);
        }
    } catch (e) {
        user = users.find(u => u.email === email);
    }

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    let isMatch = false;
    if (user.comparePassword) {
        isMatch = await user.comparePassword(password);
    } else {
        isMatch = user.password === password; // Simple mock match
    }

    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'supersecret', { expiresIn: '7d' });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        startWeight: user.startWeight,
        targetWeight: user.targetWeight,
        theme: user.theme
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
