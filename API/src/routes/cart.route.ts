import { Router } from "express";
import { createCartController } from "../controllers/cart/create-cart.controller";
import { getCartsController } from "../controllers/cart/get-carts.controller";
import { deleteCartController } from "../controllers/cart/delete-cart.controller";
import { updateCartController } from "../controllers/cart/update-cart.controller";

const cartRouter = Router();

cartRouter
  .post("/", createCartController)
  .get("/", getCartsController)
  .delete("/", deleteCartController)
  .put("/update", updateCartController);

export { cartRouter };
