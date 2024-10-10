"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = require("express");
const get_review_controller_1 = require("../controllers/review/get-review.controller");
const create_review_controller_1 = require("../controllers/review/create-review.controller");
const get_review_byProductId_controller_1 = require("../controllers/review/get-review-byProductId.controller");
const reviewRouter = (0, express_1.Router)();
exports.reviewRouter = reviewRouter;
reviewRouter
    .get("/", get_review_controller_1.getReviewController)
    .post("/", create_review_controller_1.createReviewController)
    .get("/:productId", get_review_byProductId_controller_1.getReviewByProductId);
