import { Request, Response } from 'express';
import Message from '../models/Message';
import mongoose from 'mongoose';

export const sendMessage = async (req: Request, res: Response) => {
  const { recipient, content } = req.body;
  const sender = (req as any).user.userId;

  if (!recipient || !content) {
    return res.status(400).json({ message: 'Missing recipient or content' });
  }

  if (!mongoose.Types.ObjectId.isValid(recipient)) {
    return res.status(400).json({ message: 'Invalid recipient ID' });
  }

  try {
    const message = new Message({ sender, recipient, content });
    await message.save();
    res.status(201).json({ message: 'Message sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  try {
    const messages = await Message.find({ recipient: userId })
      .populate('sender', 'name')
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};