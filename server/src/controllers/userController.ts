
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';


export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await User.find().select('name email enrollmentYear');
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Server error' });
  }
};





export const register = async (req: Request, res: Response) => {
  const { name, email, password, enrollmentYear, captchaToken } = req.body;

  // 1) Verifica reCAPTCHA
  try {
    const resp = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
    );
    if (!resp.data.success) {
      return res.status(400).json({ message: 'Invalid CAPTCHA' });
    }
  } catch {
    return res.status(500).json({ message: 'CAPTCHA verification failed' });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  const salt    = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashPwd,
    enrollmentYear,
    google: false
  });

  await user.save();

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: '1h'
  });
  return res.status(201).json({ token });
};