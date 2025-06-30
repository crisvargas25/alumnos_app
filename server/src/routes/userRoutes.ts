import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getStudents } from '../controllers/userController';

const router = express.Router();

router.get('/', authMiddleware, getStudents );

export default router;