import express from 'express';
import { getStudents } from '../controllers/studentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, getStudents);

export default router;