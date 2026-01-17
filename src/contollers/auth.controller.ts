import type { Request, Response } from "express";
import { registerUser, loginUser, refreshAccessToken, logoutUser } from "../services/auth.service.js";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken } = await loginUser(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const rawToken = req.cookies.refreshToken;
    if (!rawToken) throw new Error("No refresh token provided");

    const { accessToken, refreshToken } = await refreshAccessToken(rawToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const rawToken = req.cookies.refreshToken;
    if (rawToken) await logoutUser(rawToken);

    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
