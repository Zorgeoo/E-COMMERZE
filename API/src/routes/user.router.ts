import { Router } from "express";
import { getUserByIdController, getUsersController } from "../controllers/user";
import { getMeController } from "../controllers/user/get-me.controller";
import { handleLikedProducts } from "../controllers/user/user-likedProduct.controller";

const userRouter = Router();

userRouter
  .get("/", getUsersController)
  // .get("/:id", getUserByIdController)
  .get("/me", getMeController)
  .post("/liked", handleLikedProducts);

export { userRouter };
