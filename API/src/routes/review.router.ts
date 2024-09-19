import { Router } from "express";
import { getReviewController } from "../controllers/review/get-review.controller";
import { createReviewController } from "../controllers/review/create-review.controller";
import { getReviewByProductId } from "../controllers/review/get-review-byProductId.controller";

const reviewRouter = Router();

reviewRouter
  .get("/", getReviewController)
  .post("/", createReviewController)
  .get("/:productId", getReviewByProductId);

export { reviewRouter };
