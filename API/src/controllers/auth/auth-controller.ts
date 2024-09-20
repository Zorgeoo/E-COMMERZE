import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";
const jwt = require("jsonwebtoken");

const register: RequestHandler = async (req, res) => {
  const { username, email, password } = req.body as {
    username: String;
    email: String;
    password: String;
  };

  const user = await userModel.findOne({ email });

  if (user) return res.status(400).json({ message: "User already exists" });

  const newUser = await userModel.create({
    username,
    email,
    password,
  });
  res.status(201).json({ username: newUser.username, email: newUser.email });
};

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body as {
    email: String;
    password: String;
  };
  console.log(req.body);

  const user = await userModel.findOne({ email, password });

  console.log(user);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    {
      username: user.username,
      email: user.email,
      id: user._id,
    },
    process.env.JWT_SECRET as string
  );

  return res.status(200).json({
    token,
    user: {
      username: user.username,
      email: user.email,
      id: user._id,
    },
  });
};

export { register, login };
