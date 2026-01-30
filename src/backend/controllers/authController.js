import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { users, generateMockId, saveMockDb } from '../data/mockDb.js';

export const signup = async (req, res) => {
  try {
    console.log('Signup attempt:', req.body);
    const { name, email, password, startWeight, targetWeight } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    let existingUser;
    try {
        if (mongoose.connection.readyState === 1) {
            existingUser = await User.findOne({ email });
        } else {
            existingUser = users.find(u => u.email === email);
        }
    } catch (e) {
        console.error('Check existing user error:', e);
        existingUser = users.find(u => u.email === email);
    }

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    let user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const mockUser = {
      _id: generateMockId(),
      name,
      email,
      password: hashedPassword,
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
            users.push(mockUser);
            saveMockDb();
            user = mockUser;
        }
    } catch (e) {
        console.error('Signup save error, falling back to mock mode:', e.message);
        // Ensure the mockUser isn't already there (unlikely but safe)
        if (!users.find(u => u.email === email)) {
            users.push(mockUser);
            saveMockDb();
        }
        user = users.find(u => u.email === email) || mockUser;
    }

    if (!user) {
        console.error('User creation failed - user object is null');
        throw new Error('Failed to create user');
    }

    console.log('User created successfully:', user._id);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'supersecret', { expiresIn: '7d' });

    console.log('Token generated for user:', user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        startWeight: user.startWeight,
        targetWeight: user.targetWeight,
        theme: user.theme || 'dark'
      }
    });
  } catch (err) {
    console.error('Signup catastrophic failure:', err);
    res.status(500).json({ message: 'Server error during account creation' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

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

    if (!user) {
      // If not found in primary check, check the other one just in case
      if (mongoose.connection.readyState === 1) {
          user = users.find(u => u.email === email);
      } else {
          // Already checked mock, nothing else to check
      }
    }

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    let isMatch = false;
    if (user.comparePassword) {
        isMatch = await user.comparePassword(password);
    } else {
        isMatch = await bcrypt.compare(password, user.password);
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
        theme: user.theme || 'dark'
      }
    });
  } catch (err) {
    console.error('Login failure:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
