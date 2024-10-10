"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const get_product_controller_1 = require("../controllers/product/get-product.controller");
const create_product_controller_1 = require("../controllers/product/create-product.controller");
const get_product_by_id_controller_1 = require("../controllers/product/get-product-by-id.controller");
const delete_product_controller_1 = require("../controllers/product/delete-product.controller");
const update_product_controller_1 = require("../controllers/product/update-product.controller");
const productRouter = (0, express_1.Router)();
exports.productRouter = productRouter;
productRouter
    .get("/", get_product_controller_1.getProductsController)
    .post("/", create_product_controller_1.createProductController)
    .get("/:id", get_product_by_id_controller_1.getProductByIdController)
    .delete("", delete_product_controller_1.deleteProductController)
    .put("/update", update_product_controller_1.updateProductController);
