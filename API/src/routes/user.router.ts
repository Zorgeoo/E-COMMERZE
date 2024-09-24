import { Router } from "express";
import { getUserByIdController, getUsersController } from "../controllers/user";
import { getMeController } from "../controllers/user/get-me.controller";

const userRouter = Router();

userRouter
  .get("/", getUsersController)
  .get("/:id", getUserByIdController)
  .get("/me", getMeController);

export { userRouter };
