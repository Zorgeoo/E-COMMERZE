import { Router } from "express";
import { getReviewController } from "../controllers/review/get-review.controller";

const reviewRouter = Router();

reviewRouter.get("/", getReviewController);

export { reviewRouter };
