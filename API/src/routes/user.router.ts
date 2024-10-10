import { Router } from "express";
import { getUserByIdController, getUsersController } from "../controllers/user";
import { getMeController } from "../controllers/user/get-me.controller";
import { handleLikedProducts } from "../controllers/user/user-likedProduct.controller";
import { updateUserController } from "../controllers/user/update-user.controller";

const userRouter = Router();

userRouter
  .get("/", getUsersController)
  // .get("/:id", getUserByIdController)
  .get("/me", getMeController)
  .post("/liked", handleLikedProducts)
  .put("/update", updateUserController);

export { userRouter };
