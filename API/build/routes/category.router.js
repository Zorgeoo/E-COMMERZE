"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const get_categories_controller_1 = require("../controllers/category/get-categories.controller");
const create_category_controller_1 = require("../controllers/category/create-category.controller");
const categoryRouter = (0, express_1.Router)();
exports.categoryRouter = categoryRouter;
categoryRouter
    .get("/", get_categories_controller_1.getCategoriesController)
    .post("/", create_category_controller_1.createCategoryController);
