import bcrypt from "bcrypt";

export const hashPassword = async (
  password: string
): Promise<string> => {
  const rounds = 10;
  return bcrypt.hash(password, rounds);
};

export const verifyPassword = async (
  password: string,
  hashed: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashed);
};
