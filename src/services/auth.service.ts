import { User } from "../models/auth.model.js";
import { RefreshToken } from "../models/refresh.model.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { createAccessToken } from "../utils/jwt.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const registerUser = async ({ username, email, password }: RegisterInput) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already registered");

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return { id: user._id, username: user.username, email: user.email };
};

export const loginUser = async ({ email, password }: LoginInput) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const valid = await verifyPassword(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const accessToken = createAccessToken({ userId: user._id });

  const refreshTokenRaw = crypto.randomBytes(64).toString("hex");
  const hashedToken = await bcrypt.hash(refreshTokenRaw, 10);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await RefreshToken.create({ user: user._id, token: hashedToken, expiresAt });

  return { accessToken, refreshToken: refreshTokenRaw };
};

export const refreshAccessToken = async (rawToken: string) => {
  const storedTokens = await RefreshToken.find();
  let tokenDoc;

  for (const t of storedTokens) {
    if (await bcrypt.compare(rawToken, t.token)) {
      tokenDoc = t;
      break;
    }
  }

  if (!tokenDoc) throw new Error("Invalid refresh token");

  if (tokenDoc.expiresAt < new Date()) {
    await tokenDoc.deleteOne();
    throw new Error("Refresh token expired. Please login again.");
  }

  const accessToken = createAccessToken({ userId: tokenDoc.user.toString() });


  const newRawToken = crypto.randomBytes(64).toString("hex");
  const hashedToken = await bcrypt.hash(newRawToken, 10);

  tokenDoc.token = hashedToken;
  tokenDoc.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await tokenDoc.save();

  return { accessToken, refreshToken: newRawToken };
};

export const logoutUser = async (rawToken: string) => {
  const storedTokens = await RefreshToken.find();
  for (const t of storedTokens) {
    if (await bcrypt.compare(rawToken, t.token)) {
      await t.deleteOne();
      break;
    }
  }
};
