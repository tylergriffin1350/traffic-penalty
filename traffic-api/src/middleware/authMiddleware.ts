import { NextFunction } from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // Verify the token
  jwt.verify(token, process.env.APP_AUTH_TOKEN as string, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
    }
    return next();
  });
};
