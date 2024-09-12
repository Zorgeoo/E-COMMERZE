import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
  getUsersController,
} from "../controllers/user";

const userRouter = Router();

userRouter
  .post("/", createUserController)
  .get("/", getUsersController)
  .get("/:id", getUserByIdController);

export { userRouter };
