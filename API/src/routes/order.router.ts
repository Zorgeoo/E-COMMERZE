import { Router } from "express";
import { getOrdersController } from "../controllers/order/get-order.controller";
import { createOrderController } from "../controllers/order/create-order.controller";

const orderRouter = Router();

orderRouter.get("/", getOrdersController).post("/", createOrderController);

export { orderRouter };
