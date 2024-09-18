import { RequestHandler } from "express";
import { ReviewModel } from "../../models/review.schema";

export const getReviewController: RequestHandler = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({})
      .populate("userId")
      .populate("productId");

    return res.status(200).json({
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Review orsonguiee",
    });
  }
};
