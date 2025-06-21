// middleware/auth.ts
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const mockAuth = (req: Request, res: Response, next: NextFunction) => {
  req.userId = "user-id-from-firebase"; // Replace with Firebase UID later
  next();
};
