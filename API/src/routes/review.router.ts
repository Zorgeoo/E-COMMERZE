import { Router } from "express";
import { getReviewController } from "../controllers/review/get-review.controller";
import { createReviewController } from "../controllers/review/create-review.controller";

const reviewRouter = Router();

reviewRouter.get("/", getReviewController).post("/", createReviewController);

export { reviewRouter };
