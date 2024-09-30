import { Router } from "express";
import { createCartController } from "../controllers/cart/create-cart.controller";
import { getCartsController } from "../controllers/cart/get-carts.controller";

const cartRouter = Router();

cartRouter.post("/", createCartController).get("/", getCartsController);

export { cartRouter };
