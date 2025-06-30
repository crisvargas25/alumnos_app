import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getStudents, register } from '../controllers/userController';

const router = express.Router();

router.get('/', authMiddleware, getStudents );
router.post('/register', register);

export default router;