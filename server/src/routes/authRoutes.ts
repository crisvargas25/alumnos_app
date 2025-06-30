import express from 'express';
import { login, googleAuth } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.post("/google-login", googleAuth );


export default router;