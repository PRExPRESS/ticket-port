import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ notToken:true, message: 'Access denied. No token provided!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // req.user = decoded as { id: number; email: string; role: string }; // Add user information to the request object
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
