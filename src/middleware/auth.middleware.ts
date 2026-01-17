import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.js";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("No token provided");
    const payload = verifyAccessToken(token);

    (req as any).user = payload;
    next();
  } catch (err: any) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
