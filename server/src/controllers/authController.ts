import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import axios from 'axios';

export const login = async (req: Request, res: Response) => {
  const { email, password, captchaToken } = req.body;

  // Verify reCAPTCHA
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`

    );
    if (!response.data.success) {
      return res.status(400).json({ message: 'Invalid CAPTCHA' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'CAPTCHA verification failed' });
  }

  // Validate credentials
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;

    if (!email) {
      return res.status(400).json({ message: "No se pudo obtener el email de Google" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        nombre: payload?.name || "Usuario Google",
        enrollmentYear: new Date().getFullYear(), // valor temporal predeterminado
        password: "",
        autenticadoPorGoogle: true,
      });
      await user.save();
    }


    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.json({ token: jwtToken });
  } catch (error) {
    console.error("Error con Google OAuth:", error);
    res.status(401).json({ message: "Token de Google inválido" });
  }
};
