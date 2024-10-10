"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth/auth-controller");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post("/register", auth_controller_1.register).post("/login", auth_controller_1.login);
