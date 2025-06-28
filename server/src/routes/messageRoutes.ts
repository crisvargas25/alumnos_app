import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, sendMessage);
router.get('/', authMiddleware, getMessages);

export default router;