import { Router } from "express";
import { getOrdersController } from "../controllers/order/get-order.controller";
import { createOrderController } from "../controllers/order/create-order.controller";
import { getOrderByIdController } from "../controllers/order/get-order-byid.controller";
import { updateOrderController } from "../controllers/order/update-order.controller";

const orderRouter = Router();

orderRouter
  .get("/", getOrdersController)
  .post("/", createOrderController)
  .get("/:orderID", getOrderByIdController)
  .put("/update", updateOrderController);

export { orderRouter };
