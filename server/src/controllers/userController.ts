import { Request, Response } from 'express';
import User from '../models/User';


export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await User.find().select('name email enrollmentYear');
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Server error' });
  }
};