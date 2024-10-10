"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const get_order_controller_1 = require("../controllers/order/get-order.controller");
const create_order_controller_1 = require("../controllers/order/create-order.controller");
const get_order_byid_controller_1 = require("../controllers/order/get-order-byid.controller");
const update_order_controller_1 = require("../controllers/order/update-order.controller");
const orderRouter = (0, express_1.Router)();
exports.orderRouter = orderRouter;
orderRouter
    .get("/", get_order_controller_1.getOrdersController)
    .post("/", create_order_controller_1.createOrderController)
    .get("/:orderID", get_order_byid_controller_1.getOrderByIdController)
    .put("/update", update_order_controller_1.updateOrderController);
