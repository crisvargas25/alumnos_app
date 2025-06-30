import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Message from '../models/Message';

// Enviar mensaje
export const sendMessage = async (req: Request, res: Response) => {
  const { recipient, content, subject, priority } = req.body;
  const sender = (req as any).user.userId;

  if (!recipient || !content || !subject || !priority) {
    return res.status(400).json({ message: 'Faltan campos obligatorios.' });
  }

  if (!mongoose.Types.ObjectId.isValid(recipient)) {
    return res.status(400).json({ message: 'ID del destinatario no válido.' });
  }

  try {
    const message = new Message({ sender, recipient, content, subject, priority });
    await message.save();
    res.status(201).json({ message: 'Mensaje enviado con éxito.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

// Obtener mensajes recibidos
export const getReceivedMessages = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  try {
    const messages = await Message.find({ recipient: userId })
      .populate('sender', 'name email') // Ajusta según tus campos del modelo User
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener mensajes recibidos.' });
  }
};

// Obtener mensajes enviados
export const getSentMessages = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  try {
    const messages = await Message.find({ sender: userId })
      .populate('recipient', 'name email')
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener mensajes enviados.' });
  }
};

// Obtener conversación entre dos usuarios
export const getConversationWithUser = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const otherUserId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(otherUserId)) {
    return res.status(400).json({ message: 'ID del usuario no válido.' });
  }

  try {
    const conversation = await Message.find({
      $or: [
        { sender: userId, recipient: otherUserId },
        { sender: otherUserId, recipient: userId }
      ]
    })
      .sort({ createdAt: 1 })
      .populate('sender', 'name')
      .populate('recipient', 'name');

    res.json(conversation);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener conversación.' });
  }
};
