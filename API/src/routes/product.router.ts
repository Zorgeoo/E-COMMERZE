import { Router } from "express";
import { getProductsController } from "../controllers/product/get-product.controller";
import { createProductController } from "../controllers/product/create-product.controller";
import { getProductByIdController } from "../controllers/product/get-product-by-id.controller";
import { deleteProductController } from "../controllers/product/delete-product.controller";

const productRouter = Router();

productRouter
  .get("/", getProductsController)
  .post("/", createProductController)
  .get("/:id", getProductByIdController)
  .delete("", deleteProductController);

export { productRouter };
