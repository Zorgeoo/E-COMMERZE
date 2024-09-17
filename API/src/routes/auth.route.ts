import { Router } from "express";
import { login, register } from "../controllers/auth/auth-controller";

const authRouter = Router();

authRouter.post("/register", register).post("/login", login);

export { authRouter };
