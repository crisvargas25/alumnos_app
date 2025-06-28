import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import axios from 'axios';

export const login = async (req: Request, res: Response) => {
  const { email, password, captchaToken } = req.body;

  // Verify reCAPTCHA
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=YOUR_RECAPTCHA_SECRET_KEY&response=${captchaToken}`
    );
    if (!response.data.success) {
      return res.status(400).json({ message: 'Invalid CAPTCHA' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'CAPTCHA verification failed' });
  }

  // Validate credentials
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'YOUR_JWT_SECRET', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const googleAuth = async (req: Request, res: Response) => {
  // Handle Google OAuth redirect and token exchange (simplified)
  res.redirect('/students');
};