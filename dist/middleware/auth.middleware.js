import { verifyAccessToken } from "../utils/jwt.js";
export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            throw new Error("No authorization header");
        const token = authHeader.split(" ")[1];
        if (!token)
            throw new Error("No token provided");
        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
};
//# sourceMappingURL=auth.middleware.js.map