import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import studentRoutes from './routes/studentRoutes';
import messageRoutes from './routes/messageRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/alumnos', studentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/alumnos')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(3001, () => console.log('Server running on port 3001'));