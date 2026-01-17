import { Router } from "express";
import { register, login, refreshToken, logout } from "../contollers/auth.controller.js";
const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
export default router;
//# sourceMappingURL=auth.route.js.map