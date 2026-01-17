import bcrypt from "bcrypt";
export const hashPassword = async (password) => {
    const rounds = 10;
    return bcrypt.hash(password, rounds);
};
export const verifyPassword = async (password, hashed) => {
    return bcrypt.compare(password, hashed);
};
//# sourceMappingURL=hash.js.map