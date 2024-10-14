"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_schema_1 = require("../../models/user.schema");
const jwt = require("jsonwebtoken");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    console.log(req.body);
    const user = yield user_schema_1.userModel.findOne({ email });
    if (user)
        return res.status(400).json({ message: "User already exists" });
    const newUser = yield user_schema_1.userModel.create({
        username,
        email,
        password,
    });
    res.status(201).json({ username: newUser.username, email: newUser.email });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(req.body);
    const user = yield user_schema_1.userModel.findOne({ email, password });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({
        username: user.username,
        email: user.email,
        id: user._id,
        liked: user.liked,
    }, process.env.JWT_SECRET);
    return res.status(200).json({
        token,
        user: {
            username: user.username,
            email: user.email,
            id: user._id,
        },
    });
});
exports.login = login;
