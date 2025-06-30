import express from 'express';
import {
  sendMessage,
  getReceivedMessages,
  getSentMessages,
  getConversationWithUser
} from '../controllers/messageController';
// import authMiddleware from '../middlewares/auth'; // Tu middleware de autenticación

const router = express.Router();

router.post('/', sendMessage);
router.get('/received', getReceivedMessages);
router.get('/sent', getSentMessages);
router.get('/conversation/:userId', getConversationWithUser);

export default router;
