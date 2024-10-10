"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
const create_cart_controller_1 = require("../controllers/cart/create-cart.controller");
const get_carts_controller_1 = require("../controllers/cart/get-carts.controller");
const delete_cart_controller_1 = require("../controllers/cart/delete-cart.controller");
const update_cart_controller_1 = require("../controllers/cart/update-cart.controller");
const cartRouter = (0, express_1.Router)();
exports.cartRouter = cartRouter;
cartRouter
    .post("/", create_cart_controller_1.createCartController)
    .get("/", get_carts_controller_1.getCartsController)
    .delete("/", delete_cart_controller_1.deleteCartController)
    .put("/update", update_cart_controller_1.updateCartController);
