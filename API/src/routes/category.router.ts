import { Router } from "express";
import { getCategoriesController } from "../controllers/category/get-categories.controller";
import { createCategoryController } from "../controllers/category/create-category.controller";

const categoryRouter = Router();

categoryRouter
  .get("/", getCategoriesController)
  .post("/", createCategoryController);

export { categoryRouter };
