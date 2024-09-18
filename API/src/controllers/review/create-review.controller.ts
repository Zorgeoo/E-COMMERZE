import { RequestHandler } from "express";
import { ReviewModel } from "../../models/review.schema";

export const createReviewController: RequestHandler = async (req, res) => {
  try {
    await ReviewModel.create({ ...req.body });
    return res.status(201).json({
      message: "Review created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
