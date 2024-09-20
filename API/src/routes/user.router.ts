import { Router } from "express";
import { getUserByIdController, getUsersController } from "../controllers/user";

const userRouter = Router();

userRouter.get("/", getUsersController).get("/:id", getUserByIdController);

export { userRouter };
